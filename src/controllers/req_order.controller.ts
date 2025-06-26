import { NextFunction, Request, Response } from "express";
import { RequestOrderService } from "../services/req_order.service";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { CustomerTypeService } from "../services/custormer_type.service";
import {
  ConvertMonthIndex_Eng,
  ConvertMonthTH_ENG,
  ReadExcelFile,
  SplitWords,
} from "../utils/functions";
import { OperationAreaService } from "../services/operation_area.service";
import { TaskOrderService } from "../services/task_order.service";
import { ActivityService } from "../services/activity.service";
import { ToolTypeService } from "../services/tool_type.service";
import { AEAreaService } from "../services/ae_area.servive";
import { StatusEnum } from "../../generated/prisma";
import { AttachmentService } from "../services/attachment.service";

export const RequestOrderController = {
  getAll: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const {
        ae_id,
        customer_type_id,
        status,
        start_month,
        end_month,
        start_year,
        end_year,
      } = req.query;

      const resquestOrders = await RequestOrderService.getAll(
        ae_id ? Number(ae_id) : NaN,
        customer_type_id ? Number(customer_type_id) : NaN,
        status ? ((status as string).toUpperCase() as StatusEnum) : undefined,
        start_month ? (start_month as string) : undefined,
        end_month ? (end_month as string) : undefined,
        start_year ? Number(start_year) : undefined,
        end_year ? Number(end_year) : undefined
      );

      if (!resquestOrders || resquestOrders.length === 0) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse([], { message: "No request orders found." }));
      }

      return res.status(HTTP_STATUS.OK).json(formatResponse(resquestOrders));
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
        customer_type_id,
        phone,
        operation_area_id,
        zone,
        quota_number,
        ae_id,
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

      const reqData = {
        customer_type_id: Number(customer_type_id),
        phone,
        operation_area_id: Number(operation_area_id),
        ae_id: Number(ae_id),
        zone,
        quota_number,
        farmer_name,
        target_area,
        land_number,
        location_xy,
        ap_month: ap_month,
        ap_year,
        supervisor_name,
        unit_head_id: Number(user_id),
        created_by: Number(user_id),
        updated_by: Number(user_id),
      };
      const newRequestOrder = await RequestOrderService.create(reqData);
      const req_id = newRequestOrder.id;
      const allActivities = SplitWords(activities);
      const allToolTypes = SplitWords(tool_types);
      const act_id_name = await ActivityService.getAllIdAndName();
      const tool_id_name = await ToolTypeService.getAllIdAndName();
      const taskOrderPromises = allActivities.map(async (activity, index) => {
        try {
          let act = act_id_name.find(
            (item: any) => item.name === allActivities[index]
          );
          let tool = tool_id_name.find(
            (item: any) => item.tool_type_name === allToolTypes[index]
          );
          if (!act || !tool) {
            return null;
          }
          return TaskOrderService.create({
            request_order_id: Number(req_id),
            activities_id: Number(act.id as number),
            tool_types_id: Number(tool.id as number),
            created_by: Number(user_id),
            updated_by: Number(user_id),
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
      const { ae_id, user_id } = req.body;
      if (!req.files && !Array.isArray(req.files)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          formatResponse([], {
            message: "No Excel files uploaded",
          })
        );
      }

      const files = req.files as Express.Multer.File[];
      const processedData: any[] = [];

      for (const file of files) {
        const data = await ReadExcelFile(file.buffer);
        const ctm = await CustomerTypeService.getAllIdAndName();
        const opa = await OperationAreaService.getAllIdAndName();

        const reqDataPromises = data.map(async (row) => {
          try {
            let ctm_res = ctm.find(
              (item: any) => item.name === row.หัวตารางแจ้งงาน
            );
            if (!ctm_res) {
              console.error(`Customer type not found: ${row.หัวตารางแจ้งงาน}`);
              return null;
            }

            let opa_res = opa.find(
              (item: any) => item.operation_area === row.สังกัด
            );
            if (!opa_res) {
              console.error(`Operation area not found: ${row.สังกัด}`);
              return null;
            }

            const reqOrder = {
              customer_type_id: Number(ctm_res.id),
              phone: row.เบอร์ติดต่อ.toString(),
              operation_area_id: Number(opa_res.id),
              zone: row.รหัสไร่.toString(),
              quota_number: row.โควต้าไร่.toString(),
              farmer_name: row.ชื่อไร่.toString(),
              target_area: Number(row.พื้นที่แจ้งจำนวนไร่),
              land_number: Number(row.เลขที่แปลง),
              location_xy: row.สถานที่ทำงานใส่พิกัดXY.toString(),
              ap_month: ConvertMonthTH_ENG(row.เดือน),
              ap_year: Number(row.ปี),
              supervisor_name: row.หัวหน้าไร่.toString(),
              ae_id: Number(ae_id),
              unit_head_id: Number(user_id),
              created_by: Number(user_id),
              updated_by: Number(user_id),
            };

            const newRequestOrder = await RequestOrderService.create(reqOrder);
            if (!newRequestOrder) {
              console.error("Failed to create new request order");
              return null;
            }
            const req_id = newRequestOrder.id;
            const allActivities = SplitWords(row.กิจกรรม);
            const allToolTypes = SplitWords(row.เครื่องมือ);
            const act_id_name = await ActivityService.getAllIdAndName();
            const tool_id_name = await ToolTypeService.getAllIdAndName();
            const taskOrderPromises = allActivities.map(
              async (activity, index) => {
                try {
                  let act = act_id_name.find(
                    (item: any) => item.name === allActivities[index]
                  );
                  let tool = tool_id_name.find(
                    (item: any) => item.tool_type_name === allToolTypes[index]
                  );
                  if (!act || !tool) {
                    return null;
                  }
                  let taskData = {
                    request_order_id: Number(req_id),
                    activities_id: Number(act.id as number),
                    tool_types_id: Number(tool.id as number),
                    created_by: Number(user_id),
                    updated_by: Number(user_id),
                  };
                  return await TaskOrderService.create(taskData);
                } catch (error) {
                  next(error);
                }
              }
            );

            const newTaskOrders = await Promise.all(taskOrderPromises);

            return {
              Request_order: newRequestOrder,
              Task_orders: newTaskOrders,
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
      const { id } = req.params;
      const { user_id } = req.body;
      req.body.updated_by = Number(user_id);
      const updatedRequestOrder = await RequestOrderService.update(
        Number(id),
        req.body
      );
      if (!updatedRequestOrder) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json(formatResponse(null, { message: "Request order not found." }));
      }
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

  getByIdWithTasks: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const requestOrderWithTasks =
        await RequestOrderService.getByIdWithAllTask(Number(id));
      if (!requestOrderWithTasks) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse([], {
            message: "Request order or task order not found",
          })
        );
      }
      return res
        .status(HTTP_STATUS.OK)
        .json(formatResponse(requestOrderWithTasks));
    } catch (error) {
      next(error);
    }
  },

  setStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const { status, comment, user_id } = req.body;
      const updatedRequestOrder = await RequestOrderService.setStatus(
        Number(id),
        status,
        Number(user_id),
        comment ? (comment as string) : undefined
      );
      if (!updatedRequestOrder) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          formatResponse([], {
            message: "Failed to update status of request order",
          })
        );
      }
      return res
        .status(HTTP_STATUS.OK)
        .json(formatResponse(updatedRequestOrder));
    } catch (error) {
      next(error);
    }
  },

  setActive: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const { active, user_id } = req.body;
      const updatedRequestOrder = await RequestOrderService.setActive(
        Number(id),
        active as boolean,
        Number(user_id)
      );
      if (!updatedRequestOrder) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          formatResponse([], {
            message: "Failed to update status of request order",
          })
        );
      }
      return res
        .status(HTTP_STATUS.OK)
        .json(formatResponse(updatedRequestOrder));
    } catch (error) {
      next(error);
    }
  },

  setEvidence: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const { user_id } = req.body;

      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          formatResponse([], {
            message: "No image files uploaded",
          })
        );
      }

      const existingOrder = await RequestOrderService.getById(Number(id));
      if (!existingOrder) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse([], {
            message: "Request order not found",
          })
        );
      }

      const attachmentPromises = (req.files as Express.Multer.File[]).map(
        async (file) => {
          const fileExt = file.originalname.split(".").pop();
          const fileName = file.originalname;
          const filePath = file.path;

          return await AttachmentService.create({
            file_name: fileName,
            file_path: filePath,
            file_type: file.mimetype,
            created_by: Number(user_id),
            updated_by: Number(user_id),
          });
        }
      );

      const attachments = await Promise.all(attachmentPromises);

      const attachmentIds = attachments.map((attachment) => attachment.id);

      let updatedEvidence = [];
      if (existingOrder.evidence && Array.isArray(existingOrder.evidence)) {
        updatedEvidence = [...existingOrder.evidence, ...attachmentIds];
      } else {
        updatedEvidence = attachmentIds;
      }

      const updatedRequestOrder = await RequestOrderService.setEvidence(
        Number(id),
        updatedEvidence,
        Number(user_id)
      );

      if (!updatedRequestOrder) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          formatResponse([], {
            message: "Failed to update evidence for request order",
          })
        );
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(
          {
            requestOrder: updatedRequestOrder,
            attachments: attachments,
          },
          {
            message: `${req.files.length} evidence file(s) uploaded successfully!`,
          }
        )
      );
    } catch (error) {
      next(error);
    }
  },

  getEvidence: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const requestOrder = await RequestOrderService.getById(Number(id));
      if (!requestOrder) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse([], {
            message: "Request order not found",
          })
        );
      }
      const attachment = requestOrder.evidence.map(async (id: number) => {
        return await AttachmentService.getById(id);
      });
      const attachments = await Promise.all(attachment);
      if (!attachments || attachments.length === 0) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse([], {
            message: "No evidence files found",
          })
        );
      }
      return res.status(HTTP_STATUS.OK).json(
        formatResponse(
          {
            // requestOrder,
            attachments,
          },
          {
            message: "Evidence files retrieved successfully!",
          }
        )
      );
    } catch (error) {
      next(error);
    }
  },
};
