import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const AttachmentService = {
  create: async (data: any) => {
    return await prisma.attachment.create({
      data,
    });
  },
  getById: async (id: number) => {
    return await prisma.attachment.findFirst({
      where: { id },
    });
  },
  getAll: async () => {
    return await prisma.attachment.findMany({
      orderBy: {
        id: "asc",
      },
    });
  },
  update: async (id: number, data: any) => {
    return await prisma.attachment.update({
      where: { id },
      data,
    });
  },
  delete: async (id: number) => {
    return await prisma.attachment.delete({
      where: { id },
    });
  },
};
