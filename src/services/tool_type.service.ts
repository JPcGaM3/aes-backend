import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const ToolTypeService = {
  getByName: async (name: string) => {
    const toolType = await prisma.tool_types.findFirst({
      where: { tool_type_name: name },
    });
    return toolType;
  },
};
