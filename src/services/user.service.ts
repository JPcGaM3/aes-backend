import { RoleEnum, StatusEnum } from "../../generated/prisma/index";
import prisma from "../middlewares/prisma.middleware";

const defaultInclude = {
	user_role: {
		where: { active: true },
		select: {
			id: true,
			role: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	},
	user_ae_area: {
		where: { active: true },
		select: {
			id: true,
			ae_area: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	},
};

export const UserService = {
	getAll: async (ae_id?: number, role_id?: number[]) => {
		const users = await prisma.users.findMany({
			where: {
				active: true,
				...(ae_id && { ae_id }),
				...(role_id && {
					user_role: {
						some: {
							role_id: {
								in: role_id,
							},
							active: true,
						},
					},
				}),
			},
			include: defaultInclude,
			orderBy: { id: "asc" },
		});
		return users;
	},

	getById: async (id: number) => {
		const user = await prisma.users.findUnique({
			where: { id },
			include: defaultInclude,
		});
		return user;
	},

	getByEmail: async (email: string) => {
		const user = await prisma.users.findUnique({
			where: { email },
			include: defaultInclude,
		});
		return user;
	},

	getByUsername: async (username: string) => {
		const user = await prisma.users.findFirst({
			where: { username },
			include: defaultInclude,
		});
		return user;
	},

	getByRole: async (role: RoleEnum[], ae_id?: number) => {
		const users = await prisma.users.findMany({
			where: {
				user_role: { some: { role: { name: { in: role } } } },
				active: true,
				...(ae_id && { ae_id }),
			},
			include: defaultInclude,
		});
		return users;
	},

	getByEmployeeId: async (employee_id: string) => {
		const user = await prisma.users.findUnique({
			where: { employee_id },
			include: defaultInclude,
		});
		return user;
	},

	getOperationArea: async (user_id: number) => {
		const operationArea = await prisma.user_operation_area.findMany({
			where: { user_id, active: true },
			select: {
				operation_area: {
					select: {
						id: true,
						operation_area: true,
					},
				},
			},
			orderBy: {
				operation_area_id: "asc",
			},
		});
		return operationArea;
	},

	getAEArea: async (user_id: number) => {
		const aeArea = await prisma.user_ae_area.findMany({
			where: { user_id, active: true },
			select: {
				ae_area: {
					select: {
						id: true,
						name: true,
					},
				},
			},
			orderBy: {
				ae_id: "asc",
			},
		});
		return aeArea;
	},

	setActive: async (id: number, active: boolean, updatedBy: any) => {
		const updatedUser = await prisma.users.update({
			where: { id },
			data: {
				active: active,
				updated_by: updatedBy,
			},
		});
		return updatedUser;
	},

	create: async (userData: any) => {
		const transformedData = {
			username: userData.username,
			email: userData.email,
			fullname: userData.fullname,
			unit: userData.unit,
			phone: userData.phone,
			role: Array.isArray(userData.role) ? userData.role : [],
			status: userData.status ?? StatusEnum.INACTIVE,
			active: userData.active ?? true,
			employee_id: userData.employee_id,
			created_by: userData.created_by,
			updated_by: userData.updated_by,
			ae_area: userData.ae_id
				? { connect: { id: Number(userData.ae_id) } }
				: undefined,
		};

		const newUser = await prisma.users.create({
			data: transformedData,
		});
		return newUser;
	},

	update: async (id: number, userData: any) => {
		const updatedUser = await prisma.users.update({
			where: { id },
			data: userData,
		});
		return updatedUser;
	},

	delete: async (id: number) => {
		const deletedUser = await prisma.users.delete({
			where: { id },
		});
		return deletedUser;
	},
};
