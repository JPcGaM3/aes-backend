import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { AEAreaService } from "../services/ae_area.servive";
import { formatResponse } from "../utils/response_formatter";

export const AEAreaController = {
  getAll: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const areas = await AEAreaService.getAll();
      if (!areas || areas.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "No areas found" }));
      }
      res.status(HTTP_STATUS.OK).json(formatResponse(areas));
    } catch (error) {
      next(error);
    }
  },
};
