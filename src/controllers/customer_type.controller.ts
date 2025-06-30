import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { CustomerTypeService } from "../services/custormer_type.service";

export const CustomerTypeController = {
  getAll: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const customerTypes = await CustomerTypeService.getAll();
      if (!customerTypes || customerTypes.length === 0) {
        return res
          .status(HTTP_STATUS.OK)
          .json(formatResponse([], { message: "No customer types found." }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(customerTypes));
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
      const customerType = await CustomerTypeService.getById(Number(id));
      if (!customerType) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "Customer type not found" }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(customerType));
    } catch (error) {
      next(error);
    }
  },
  getByName: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { name } = req.params;
    try {
      const customerType = await CustomerTypeService.getByName(name);
      if (!customerType) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "Customer type not found" }));
      }
      return res.status(HTTP_STATUS.OK).json(formatResponse(customerType));
    } catch (error) {
      next(error);
    }
  },
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { name } = req.body;
    try {
      const newCustomerType = await CustomerTypeService.create({
        name,
        created_by: Number(req.currentUser.id),
        updated_by: Number(req.currentUser.id),
      });
      return res
        .status(HTTP_STATUS.CREATED)
        .json(formatResponse(newCustomerType));
    } catch (error) {
      next(error);
    }
  },
  update: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updatedCustomerType = await CustomerTypeService.update(Number(id), {
        name,
        updated_by: Number(req.currentUser.id),
      });
      if (!updatedCustomerType) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "Customer type not found" }));
      }
      return res
        .status(HTTP_STATUS.OK)
        .json(formatResponse(updatedCustomerType));
    } catch (error) {
      next(error);
    }
  },
  delete: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    try {
      const deletedCustomerType = await CustomerTypeService.delete(Number(id));
      if (!deletedCustomerType) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "Customer type not found" }));
      }
      return res
        .status(HTTP_STATUS.OK)
        .json(formatResponse(deletedCustomerType));
    } catch (error) {
      next(error);
    }
  },
};
