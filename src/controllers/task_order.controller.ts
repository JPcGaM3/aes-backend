import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../configs/constants";
import { formatResponse } from "../utils/response_formatter";
import { TaskOrderService } from "../services/task_order.service";
import { StatusEnum } from "../../generated/prisma";

export const TaskOrderController = {
	create: async (
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
			const newTaskOrder = await TaskOrderService.create({
				...req.body,
				ap_date: req.body.ap_date
					? new Date(req.body.ap_date as string)
					: undefined,
				created_by: Number(userId),
				updated_by: Number(userId),
			});
			if (!newTaskOrder) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "Failed to create task order",
					})
				);
			}
			return res.status(HTTP_STATUS.CREATED).json(formatResponse(newTaskOrder));
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
			const { id: taskId } = req.params;
			const { id: userId } = req.currentUser;
			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}

			const updatedTaskOrder = await TaskOrderService.update(Number(taskId), {
				...req.body,
				updated_by: Number(userId),
			});
			if (!updatedTaskOrder) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "Failed to update task order",
					})
				);
			}
			return res.status(HTTP_STATUS.OK).json(formatResponse(updatedTaskOrder));
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
			const { id: taskId } = req.params;
			const { status, comment } = req.body;
			const { id: userId } = req.currentUser;
			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}
			const updatedTaskOrder = await TaskOrderService.setStatus(
				Number(taskId),
				Number(userId),
				status ? status.toUpperCase() : undefined,
				comment ? (comment as string) : undefined
			);
			if (!updatedTaskOrder) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "Failed to update task order",
					})
				);
			}
			return res.status(HTTP_STATUS.OK).json(formatResponse(updatedTaskOrder));
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
			const { id: userId } = req.currentUser;
			const { id: taskId } = req.params;
			const { active } = req.body;
			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}
			const updatedTaskOrder = await TaskOrderService.setActive(
				Number(taskId),
				active as boolean,
				Number(userId)
			);
			if (!updatedTaskOrder) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "Failed to update task order",
					})
				);
			}
			return res.status(HTTP_STATUS.OK).json(formatResponse(updatedTaskOrder));
		} catch (error) {
			next(error);
		}
	},

	setAssigned: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { id: taskId } = req.params;
			const { car_id, tool_types_id, assigned_user_id, ap_date } = req.body;
			const { id: userId } = req.currentUser;
			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}
			const updatedTaskOrder = await TaskOrderService.setAllAssigned(
				Number(taskId),
				Number(userId),
				car_id ? Number(car_id) : NaN,
				tool_types_id ? Number(tool_types_id) : NaN,
				assigned_user_id ? Number(assigned_user_id) : NaN,
				ap_date ? new Date(ap_date as string) : undefined
			);
			if (!updatedTaskOrder) {
				return res.status(HTTP_STATUS.BAD_REQUEST).json(
					formatResponse([], {
						message: "Failed to update task order",
					})
				);
			}
			return res.status(HTTP_STATUS.OK).json(formatResponse(updatedTaskOrder));
		} catch (error) {
			next(error);
		}
	},

	getAssigned: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { assigned_id } = req.params;
			const { status, start_date, end_date } = req.query;
			const assignedTaskOrders = await TaskOrderService.getByAssigned(
				Number(assigned_id),
				status ? ((status as string).toUpperCase() as StatusEnum) : undefined,
				start_date ? new Date(start_date as string) : undefined,
				end_date ? new Date(end_date as string) : undefined
			);
			if (!assignedTaskOrders) {
				return res.status(HTTP_STATUS.NOT_FOUND).json(
					formatResponse([], {
						message: "No assigned task orders found",
					})
				);
			}
			return res
				.status(HTTP_STATUS.OK)
				.json(formatResponse(assignedTaskOrders));
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
			const { id: taskId } = req.params;
			const taskOrder = await TaskOrderService.getById(Number(taskId));
			if (!taskOrder) {
				return res.status(HTTP_STATUS.NOT_FOUND).json(
					formatResponse([], {
						message: "Task order not found.",
					})
				);
			}
			return res.status(HTTP_STATUS.OK).json(formatResponse(taskOrder));
		} catch (error) {
			next(error);
		}
	},

	setActualArea: async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> => {
		try {
			const { id: taskId } = req.params;
			const { addActualArea } = req.body;
			const { id: userId } = req.currentUser;
			if (!userId) {
				return res
					.status(HTTP_STATUS.UNAUTHORIZED)
					.json(formatResponse([], { message: "Unauthorized." }));
			}

			const actualArea = await TaskOrderService.getById(Number(taskId));
			if (!actualArea) {
				return res
					.status(HTTP_STATUS.NOT_FOUND)
					.json(formatResponse([], { message: "No TaskOrder found." }));
			}

			const newActualArea =
				Number(actualArea.actual_area) + Number(addActualArea);

			const updatedActual = await TaskOrderService.setActualArea(
				Number(taskId),
				Number(userId),
				Number(newActualArea)
			);

			if (!updatedActual) {
				return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
					formatResponse([], {
						message: "Failed to update actual area.",
					})
				);
			}

			return res.status(HTTP_STATUS.OK).json(formatResponse(updatedActual));
		} catch (error) {
			next(error);
		}
	},
};
