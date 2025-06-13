import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const RequestOrderService = {
  create: async (data: any) => {
    const newRequestOrder = await prisma.requestorders.create({
      data,
    });
    return newRequestOrder;
  },

  getById: async (id: number) => {
    const requestOrder = await prisma.requestorders.findUnique({
      where: { id },
    });
    return requestOrder;
  },

  getAll: async () => {
    const requestOrders = await prisma.requestorders.findMany();
    return requestOrders;
  },

  update: async (id: number, data: any) => {
    const updatedRequestOrder = await prisma.requestorders.update({
      where: { id },
      data,
    });
    return updatedRequestOrder;
  },

  delete: async (id: number) => {
    const deletedRequestOrder = await prisma.requestorders.delete({
      where: { id },
    });
    return deletedRequestOrder;
  },
};
