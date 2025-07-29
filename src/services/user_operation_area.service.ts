import prisma from "../middlewares/prisma.middleware";

export const UserOperationAreaService = {
	getAll: async (user_id?: number) => {
		const operationArea = await prisma.user_operation_area.findMany({
			where: { ...(user_id && { user_id }), active: true },
			select: {
				id: true,
				users: true,
				operation_area: true,
			},
			orderBy: {
				operation_area_id: "asc",
			},
		});
		return operationArea;
	},
};
