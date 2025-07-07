import prisma from "../middlewares/prisma.middleware";

export const CustomerTypeService = {
	getAll: async () => {
		return await prisma.customer_type.findMany({
			orderBy: { id: "asc" },
			select: {
				id: true,
				name: true,
			},
		});
	},
	getById: async (id: number) => {
		return await prisma.customer_type.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
			},
		});
	},
	getByName: async (name: string) => {
		return await prisma.customer_type.findFirst({
			where: { name },
			select: {
				id: true,
				name: true,
			},
		});
	},
	getAllIdAndName: async () => {
		return await prisma.customer_type.findMany({
			select: {
				id: true,
				name: true,
			},
		});
	},
	create: async (data: any) => {
		return await prisma.customer_type.create({
			data,
		});
	},
	update: async (id: number, data: any) => {
		return await prisma.customer_type.update({
			where: { id },
			data,
		});
	},
	delete: async (id: number) => {
		return await prisma.customer_type.delete({
			where: { id },
		});
	},
};
