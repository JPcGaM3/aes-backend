import { StatusEnum } from "../../generated/prisma/index";
import prisma from "../middlewares/prisma.middleware";
import {
	ConvertIndexMonth_Eng,
	ConvertMonthIndex_Eng,
} from "../utils/functions";

const defaultInclude = {
	customer_type: true,
	ae_area: true,
	operation_area: true,
	customer_operation_area: true,
	users: true,
	_count: {
		select: {
			taskorders: {
				where: { active: true },
			},
		},
	},
};

export const RequestOrderService = {
	create: async (data: any) => {
		const transformedData = {
			run_number: data.run_number,
			phone: data.phone,
			zone: data.zone,
			quota_number: data.quota_number,
			farmer_name: data.farmer_name,
			target_area: data.target_area,
			land_number: data.land_number,
			location_xy: data.location_xy,
			ap_month: data.ap_month,
			ap_year: data.ap_year,
			supervisor_name: data.supervisor_name,
			active: data.active ?? true,
			status: data.status ?? StatusEnum.CREATED,
			created_by: data.created_by,
			updated_by: data.updated_by,
			evidence: Array.isArray(data.evidence) ? data.evidence : [],
			customer_type: data.customer_type_id
				? { connect: { id: data.customer_type_id } }
				: undefined,
			operation_area: data.operation_area_id
				? { connect: { id: data.operation_area_id } }
				: undefined,
			customer_operation_area: data.customer_operation_area_id
				? { connect: { id: data.customer_operation_area_id } }
				: undefined,
			company_farm: data.company_farm_id
				? { connect: { id: data.company_farm_id } }
				: undefined,
			users: data.unit_head_id
				? { connect: { id: data.unit_head_id } }
				: undefined,
			ae_area: data.ae_id ? { connect: { id: data.ae_id } } : undefined,
		};

		const newRequestOrder = await prisma.requestorders.create({
			data: transformedData,
		});
		return newRequestOrder;
	},

	update: async (id: number, data: any): Promise<any> => {
		const updatedRequestOrder = await prisma.requestorders.update({
			where: { id },
			data,
		});
		return updatedRequestOrder;
	},

	delete: async (id: number): Promise<any> => {
		const deletedRequestOrder = await prisma.requestorders.delete({
			where: { id },
		});
		return deletedRequestOrder;
	},

	getAll: async (
		unit_head_id?: number,
		ae_id?: number,
		customer_type_id?: number,
		operation_area_id?: number,
		statuses?: StatusEnum[] | undefined,
		startMonth?: string,
		endMonth?: string,
		startYear?: number,
		endYear?: number,
		quota_number?: string
	): Promise<any> => {
		const filters: any = {
			active: true,
			...(unit_head_id && { unit_head_id }),
			...(ae_id && { ae_id }),
			...(customer_type_id && { customer_type_id }),
			...(operation_area_id && { operation_area_id }),
			...(statuses &&
				statuses.length > 0 && {
					status: {
						in: statuses,
					},
				}),
			...(quota_number && {
				quota_number: {
					contains: quota_number,
					mode: "insensitive",
				},
			}),
		};
		if (startYear && startMonth && endYear && endMonth) {
			const startMonthNum = ConvertIndexMonth_Eng(startMonth);
			const endMonthNum = ConvertIndexMonth_Eng(endMonth);

			filters.OR = [];

			for (let year = startYear; year <= endYear; year++) {
				const monthStart = year === startYear ? startMonthNum : 1;
				const monthEnd = year === endYear ? endMonthNum : 12;

				for (let month = monthStart; month <= monthEnd; month++) {
					filters.OR.push({
						ap_year: year,
						ap_month: ConvertMonthIndex_Eng(month - 1),
					});
				}
			}
		} else if (startYear && startMonth) {
			filters.ap_year = startYear;
			filters.ap_month = startMonth;
		}

		const requestOrders = await prisma.requestorders.findMany({
			where: filters,
			include: defaultInclude,
			orderBy: [{ status: "desc" }, { updated_at: "desc" }],
		});
		return requestOrders;
	},

	getById: async (
		id: number,
		ae_id?: number,
		customer_type_id?: number
	): Promise<any> => {
		const requestOrder = await prisma.requestorders.findUnique({
			where: {
				id,
				active: true,
				...(ae_id && { ae_id }),
				...(customer_type_id && { customer_type_id }),
			},
			include: defaultInclude,
		});
		return requestOrder;
	},

	getByIdWithAllTask: async (id: number): Promise<any> => {
		const requestOrderWithTasks = await prisma.requestorders.findFirst({
			where: {
				id,
				active: true,
			},
			include: {
				...defaultInclude,
				taskorders: {
					where: { active: true },
					include: {
						users: true,
						activities: true,
						tool_type: true,
						cars: true,
					},
					orderBy: {
						ap_date: "asc",
					},
				},
			},
		});
		return requestOrderWithTasks;
	},

	getRunNumber: async (startDate: Date, endDate: Date): Promise<any> => {
		const runNumber = await prisma.requestorders.count({
			where: {
				created_at: {
					gte: startDate,
					lt: endDate,
				},
			},
		});

		return runNumber || 0;
	},

	getEvidence: async (id: number): Promise<any> => {
		const requestOrders = await prisma.requestorders.findFirst({
			where: { id, active: true },
			select: {
				evidence: true,
			},
		});
		return requestOrders;
	},

	setActive: async (
		id: number,
		isActive: boolean,
		updated_by: number
	): Promise<any> => {
		const updatedRequestOrder = await prisma.requestorders.update({
			where: { id },
			data: { active: isActive, updated_by },
		});
		return updatedRequestOrder;
	},

	setStatus: async (
		id: number,
		updated_by: number,
		status?: StatusEnum,
		comment?: string
	): Promise<any> => {
		const updatedRequestOrder = await prisma.requestorders.update({
			where: { id },
			data: {
				...(status ? { status } : { status: undefined }),
				...(comment ? { comment } : { comment: undefined }),
				...(!status && !comment && { comment: null }),
				updated_by,
			},
		});
		return updatedRequestOrder;
	},

	setEvidence: async (
		id: number,
		evidence: Array<number>,
		updated_by: number
	): Promise<any> => {
		const updatedRequestOrder = await prisma.requestorders.update({
			where: { id },
			data: { evidence, updated_by },
		});
		return updatedRequestOrder;
	},
};
