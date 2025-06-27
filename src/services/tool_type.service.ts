import prisma from "../middlewares/prisma.middleware";

export const ToolTypeService = {
  getAllIdAndName: async (activity_id?: number) => {
    const toolTypes = await prisma.tool_types.findMany({
      where: {
        ...(activity_id && { activity_id }),
      },
      select: {
        id: true,
        tool_type_name: true,
      },
    });
    return toolTypes;
  },

  getByName: async (name: string) => {
    const toolType = await prisma.tool_types.findFirst({
      where: { tool_type_name: name },
    });
    return toolType;
  },

  getPrice: async (id: number) => {
    const toolType = await prisma.tool_types.findFirst({
      where: { id },
      select: {
        price_ct_fm: true,
        price_ct_rdc: true,
        price_ne1_fm: true,
        price_ne1_res: true,
        price_suffix: true,
      },
    });
    return toolType;
  },
};
