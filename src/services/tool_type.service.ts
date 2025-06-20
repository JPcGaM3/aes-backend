import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const ToolTypeService = {
  getAllIdAndName: async () => {
    const toolTypes = await prisma.tool_types.findMany({
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
};
