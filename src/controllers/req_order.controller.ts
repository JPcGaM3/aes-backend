import { NextFunction, Request, Response } from "express";
import { RequestOrderService } from "../services/req_order.service";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import {
	ConvertIndexMonth_Eng,
	ConvertMonthIndex_Eng,
	ConvertMonthTH_ENG,
	ReadExcelFile,
	SplitWords,
} from "../utils/functions";
import { OperationAreaService } from "../services/operation_area.service";
import { TaskOrderService } from "../services/task_order.service";
import { ActivityService } from "../services/activity.service";
import { ToolTypeService } from "../services/tool_type.service";

import { AttachmentService } from "../services/attachment.service";
import moment from "moment-timezone";
import { StatusEnum } from "../utils/enum";

export const RequestOrderController = {
	createFormKeyIn: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { id: userId } = req.currentUser;

			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}

			const {
				phone,
				operation_area_id,
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
				ae_id,
			} = req.body;

			const now = moment.tz("Asia/Bangkok");
			const startDate = now.clone().tz("Asia/Bangkok").startOf("year").toDate();
			const endDate = now.clone().tz("Asia/Bangkok").endOf("year").toDate();
			const nowMonth = now.clone().tz("Asia/Bangkok").format("MM");
			const nowYear = now.clone().tz("Asia/Bangkok").format("YYYY");

			if (
				parseInt(nowMonth) > ConvertIndexMonth_Eng(ap_month) ||
				parseInt(nowYear) > ap_year
			) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "AP month and year must be up to date.",
					})
				);
			}

			if (target_area < 0) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "Target area must be a positive number.",
					})
				);
			}

			let runNumber = await RequestOrderService.getRunNumber(
				startDate,
				endDate
			);

			if (!runNumber && runNumber !== 0) {
				return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
					formatResponse([], {
						message: "Run number not found",
					})
				);
			}

			const opa_response =
				await OperationAreaService.getById(operation_area_id);

			if (!opa_response) {
				return res.status(HTTP_STATUS.NOT_FOUND).json(
					formatResponse([], {
						message: "Fail to fetch operation area.",
					})
				);
			}

			const reqData = {
				customer_type_id: Number(opa_response.customer_type_id),
				run_number: (runNumber += 1).toString().padStart(5, "0"),
				phone: phone.replace(/-/g, ""),
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
				unit_head_id: Number(userId),
				created_by: Number(userId),
				updated_by: Number(userId),
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
						created_by: Number(userId),
						updated_by: Number(userId),
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
			const { id: userId } = req.currentUser;

			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}

			const { ae_id } = req.body;

			if (!ae_id) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST)
					.json(formatResponse([], { message: "AE ID is required." }));
			}

			if (!req.files || !Array.isArray(req.files)) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "No Excel files uploaded",
					})
				);
			}

			const files = req.files as Express.Multer.File[];
			const processedData: any[] = [];
			const runNumberMap: Record<number, number> = {};

			const opa = await OperationAreaService.getAllNeed();
			const act_id_name = await ActivityService.getAllIdAndName();
			const tool_id_name = await ToolTypeService.getAllIdAndName();

			const now = moment.tz("Asia/Bangkok");
			const currentYear = now.year();
			const startDate = now.clone().startOf("year").toDate();
			const endDate = now.clone().endOf("year").toDate();
			const nowMonth = now.clone().tz("Asia/Bangkok").format("MM");
			const nowYear = now.clone().tz("Asia/Bangkok").format("YYYY");

			//TODO: รวมใบสั่่งงานด้วยเลขที่แปรงแทนการใช้ +
			for (const file of files) {
				const data = await ReadExcelFile(file.buffer);

				let exampleRow: number = 0;
				const reqData: any[] = [];
				const errorRows: any[] = [];

				for (const row of data) {
					try {
						if (
							row.หัวตารางแจ้งงาน === "(ตัวอย่าง)" ||
							row.หัวหน้าไร่ === "(ตัวอย่าง)"
						) {
							exampleRow++;
							continue;
						}

						if (
							parseInt(nowMonth) >
								ConvertIndexMonth_Eng(ConvertMonthTH_ENG(row.เดือน)) ||
							parseInt(nowYear) > Number(row.ปี) - 543
						) {
							errorRows.push({
								row,
								error: "AP month and year must be up to date.",
							});
							continue;
						}

						if (Number(row.พื้นที่แจ้งจำนวนไร่) < 0) {
							errorRows.push({
								row,
								error: "Target area must be a positive number.",
							});
							continue;
						}

						const opa_res = opa.find(
							(item: any) => item.operation_area === row.พื้นที่ปฏิบัติงาน
						);

						if (!opa_res) {
							errorRows.push({
								row,
								error: "Operation area for user not found",
							});
							continue;
						}

						if (!runNumberMap.hasOwnProperty(currentYear)) {
							let initialRunNumber = await RequestOrderService.getRunNumber(
								startDate,
								endDate
							);
							runNumberMap[currentYear] = initialRunNumber
								? initialRunNumber + 1
								: 1;
						}

						const currentRunNumber = runNumberMap[currentYear];
						runNumberMap[currentYear] += 1;

						//TODO: ไม่เช็ค location_xy
						const reqOrder = {
							customer_type_id: Number(opa_res.customer_type_id),
							run_number: currentRunNumber.toString().padStart(5, "0"),
							phone: row.เบอร์ติดต่อ.toString(),
							operation_area_id: Number(opa_res.id),
							zone: row.รหัสไร่.toString(),
							quota_number: row.โควต้าไร่.toString(),
							farmer_name: row.ชื่อไร่.toString(),
							target_area: Number(row.พื้นที่แจ้งจำนวนไร่),
							land_number: row.เลขที่แปลง.toString(),
							location_xy: row.สถานที่ทำงานใส่พิกัดXY.toString(),
							ap_month: ConvertMonthTH_ENG(row.เดือน),
							ap_year: Number(row.ปี) - 543,
							supervisor_name: row.หัวหน้าไร่.toString(),
							ae_id: Number(ae_id),
							unit_head_id: Number(userId),
							created_by: Number(userId),
							updated_by: Number(userId),
						};

						const newRequestOrder = await RequestOrderService.create(reqOrder);

						if (!newRequestOrder) {
							errorRows.push({
								row,
								error: "Failed to create request order",
							});
							runNumberMap[currentYear] -= 1;
							continue;
						}

						const req_id = newRequestOrder.id;
						const allActivities = SplitWords(row.กิจกรรม);
						const allToolTypes = SplitWords(row.เครื่องมือ);

						//TODO: check กิจกรรม กับ เครื่องมือก่อน

						const newTaskOrders: any[] = [];

						for (let i = 0; i < allActivities.length; i++) {
							const act = act_id_name.find(
								(item: any) => item.name === allActivities[i]
							);
							const tool = tool_id_name.find(
								(item: any) => item.tool_type_name === allToolTypes[i]
							);

							if (!act || !tool) {
								errorRows.push({
									row,
									error: `Activity or tool not found at index ${i}`,
								});
								continue;
							}

							const taskData = {
								request_order_id: Number(req_id),
								activities_id: Number(act.id),
								tool_types_id: Number(tool.id),
								created_by: Number(userId),
								updated_by: Number(userId),
							};

							const newTaskOrder = await TaskOrderService.create(taskData);
							if (newTaskOrder) newTaskOrders.push(newTaskOrder);
						}

						reqData.push({
							Request_order: newRequestOrder,
							Task_orders: newTaskOrders,
						});
					} catch (error: any) {
						console.error("Error processing Excel row:", error);
						errorRows.push({
							row,
							error: `Processing error: ${error.message}`,
						});
					}
				}

				const validReqData = reqData.filter((item) => item !== null);

				processedData.push({
					fileName: file.originalname,
					validRows: validReqData.length,
					totalRows: data.length - exampleRow,
					errorRows: errorRows.length,
					data: validReqData,
					errorData: errorRows,
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
			const { id: requestId } = req.params;
			const { id: userId } = req.currentUser;

			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}

			if (!requestId) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST)
					.json(formatResponse([], { message: "Request ID is required." }));
			}

			const updatedRequestOrder = await RequestOrderService.update(
				Number(requestId),
				{ ...req.body, updated_by: Number(userId) }
			);
			if (!updatedRequestOrder) {
				return res.status(HTTP_STATUS.NOT_FOUND).json(
					formatResponse(null, {
						message: "Request order not found.",
					})
				);
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
			const { id: requestId } = req.params;
			if (!requestId) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST)
					.json(formatResponse([], { message: "Request ID is required." }));
			}
			const deletedRequestOrder = await RequestOrderService.delete(
				Number(requestId)
			);
			res.status(HTTP_STATUS.OK).json(formatResponse(deletedRequestOrder));
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
			const {
				ae_id,
				customer_type_id,
				operation_area_id,
				status,
				start_month,
				end_month,
				start_year,
				end_year,
				quota_number,
			} = req.query;
			const { id: userId, role: userRole } = req.currentUser;

			if (!userId || !userRole) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}

			if (
				(start_month &&
					end_month &&
					start_year &&
					end_year &&
					start_year == end_year &&
					ConvertIndexMonth_Eng(start_month as string) >
						ConvertIndexMonth_Eng(end_month as string)) ||
				(start_year && end_year && start_year > end_year)
			) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "Invalid date range.",
					})
				);
			}

			//TODO: Check หัวหน้าหน่วยเฉพาะหน้างาน, หน้ารายการไม่ต้องเช็ค
			const isUnitHead = userRole.includes("UNIT_HEAD");

			let statusArray: StatusEnum[] = [];
			if (status) {
				if (Array.isArray(status)) {
					statusArray = status.map(
						(s) => String(s).toUpperCase() as StatusEnum
					);
				} else {
					statusArray = [String(status).toUpperCase() as StatusEnum];
				}
			}

			const resquestOrders = await RequestOrderService.getAll(
				isUnitHead ? Number(userId) : NaN,
				ae_id ? Number(ae_id) : NaN,
				customer_type_id ? Number(customer_type_id) : NaN,
				operation_area_id ? Number(operation_area_id) : NaN,
				statusArray,
				start_month ? (start_month as string) : undefined,
				end_month ? (end_month as string) : undefined,
				start_year ? Number(start_year) : undefined,
				end_year ? Number(end_year) : undefined,
				quota_number ? (quota_number as string) : undefined
			);

			if (!resquestOrders || resquestOrders.length === 0) {
				return res.status(HTTP_STATUS.NOT_FOUND).json(
					formatResponse([], {
						message: "No request orders found.",
					})
				);
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
		try {
			const { id: requestId } = req.params;
			if (!requestId) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST)
					.json(formatResponse([], { message: "Request ID is required." }));
			}
			const requestOrder = await RequestOrderService.getById(Number(requestId));
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

	getByIdWithTasks: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { id: requestId } = req.params;
			if (!requestId) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST)
					.json(formatResponse([], { message: "Request ID is required." }));
			}
			const requestOrderWithTasks =
				await RequestOrderService.getByIdWithAllTask(Number(requestId));
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
			const { id: requestId } = req.params;
			const { id: userId } = req.currentUser;
			const { status, comment } = req.body;

			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}

			if (!requestId) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST)
					.json(formatResponse([], { message: "Request ID is required." }));
			}

			const updatedRequestOrder = await RequestOrderService.setStatus(
				Number(requestId),
				Number(userId),
				status ? status.toUpperCase() : undefined,
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
			const { id: requestId } = req.params;
			const { active } = req.body;
			const { id: userId } = req.currentUser;

			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}

			if (!requestId) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST)
					.json(formatResponse([], { message: "Request ID is required." }));
			}

			const updatedRequestOrder = await RequestOrderService.setActive(
				Number(requestId),
				active as boolean,
				Number(userId)
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
			const { id: requestId } = req.params;
			const { id: userId } = req.currentUser;

			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}

			if (!requestId) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST)
					.json(formatResponse([], { message: "Request ID is required." }));
			}

			if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "No image files uploaded",
					})
				);
			}

			const existingOrder = await RequestOrderService.getById(
				Number(requestId)
			);
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
						created_by: Number(userId),
						updated_by: Number(userId),
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
				Number(requestId),
				updatedEvidence,
				Number(userId)
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
			const { id: requestId } = req.params;
			if (!requestId) {
				return res
					.status(HTTP_STATUS.BAD_REQUEST)
					.json(formatResponse([], { message: "Request ID is required." }));
			}
			const requestOrder = await RequestOrderService.getById(Number(requestId));
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
