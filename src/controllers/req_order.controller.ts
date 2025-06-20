import { NextFunction, Request, Response } from "express";
import { RequestOrderService } from "../services/req_order.service";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { CustomerTypeService } from "../services/custormer_type.service";
import {
  ConvertMonthTH_ENG,
  ReadExcelFile,
  SplitWords,
} from "../utils/functions";
import { OperationAreaService } from "../services/operation_area.service";
import { create } from "domain";
import { TaskOrderService } from "../services/task_order.service";
import { ActivityService } from "../services/activity.service";
import { ToolTypeService } from "../services/tool_type.service";

export const RequestOrderController = {
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

  createFormKeyIn: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const {
        customer_type,
        phone,
        operation_area,
        zone,
        quota_number,
        farmer_name,
        target_area,
        land_number,
        location_xy,
        activities,
        tool_types,
        ap_month,
        ap_year,
        supervisor_name,
        user_id,
      } = req.body;
      const ctm_res = await CustomerTypeService.getByName(customer_type);
      if (!ctm_res) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "Customer type not found" }));
      }
      const opa_res = await OperationAreaService.getByName(operation_area);
      if (!opa_res) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "Operation area not found" }));
      }
      const reqData = {
        customer_type_id: Number(ctm_res.id),
        phone,
        operation_area_id: Number(opa_res.id),
        zone,
        quota_number,
        farmer_name,
        target_area,
        land_number,
        location_xy,
        ap_month: ConvertMonthTH_ENG(ap_month),
        ap_year,
        supervisor_name,
        unit_head_id: user_id,
        created_by: user_id,
        updated_by: user_id,
      };
      const newRequestOrder = await RequestOrderService.create(reqData);
      const req_id = newRequestOrder.id;
      const allActivities = SplitWords(activities);
      const allToolTypes = SplitWords(tool_types);
      const taskOrderPromises = allActivities.map(async (activity, index) => {
        try {
          let act = await ActivityService.getByName(allActivities[index]);
          let tool = await ToolTypeService.getByName(allToolTypes[index]);
          if (!act || !tool) {
            return null;
          }
          return TaskOrderService.create({
            request_order_id: Number(req_id),
            activities_id: Number(act.id as number),
            tool_types_id: Number(tool.id as number),
            created_by: user_id,
            updated_by: user_id,
          });
        } catch (error) {
          next(error);
        }
      });

      const taskOrders = await Promise.all(taskOrderPromises);

      const allResponse = {
        requestOrder: newRequestOrder,
        taskOrders,
      };

      return res.status(HTTP_STATUS.CREATED).json(formatResponse(allResponse));
    } catch (error) {
      next(error);
    }
  },

  createFromExcel: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { user_id } = req.body;
      if (!req.files && !Array.isArray(req.files)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          formatResponse([], {
            message: "No Excel files uploaded",
          })
        );
      }

      const files = req.files as Express.Multer.File[];
      const processedFiles: { fileName: string; dataPreview: any[] }[] = [];
      const processedData: any[] = [];

      for (const file of files) {
        const data = await ReadExcelFile(file.buffer);
        // console.log(`--- Excel Data for: ${file.originalname} ---`);
        // console.log(JSON.stringify(data, null, 2));
        // console.log("------------------------------------");

        // processedFiles.push({
        //   fileName: file.originalname,
        //   dataPreview: data.slice(0, 5),
        // });

        const reqDataPromises = data.map(async (row) => {
          try {
            const ctm_res = await CustomerTypeService.getByName(
              row.หัวตารางแจ้งงาน
            );
            if (!ctm_res) {
              console.error(`Customer type not found: ${row.หัวตารางแจ้งงาน}`);
              return null;
            }

            const opa_res = await OperationAreaService.getByName(row.สังกัด);
            if (!opa_res) {
              console.error(`Operation area not found: ${row.สังกัด}`);
              return null;
            }

            return {
              customer_type_id: Number(ctm_res.id),
              phone: row.เบอร์ติดต่อ || null,
              operation_area_id: Number(opa_res.id),
              zone: row.รหัสไร่ || null,
              quota_number: row.โควต้าไร่ || null,
              farmer_name: row.ชื่อไร่ || null,
              target_area: row.พื้นที่แจ้งจำนวนไร่ || null,
              land_number: row.เลขที่แปลง || null,
              location_xy: row.สถานที่ทำงานใส่พิกัดXY || null,
              ap_month: ConvertMonthTH_ENG(row.เดือน) || null,
              ap_year: row.ปี || null,
              supervisor_name: row.หัวหน้าไร่ || null,
              unit_head_id: user_id,
              created_by: user_id,
              updated_by: user_id,
            };
          } catch (error) {
            console.error("Error processing Excel row:", error);
            return null;
          }
        });

        const reqData = await Promise.all(reqDataPromises);

        const validReqData = reqData.filter((item) => item !== null);

        processedData.push({
          fileName: file.originalname,
          validRows: validReqData.length,
          totalRows: data.length,
          data: validReqData.slice(0, 2),
        });
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(processedData, {
          message: `${files.length} Excel file(s) processed successfully!`,
        })
      );
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

  getByIdAndTask: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { request_order_id } = req.body;
      const requestOrder = await RequestOrderService.getById(request_order_id);
      if (!requestOrder) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "Request order not found" }));
      }
      const taskOrders = await TaskOrderService.getByRequestOrderId(
        request_order_id
      );
      if (!taskOrders || taskOrders.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "Task orders not found" }));
      }
      return res
        .status(HTTP_STATUS.OK)
        .json(formatResponse({ requestOrder, taskOrders }));
    } catch (error) {
      next(error);
    }
  },
};
