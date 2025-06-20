import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { create } from "domain";
import { TaskOrderService } from "../services/task_order.service";

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
      const updatedTaskOrder = await TaskOrderService.update(
        Number(req.body.id),
        req.body.filter((key: any) => key !== "id")
      );
      res.status(HTTP_STATUS.OK).json(formatResponse(updatedTaskOrder));
    } catch (error) {
      next(error);
    }
  },
  updateStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user_id, status, comment } = req.body;
      if (comment) {
        await TaskOrderService.setComment(user_id, comment);
      }
      const updatedTaskOrder = await TaskOrderService.setStatus(
        user_id,
        status
      );
      res.status(HTTP_STATUS.OK).json(formatResponse(updatedTaskOrder));
    } catch (error) {
      next(error);
    }
  },
};
