import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const ActivityService = {
  getAllIdAndName: async () => {
    const activities = await prisma.activities.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return activities;
  },
  getByName: async (name: string) => {
    const activity = await prisma.activities.findFirst({
      where: {
        name,
      },
    });
    return activity;
  },
};
