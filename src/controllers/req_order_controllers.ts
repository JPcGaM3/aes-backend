import { NextFunction, Request, Response } from "express";
import { RequestOrderService } from "../services/req_order_services";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";

export const RequestOrderController = {
  create: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    try {
      const newRequestOrder = await RequestOrderService.create(_req.body);
      _res.status(HTTP_STATUS.CREATED).json(newRequestOrder);
    } catch (error) {
      _next(error);
    }
  },

  getAll: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    try {
      const requestOrders = await RequestOrderService.getAll();
      if (!requestOrders || requestOrders.length === 0) {
        return _res
          .status(HTTP_STATUS.OK)
          .json({ message: "No request orders found" });
      }
      return _res.status(HTTP_STATUS.OK).json(formatResponse(requestOrders));
    } catch (error) {
      _next(error);
    }
  },

  getById: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    try {
      const requestOrder = await RequestOrderService.getById(
        Number(_req.params.id)
      );
      if (requestOrder) {
        _res.status(HTTP_STATUS.OK).json(formatResponse(requestOrder));
      } else {
        _res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Request order not found" });
      }
    } catch (error) {
      _next(error);
    }
  },

  update: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    try {
      const updatedRequestOrder = await RequestOrderService.update(
        Number(_req.params.id),
        _req.body
      );
      _res.status(HTTP_STATUS.OK).json(formatResponse(updatedRequestOrder));
    } catch (error) {
      _next(error);
    }
  },

  delete: async (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<any> => {
    try {
      const deletedRequestOrder = await RequestOrderService.delete(
        Number(_req.params.id)
      );
      _res.status(HTTP_STATUS.OK).json(formatResponse(deletedRequestOrder));
    } catch (error) {
      _next(error);
    }
  },
};
