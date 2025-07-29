import prisma from "../middlewares/prisma.middleware";

const defaultInclude = {
	ae_area: true,
};

export const CarService = {
	getAll: async (ae_id?: number): Promise<any> => {
		return await prisma.cars.findMany({
			where: {
				active: true,
				...(ae_id && { ae_id }),
			},
			include: defaultInclude,
		});
	},

	getByAE: async (ae_id: number): Promise<any> => {
		return await prisma.cars.findMany({
			where: { ae_id, active: true },
			include: defaultInclude,
			orderBy: { id: "asc" },
		});
	},
	setActive: async (
		car_id: number,
		is_active: boolean,
		updated_by: number
	): Promise<any> => {
		return await prisma.cars.update({
			where: { id: car_id },
			data: { active: is_active, updated_by },
		});
	},
};
