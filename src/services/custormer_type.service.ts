import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const CustomerTypeService = {
  getAll: async () => {
    return await prisma.customer_type.findMany({
      orderBy: { id: "asc" },
    });
  },
  getById: async (id: number) => {
    return await prisma.customer_type.findUnique({
      where: { id },
    });
  },
  getByName: async (name: string) => {
    return await prisma.customer_type.findFirst({
      where: { name },
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
