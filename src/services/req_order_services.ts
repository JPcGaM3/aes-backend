import { PrismaClient, StatusEnum } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const RequestOrderService = {
  getAll: async () => {
    const requestOrders = await prisma.requestorders.findMany();
    return requestOrders;
  },
  getById: async (id: number) => {
    const requestOrder = await prisma.requestorders.findUnique({
      where: { id },
    });
    return requestOrder;
  },

  getByStatus: async (status: StatusEnum) => {
    const requestOrders = await prisma.requestorders.findMany({
      where: { status },
    });
    return requestOrders;
  },

  create: async (data: any) => {
    const newRequestOrder = await prisma.requestorders.create({
      data,
    });
    return newRequestOrder;
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
