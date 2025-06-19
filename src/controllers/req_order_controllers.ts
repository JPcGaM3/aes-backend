import { NextFunction, Request, Response } from "express";
import { RequestOrderService } from "../services/req_order_services";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";

export const RequestOrderController = {
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const newRequestOrder = await RequestOrderService.create(req.body);
      res.status(HTTP_STATUS.CREATED).json(newRequestOrder);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const requestOrders = await RequestOrderService.getAll();
      if (!requestOrders || requestOrders.length === 0) {
        return res
          .status(HTTP_STATUS.OK)
          .json(formatResponse([], { message: "No request orders found." }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(requestOrders));
    } catch (error) {
      next(error);
    }
  },

  getById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    try {
      const requestOrder = await RequestOrderService.getById(Number(id));
      if (requestOrder) {
        res.status(HTTP_STATUS.OK).json(formatResponse(requestOrder));
      } else {
        res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "Request order not found" }));
      }
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
      const updatedRequestOrder = await RequestOrderService.update(
        Number(req.params.id),
        req.body
      );
      res.status(HTTP_STATUS.OK).json(formatResponse(updatedRequestOrder));
    } catch (error) {
      next(error);
    }
  },

  delete: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const deletedRequestOrder = await RequestOrderService.delete(
        Number(req.params.id)
      );
      res.status(HTTP_STATUS.OK).json(formatResponse(deletedRequestOrder));
    } catch (error) {
      next(error);
    }
  },
};
