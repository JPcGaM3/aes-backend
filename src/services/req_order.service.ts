import { PrismaClient, StatusEnum } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const RequestOrderService = {
  getAll: async (): Promise<any> => {
    const requestOrders = await prisma.requestorders.findMany();
    return requestOrders;
  },
  getById: async (id: number): Promise<any> => {
    const requestOrder = await prisma.requestorders.findUnique({
      where: { id },
    });
    return requestOrder;
  },

  getByStatus: async (status: StatusEnum): Promise<any> => {
    const requestOrders = await prisma.requestorders.findMany({
      where: { status },
    });
    return requestOrders;
  },

  getEvidence: async (id: number): Promise<any> => {
    const requestOrders = await prisma.requestorders.findFirst({
      where: { id },
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
      unit_head_id: data.unit_head_id,
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

  setActive: async (id: number, isActive: boolean): Promise<any> => {
    const updatedRequestOrder = await prisma.requestorders.update({
      where: { id },
      data: { active: isActive },
    });
    return updatedRequestOrder;
  },

  setStatus: async (id: number, status: StatusEnum): Promise<any> => {
    const updatedRequestOrder = await prisma.requestorders.update({
      where: { id },
      data: { status },
    });
    return updatedRequestOrder;
  },
  setComment: async (id: number, comment: string): Promise<any> => {
    const updatedRequestOrder = await prisma.requestorders.update({
      where: { id },
      data: { comment },
    });
    return updatedRequestOrder;
  },

  setEvidence: async (id: number, evidence: Array<number>): Promise<any> => {
    const updatedRequestOrder = await prisma.requestorders.update({
      where: { id },
      data: { evidence },
    });
    return updatedRequestOrder;
  },
};
