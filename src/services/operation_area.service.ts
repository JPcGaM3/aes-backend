import prisma from "../middlewares/prisma.middleware";

export const OperationAreaService = {
  getAll: async (customer_type_id?: number, ae_id?: number): Promise<any> => {
    return await prisma.operation_area.findMany({
      where: {
        ...(customer_type_id && { customer_type_id }),
        ...(ae_id && { ae_id }),
      },
      include: {
        ae_area: true,
      },
      orderBy: { id: "asc" },
    });
  },
  getAllNeed: async (
    customer_type_id?: number,
    ae_id?: number
  ): Promise<any> => {
    return await prisma.operation_area.findMany({
      where: {
        ...(customer_type_id && { customer_type_id }),
        ...(ae_id && { ae_id }),
      },
      select: {
        id: true,
        operation_area: true,
        ae_id: true,
        customer_type_id: true,
        ae_area: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
  },
  getById: async (id: number): Promise<any> => {
    return await prisma.operation_area.findFirst({
      where: { id },
      select: {
        id: true,
        operation_area: true,
        ae_id: true,
        customer_type_id: true,
        ae_area: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },
  getByCustomerType: async (
    customer_type_id: number,
    ae_id: number | undefined
  ): Promise<any> => {
    return await prisma.operation_area.findMany({
      where: { customer_type_id, ae_id },
      select: {
        id: true,
        operation_area: true,
        ae_id: true,
        customer_type_id: true,
        ae_area: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
  },
  getByName: async (name: string): Promise<any> => {
    return await prisma.operation_area.findFirst({
      where: { operation_area: name },
      select: {
        id: true,
        operation_area: true,
        ae_id: true,
        customer_type_id: true,
        ae_area: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },
  create: async (data: any): Promise<any> => {
    return await prisma.operation_area.create({
      data,
    });
  },
  update: async (id: number, data: any): Promise<any> => {
    return await prisma.operation_area.update({
      where: { id },
      data,
    });
  },
  delete: async (id: number): Promise<any> => {
    return await prisma.operation_area.delete({
      where: { id },
    });
  },
};
