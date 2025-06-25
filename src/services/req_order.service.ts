import { PrismaClient, StatusEnum } from "../../generated/prisma/index";

const prisma = new PrismaClient();

const defaultInclude = {
  customer_type: true,
  ae_area: true,
  users: true,
  _count: {
    select: {
      taskorders: true,
    },
  },
};

export const RequestOrderService = {
  getAll: async (
    ae_id?: number,
    customer_type_id?: number,
    status?: StatusEnum,
    startMonth?: string,
    endMonth?: string,
    startYear?: number,
    endYear?: number
  ): Promise<any> => {
    const requestOrders = await prisma.requestorders.findMany({
      where: {
        ...(ae_id && { ae_id }),
        ...(customer_type_id && { customer_type_id }),
        ...(status && { status }),
        ...(startMonth &&
          endMonth && {
            ap_month: {
              gte: startMonth,
              lte: endMonth,
            },
          }),
        ...(startMonth && !endMonth && { ap_month: startMonth }),
        ...(startYear &&
          endYear && {
            ap_year: {
              gte: startYear,
              lte: endYear,
            },
          }),
        active: true,
      },
      include: defaultInclude,
      orderBy: [
        {
          status: "desc",
        },
      ],
    });
    return requestOrders;
  },
  getById: async (
    id: number,
    ae_id?: number,
    customer_type_id?: number
  ): Promise<any> => {
    const requestOrder = await prisma.requestorders.findUnique({
      where: {
        id,
        active: true,
        ...(ae_id && { ae_id }),
        ...(customer_type_id && { customer_type_id }),
      },
      include: defaultInclude,
    });
    return requestOrder;
  },

  // getByStatus: async (
  //   status: StatusEnum,
  //   ae_id?: number,
  //   customer_type_id?: number
  // ): Promise<any> => {
  //   const requestOrders = await prisma.requestorders.findMany({
  //     where: {
  //       status,
  //       active: true,
  //       ...(ae_id && { ae_id }),
  //       ...(customer_type_id && { customer_type_id }),
  //     },
  //     include: {
  //       customer_type: true,
  //       ae_area: true,
  //       users: true,
  //       _count: {
  //         select: {
  //           taskorders: true,
  //         },
  //       },
  //     },
  //   });
  //   return requestOrders;
  // },

  getByIdWithAllTask: async (id: number): Promise<any> => {
    const requestOrderWithTasks = await prisma.requestorders.findFirst({
      where: {
        id,
        active: true,
      },
      include: {
        ...defaultInclude,
        taskorders: {
          include: {
            users: true,
            activities: true,
            tool_type: true,
            cars: true,
          },
        },
      },
    });
    return requestOrderWithTasks;
  },

  getEvidence: async (id: number): Promise<any> => {
    const requestOrders = await prisma.requestorders.findFirst({
      where: { id, active: true },
      select: {
        evidence: true,
      },
    });
    return requestOrders;
  },

  create: async (data: any) => {
    const transformedData = {
      phone: data.phone,
      zone: data.zone,
      quota_number: data.quota_number,
      farmer_name: data.farmer_name,
      target_area: data.target_area,
      land_number: data.land_number,
      location_xy: data.location_xy,
      ap_month: data.ap_month,
      ap_year: data.ap_year,
      supervisor_name: data.supervisor_name,
      active: data.active ?? true,
      status: data.status ?? StatusEnum.CREATED,
      created_by: data.created_by,
      updated_by: data.updated_by,
      evidence: Array.isArray(data.evidence) ? data.evidence : [],
      customer_type: data.customer_type_id
        ? { connect: { id: data.customer_type_id } }
        : undefined,
      operation_area: data.operation_area_id
        ? { connect: { id: data.operation_area_id } }
        : undefined,
      company_farm: data.company_farm_id
        ? { connect: { id: data.company_farm_id } }
        : undefined,
      users: data.unit_head_id
        ? { connect: { id: data.unit_head_id } }
        : undefined,
    };

    const newRequestOrder = await prisma.requestorders.create({
      data: transformedData,
    });
    return newRequestOrder;
  },

  // create: async (data: any): Promise<any> => {
  //   const newRequestOrder = await prisma.requestorders.create({
  //     data,
  //   });
  //   return newRequestOrder;
  // },

  update: async (id: number, data: any): Promise<any> => {
    const updatedRequestOrder = await prisma.requestorders.update({
      where: { id },
      data,
    });
    return updatedRequestOrder;
  },

  delete: async (id: number): Promise<any> => {
    const deletedRequestOrder = await prisma.requestorders.delete({
      where: { id },
    });
    return deletedRequestOrder;
  },

  setActive: async (
    id: number,
    isActive: boolean,
    updated_by: number
  ): Promise<any> => {
    const updatedRequestOrder = await prisma.requestorders.update({
      where: { id },
      data: { active: isActive, updated_by },
    });
    return updatedRequestOrder;
  },

  setStatus: async (
    id: number,
    status: StatusEnum,
    updated_by: number
  ): Promise<any> => {
    const updatedRequestOrder = await prisma.requestorders.update({
      where: { id },
      data: { status, updated_by },
    });
    return updatedRequestOrder;
  },
  setComment: async (
    id: number,
    comment: string,
    updated_by: number
  ): Promise<any> => {
    const updatedRequestOrder = await prisma.requestorders.update({
      where: { id },
      data: { comment, updated_by },
    });
    return updatedRequestOrder;
  },

  setEvidence: async (
    id: number,
    evidence: Array<number>,
    updated_by: number
  ): Promise<any> => {
    const updatedRequestOrder = await prisma.requestorders.update({
      where: { id },
      data: { evidence, updated_by },
    });
    return updatedRequestOrder;
  },
};
