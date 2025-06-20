import { PrismaClient, StatusEnum } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const TaskOrderService = {
  create: async (data: any) => {
    const newTaskOrder = await prisma.taskorders.create({
      data,
    });
    return newTaskOrder;
  },
  getByRequestOrderId: async (requestOrderId: number) => {
    const taskOrders = await prisma.taskorders.findMany({
      where: {
        request_order_id: requestOrderId,
      },
    });
    return taskOrders;
  },
  update: async (id: number, data: any) => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data,
    });
    return updatedTaskOrder;
  },
  delete: async (id: number) => {
    const deletedTaskOrder = await prisma.taskorders.delete({
      where: { id },
    });
    return deletedTaskOrder;
  },
  setActive: async (id: number, isActive: boolean) => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data: { active: isActive },
    });
    return updatedTaskOrder;
  },
  setStatus: async (id: number, status: StatusEnum) => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data: { status },
    });
    return updatedTaskOrder;
  },
  setComment: async (id: number, comment: string) => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data: { comment },
    });
    return updatedTaskOrder;
  },
};
