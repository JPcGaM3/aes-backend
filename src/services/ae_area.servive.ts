// import { PrismaClient } from "../../generated/prisma/index";

// const prisma = new PrismaClient();
import prisma from "../middlewares/prisma.middleware";

export const AEAreaService = {
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
