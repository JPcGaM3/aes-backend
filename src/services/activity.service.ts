import prisma from "../middlewares/prisma.middleware";

export const ActivityService = {
  getAllIdAndName: async (): Promise<any> => {
    const activities = await prisma.activities.findMany({
      select: {
        id: true,
        name: true,
        tool_types: {
          select: {
            id: true,
            tool_type_name: true,
          },
        },
      },
    });
    return activities;
  },
  getByName: async (name: string): Promise<any> => {
    const activity = await prisma.activities.findFirst({
      where: {
        name,
      },
    });
    return activity;
  },
};
