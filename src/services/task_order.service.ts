// import { PrismaClient, StatusEnum } from "../../generated/prisma/index";
// const prisma = new PrismaClient();
import { StatusEnum } from "../../generated/prisma/index";
import prisma from "../middlewares/prisma.middleware";

const defaultInclude = {
  users: true,
  activities: true,
  tool_type: true,
  cars: true,
};

export const TaskOrderService = {
  create: async (data: any): Promise<any> => {
    const newTaskOrder = await prisma.taskorders.create({
      data,
    });
    return newTaskOrder;
  },

  getById: async (id: number): Promise<any> => {
    const taskOrder = await prisma.taskorders.findFirst({
      where: {
        id,
      },
      include: defaultInclude,
    });
    return taskOrder;
  },

  getByRequestOrderId: async (requestOrderId: number): Promise<any> => {
    const taskOrders = await prisma.taskorders.findMany({
      where: {
        request_order_id: requestOrderId,
        active: true,
      },
      include: defaultInclude,
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
      include: defaultInclude,
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
    updated_by: number,
    comment?: string
  ): Promise<any> => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data: {
        status,
        ...(comment ? { comment } : { comment: undefined }),
        updated_by,
      },
    });
    return updatedTaskOrder;
  },

  setAllAssigned: async (
    id: number,
    updated_by: number,
    car_id?: number,
    tool_types_id?: number,
    assigned_user_id?: number,
    ap_date?: Date
  ): Promise<any> => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data: {
        ...(car_id && { car_id }),
        ...(tool_types_id && { tool_types_id }),
        ...(assigned_user_id && { assigned_user_id }),
        ...(ap_date && { ap_date }),
        updated_by,
      },
    });
    return updatedTaskOrder;
  },

  setActualArea: async (
    id: number,
    updated_by: number,
    newActualArea: number
  ): Promise<any> => {
    const updatedTaskOrder = await prisma.taskorders.update({
      where: { id },
      data: {
        actual_area: newActualArea,
        updated_by,
      },
    });
    return updatedTaskOrder;
  },
};
