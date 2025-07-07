import prisma from "../middlewares/prisma.middleware";

export const AEAreaService = {
	create: async (data: any): Promise<any> => {
		const newArea = await prisma.ae_area.create({
			data,
		});
		return newArea;
	},
	update: async (id: number, data: any): Promise<any> => {
		const updatedArea = await prisma.ae_area.update({
			where: { id },
			data,
		});
		return updatedArea;
	},
	getAll: async (): Promise<any> => {
		const aeAreas = await prisma.ae_area.findMany({
			select: {
				id: true,
				name: true,
			},
		});
		return aeAreas;
	},
	getById: async (id: number): Promise<any> => {
		const aeAreas = await prisma.ae_area.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
			},
		});
		return aeAreas;
	},
	getByName: async (name: string): Promise<any> => {
		const aeAreas = await prisma.ae_area.findFirst({
			where: { name },
			select: {
				id: true,
				name: true,
			},
		});
		return aeAreas;
	},
};
