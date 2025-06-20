import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const ActivityService = {
  getByName: async (name: string) => {
    const activity = await prisma.activities.findFirst({
      where: {
        name,
      },
    });
    return activity;
  },
};
