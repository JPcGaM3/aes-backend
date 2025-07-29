import prisma from "../middlewares/prisma.middleware";
import { StatusEnum } from "../utils/enum";

const defaultInclude = {
	users: true,
	activities: true,
	tool_type: true,
	cars: true,
	requestorders: {
		include: {
			customer_type: true,
			ae_area: true,
			operation_area: true,
			customer_operation_area: true,
			users: true,
		},
	},
};

export const TaskOrderService = {
	create: async (data: any): Promise<any> => {
		const newTaskOrder = await prisma.taskorders.create({
			data,
		});
		return newTaskOrder;
	},

	getById: async (id: number): Promise<any> => {
		const taskOrder = await prisma.taskorders.findFirst({
			where: {
				id,
			},
			include: defaultInclude,
		});
		return taskOrder;
	},

	getByRequestOrderId: async (requestOrderId: number): Promise<any> => {
		const taskOrders = await prisma.taskorders.findMany({
			where: {
				request_order_id: requestOrderId,
				active: true,
			},
			include: defaultInclude,
		});
		return taskOrders;
	},

	getByAssigned: async (
		assignedId: number,
		status?: StatusEnum,
		startDate?: Date,
		endDate?: Date
	): Promise<any> => {
		const notShowStatus = [
			StatusEnum.CREATED,
			StatusEnum.REJECTED,
			StatusEnum.CANCELLED,
			StatusEnum.PENDING_APPROVAL,
			StatusEnum.PENDING_EDIT,
		];

		const taskOrders = await prisma.taskorders.findMany({
			where: {
				assigned_user_id: assignedId,
				active: true,
				requestorders: {
					status: {
						not: {
							in: notShowStatus as StatusEnum[],
						},
					},
				},
				...(startDate &&
					endDate && { ap_date: { gte: startDate, lte: endDate } }),
				...(startDate &&
					!endDate && {
						ap_date: { gte: startDate, lte: startDate },
					}),
				...(status && { status }),
			},
			include: defaultInclude,
			orderBy: [
				{
					status: "desc",
				},
				{
					ap_date: "asc",
				},
			],
		});
		return taskOrders;
	},

	update: async (id: number, data: any): Promise<any> => {
		const updatedTaskOrder = await prisma.taskorders.update({
			where: { id },
			data,
		});
		return updatedTaskOrder;
	},

	delete: async (id: number): Promise<any> => {
		const deletedTaskOrder = await prisma.taskorders.delete({
			where: { id },
		});
		return deletedTaskOrder;
	},

	setActive: async (
		id: number,
		isActive: boolean,
		updated_by: number
	): Promise<any> => {
		const updatedTaskOrder = await prisma.taskorders.update({
			where: { id },
			data: { active: isActive, updated_by },
		});
		return updatedTaskOrder;
	},

	setStatus: async (
		id: number,
		updated_by: number,
		status?: StatusEnum,
		comment?: string
	): Promise<any> => {
		const updatedTaskOrder = await prisma.taskorders.update({
			where: { id },
			data: {
				...(status ? { status } : { status: undefined }),
				...(comment ? { comment } : { comment: undefined }),
				...(!status && !comment && { comment: null }),
				updated_by,
			},
		});
		return updatedTaskOrder;
	},

	setAllAssigned: async (
		id: number,
		updated_by: number,
		car_id?: number,
		tool_types_id?: number,
		assigned_user_id?: number,
		ap_date?: Date,
		target_area?: number
	): Promise<any> => {
		const updatedTaskOrder = await prisma.taskorders.update({
			where: { id },
			data: {
				...(car_id && { car_id }),
				...(tool_types_id && { tool_types_id }),
				...(assigned_user_id && { assigned_user_id }),
				...(ap_date && { ap_date }),
				...(target_area && { target_area }),
				updated_by,
			},
		});
		return updatedTaskOrder;
	},

	setActualArea: async (
		id: number,
		updated_by: number,
		newActualArea?: number,
		start_timer?: Date,
		end_timer?: Date,
		start_mile?: number,
		end_mile?: number
	): Promise<any> => {
		const updatedTaskOrder = await prisma.taskorders.update({
			where: { id },
			data: {
				...(newActualArea && { actual_area: newActualArea }),
				...(start_timer && { start_timer }),
				...(end_timer && { end_timer }),
				...(start_mile && { start_mile }),
				...(end_mile && { end_mile }),
				updated_by,
			},
		});
		return updatedTaskOrder;
	},
};
