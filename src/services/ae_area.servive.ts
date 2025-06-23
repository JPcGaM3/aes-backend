import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const AEAreaService = {
  getById: async (id: number): Promise<any> => {
    const ae = await prisma.ae_area.findUnique({
      where: { id },
    });
    return ae;
  },
};
