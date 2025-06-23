import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { create } from "domain";
import { TaskOrderService } from "../services/task_order.service";
import { ConvertToChristianDate } from "../utils/functions";

export const TaskOrderController = {
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const newTaskOrder = await TaskOrderService.create(req.body);
      if (!newTaskOrder) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(formatResponse([], { message: "Failed to create task order" }));
      }
      return res.status(HTTP_STATUS.CREATED).json(formatResponse(newTaskOrder));
    } catch (error) {
      next(error);
    }
  },
  update: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const updatedTaskOrder = await TaskOrderService.update(
        Number(id),
        req.body
      );
      if (!updatedTaskOrder) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(formatResponse([], { message: "Failed to update task order" }));
      }
      res.status(HTTP_STATUS.OK).json(formatResponse(updatedTaskOrder));
    } catch (error) {
      next(error);
    }
  },
  setStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const { status, comment, updated_by } = req.body;
      let updatedTaskOrder;
      if (comment) {
        updatedTaskOrder = await TaskOrderService.setComment(
          Number(id),
          comment,
          updated_by
        );
      }
      if (status) {
        updatedTaskOrder = await TaskOrderService.setStatus(
          Number(id),
          status,
          updated_by
        );
      }
      if (!updatedTaskOrder) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(formatResponse([], { message: "Failed to update task order" }));
      }
      res.status(HTTP_STATUS.OK).json(formatResponse(updatedTaskOrder));
    } catch (error) {
      next(error);
    }
  },
  setActive: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const { active, updated_by } = req.body;
      const updatedTaskOrder = await TaskOrderService.setActive(
        Number(id),
        active,
        updated_by
      );
      if (!updatedTaskOrder) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(formatResponse([], { message: "Failed to update task order" }));
      }
      res.status(HTTP_STATUS.OK).json(formatResponse(updatedTaskOrder));
    } catch (error) {
      next(error);
    }
  },
  setAllAssigned: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const { car_id, tool_types_id, assigned_user_id, updated_by } = req.body;
      const updatedTaskOrder = await TaskOrderService.setAllAssigned(
        Number(id),
        car_id,
        tool_types_id,
        assigned_user_id,
        updated_by
      );
      if (!updatedTaskOrder) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(formatResponse([], { message: "Failed to update task order" }));
      }
      res.status(HTTP_STATUS.OK).json(formatResponse(updatedTaskOrder));
    } catch (error) {
      next(error);
    }
  },

  getAssigned: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { assigned_id } = req.params;
      const { start_date, end_date } = req.query;
      const assignedTaskOrders = await TaskOrderService.getByAssigned(
        Number(assigned_id),
        start_date ? ConvertToChristianDate(start_date as string) : undefined,
        end_date ? ConvertToChristianDate(end_date as string) : undefined
      );
      if (!assignedTaskOrders) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(
            formatResponse([], { message: "No assigned task orders found" })
          );
      }
      res.status(HTTP_STATUS.OK).json(formatResponse(assignedTaskOrders));
    } catch (error) {
      next(error);
    }
  },
};
