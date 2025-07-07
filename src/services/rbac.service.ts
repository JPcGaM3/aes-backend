import prisma from "../middlewares/prisma.middleware";

export const RBACService = {
	// ----- Role Management -----
	createRole: async (data: any) => {
		return await prisma.role.create({
			data,
		});
	},

	updateRole: async (id: number, data: any) => {
		return await prisma.role.update({
			where: { id },
			data,
		});
	},

	getRoles: async (active: boolean = true) => {
		return await prisma.role.findMany({
			where: { active },
			include: {
				permissions: {
					include: {
						permission: true,
					},
				},
			},
		});
	},

	getRoleById: async (id: number) => {
		return await prisma.role.findUnique({
			where: { id },
			include: {
				permissions: {
					include: {
						permission: true,
					},
				},
			},
		});
	},

	// ----- Permission Management -----
	createPermission: async (data: any) => {
		return await prisma.permission.create({
			data,
		});
	},

	getPermissions: async (active: boolean = true) => {
		return await prisma.permission.findMany({
			where: { active },
		});
	},

	// ----- Role-Permission Management -----
	assignPermissionToRole: async (
		roleId: number,
		permissionId: number,
		userId: number
	) => {
		return await prisma.role_permission.create({
			data: {
				role_id: roleId,
				permission_id: permissionId,
				created_by: userId,
				updated_by: userId,
			},
		});
	},

	removePermissionFromRole: async (roleId: number, permissionId: number) => {
		return await prisma.role_permission.deleteMany({
			where: {
				role_id: roleId,
				permission_id: permissionId,
			},
		});
	},

	// ----- User-Role Management -----
	assignRoleToUser: async (userId: number, roleId: number, adminId: number) => {
		return await prisma.user_role.create({
			data: {
				user_id: userId,
				role_id: roleId,
				created_by: adminId,
				updated_by: adminId,
			},
		});
	},

	removeRoleFromUser: async (userId: number, roleId: number) => {
		return await prisma.user_role.deleteMany({
			where: {
				user_id: userId,
				role_id: roleId,
			},
		});
	},

	getUserRoles: async (userId: number) => {
		return await prisma.user_role.findMany({
			where: { user_id: userId },
			include: {
				role: true,
			},
		});
	},
};
