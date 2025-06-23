import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const CarService = {
  getAll: async (): Promise<any> => {
    return await prisma.cars.findMany();
  },

  getByAE: async (ae_id: number): Promise<any> => {
    return await prisma.cars.findMany({
      where: { ae_id },
      orderBy: { id: "asc" },
    });
  },
};
