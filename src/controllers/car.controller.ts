// import * as CarModel from "../services/car_services";
import { HTTP_STATUS, MESSAGES } from "../configs/constants";
import { NextFunction, Request, Response } from "express";
import { CarService } from "../services/car.service";
import { formatResponse } from "../utils/response_formatter";

export const CarController = {
  getAll: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const cars = await CarService.getAll();
      if (!cars || cars.length === 0) {
        return res
          .status(HTTP_STATUS.OK)
          .json(formatResponse([], { message: "No cars found." }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(cars));
    } catch (error) {
      next(error);
    }
  },
};
