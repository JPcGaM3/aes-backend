import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const OperationAreaService = {
  getAll: async (): Promise<any> => {
    return await prisma.operation_area.findMany({
      orderBy: { id: "asc" },
    });
  },

  getById: async (id: number): Promise<any> => {
    return await prisma.operation_area.findUnique({
      where: { id },
    });
  },
  getByCustomerType: async (
    customer_type_id: number,
    ae_id: number | undefined
  ): Promise<any> => {
    return await prisma.operation_area.findMany({
      where: { customer_type_id, ae_id },
      orderBy: { id: "asc" },
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
