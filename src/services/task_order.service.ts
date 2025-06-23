import { PrismaClient, StatusEnum } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const TaskOrderService = {
  create: async (data: any): Promise<any> => {
    const newTaskOrder = await prisma.taskorders.create({
      data,
    });
    return newTaskOrder;
  },
  getByRequestOrderId: async (requestOrderId: number): Promise<any> => {
    const taskOrders = await prisma.taskorders.findMany({
      where: {
        request_order_id: requestOrderId,
        active: true,
      },
    });
    return taskOrders;
  },

  getByAssigned: async (
    assignedId: number,
    startDate?: Date,
    endDate?: Date
  ): Promise<any> => {
    const taskOrders = await prisma.taskorders.findMany({
      where: {
        assigned_user_id: assignedId,
        active: true,
        ...(startDate &&
          endDate && { ap_date: { gte: startDate, lte: endDate } }),
        ...(startDate &&
          !endDate && { ap_date: { gte: startDate, lte: startDate } }),
      },
      orderBy: [
        {
          ap_date: "asc",
        },
        {
          status: "desc",
        },
      ],
    });
    return taskOrders;
  },

  update: async (id: number, data: any): Promise<any> => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data,
    });
    return updatedTaskOrder;
  },
  delete: async (id: number): Promise<any> => {
    const deletedTaskOrder = await prisma.taskorders.delete({
      where: { id },
    });
    return deletedTaskOrder;
  },
  setActive: async (
    id: number,
    isActive: boolean,
    updated_by: number
  ): Promise<any> => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data: { active: isActive, updated_by },
    });
    return updatedTaskOrder;
  },
  setStatus: async (
    id: number,
    status: StatusEnum,
    updated_by: number
  ): Promise<any> => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data: { status, updated_by },
    });
    return updatedTaskOrder;
  },
  setComment: async (
    id: number,
    comment: string,
    updated_by: number
  ): Promise<any> => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data: { comment, updated_by },
    });
    return updatedTaskOrder;
  },

  setAllAssigned: async (
    id: number,
    car_id: number,
    tool_types_id: number,
    assigned_user_id: number,
    updated_by: number
  ): Promise<any> => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data: { car_id, tool_types_id, assigned_user_id, updated_by },
    });
    return updatedTaskOrder;
  },
};
