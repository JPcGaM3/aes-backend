import { Request, Response, NextFunction } from "express";
import { ToolTypeService } from "../services/tool_type.service";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";

export const ToolTypeController = {
  getAll: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const toolTypes = await ToolTypeService.getAllIdAndName();
      if (!toolTypes || toolTypes.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "No tool types found" }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(toolTypes));
    } catch (error) {
      next(error);
    }
  },
  getByActivity: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { activity_id } = req.params;
      const toolTypes = await ToolTypeService.getAllIdAndName(
        activity_id ? Number(activity_id) : undefined
      );
      if (!toolTypes || toolTypes.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "No tool types found" }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(toolTypes));
    } catch (error) {
      next(error);
    }
  },

  getPrice: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    try {
      if (!id || isNaN(Number(id))) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(formatResponse(null, { message: "Invalid tool type ID" }));
      }
      const price = await ToolTypeService.getPrice(Number(id));
      if (!price) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse(null, { message: "Tool type not found" }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(price));
    } catch (error) {
      next(error);
    }
  },
};
