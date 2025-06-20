import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { OperationAreaService } from "../services/operation_area.service";

export const OperationAreaController = {
  getAll: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const id = req.query.id ? Number(req.query.id) : undefined;
      if (id) {
        const operationArea = await OperationAreaService.getById(id);
        if (!operationArea) {
          return res
            .status(HTTP_STATUS.NOT_FOUND)
            .json(
              formatResponse([], { message: "Operation area ID not found." })
            );
        }
        return res.status(HTTP_STATUS.OK).json(formatResponse(operationArea));
      }
      const operationAreas = await OperationAreaService.getAll();
      return res.status(HTTP_STATUS.OK).json(formatResponse(operationAreas));
    } catch (error) {
      next(error);
    }
  },
  getByCustomerType: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    let customerTypeId = Number(req.query.customer_type_id);
    let aeId = Number(req.query.ae_id) || NaN;
    try {
      if (customerTypeId === 100) {
        aeId = NaN;
      } else if (!(customerTypeId && aeId)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          formatResponse([], {
            message: "Unexpected error for Customer type and AE ID.",
          })
        );
      }
      const operationAreas = await OperationAreaService.getByCustomerType(
        customerTypeId,
        aeId
      );
      return res.status(HTTP_STATUS.OK).json(formatResponse(operationAreas));
    } catch (error) {
      next(error);
    }
  },
};
