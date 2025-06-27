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
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user_id, ...data } = req.body;
      const newArea = await AEAreaService.create({
        ...data,
        created_by: user_id,
        updated_by: user_id,
      });
      if (!newArea) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(formatResponse([], { message: "Failed to create area" }));
      }
      return res.status(HTTP_STATUS.CREATED).json(formatResponse(newArea));
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
      const { user_id, ...data } = req.body;
      if (!id) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(formatResponse([], { message: "Invalid area ID" }));
      }
      const updatedArea = await AEAreaService.update(Number(id), {
        ...data,
        updated_by: user_id,
      });
      if (!updatedArea) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json(formatResponse([], { message: "Failed to update area" }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(updatedArea));
    } catch (error) {
      next(error);
    }
  },
};
