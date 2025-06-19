import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const CompanyFarmService = {
  getAll: async () => {
    return await prisma.company_farm.findMany({
      orderBy: { area_number: "asc", zone: "asc" },
    });
  },
  getById: async (id: number) => {
    return await prisma.company_farm.findUnique({
      where: { id },
    });
  },
  getByAreaNumber: async (area_number: number) => {
    return await prisma.company_farm.findMany({
      where: { area_number },
      orderBy: { zone: "asc" },
    });
  },
  create: async (data: any) => {
    return await prisma.company_farm.create({
      data,
    });
  },
  update: async (id: number, data: any) => {
    return await prisma.company_farm.update({
      where: { id },
      data,
    });
  },
  delete: async (id: number) => {
    return await prisma.company_farm.delete({
      where: { id },
    });
  },
};
