import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { ActivityService } from "../services/activity.service";
import { formatResponse } from "../utils/response_formatter";

export const ActivityController = {
  getAll: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const activities = await ActivityService.getAllIdAndName();
      if (!activities) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "No activity found." }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(activities));
    } catch (error) {
      next(error);
    }
  },
};
