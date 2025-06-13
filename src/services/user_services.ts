import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const UserService = {
  create: async (userData: any) => {
    return prisma.users.create({
      data: userData,
    });
  },

  getById: async (id: number) => {
    return prisma.users.findUnique({
      where: { id },
    });
  },

  getByEmail: async (email: string) => {
    return prisma.users.findUnique({
      where: { email },
    });
  },

  getAll: async () => {
    return prisma.users.findMany({
      orderBy: { id: "asc" },
    });
  },

  getByLeaderId: async (leaderId: number) => {
    return prisma.users.findMany({
      where: { leader_id: leaderId },
    });
  },

  update: async (id: number, userData: any) => {
    return prisma.users.update({
      where: { id },
      data: userData,
    });
  },

  setActive: async (id: number, active: boolean, updatedBy: any) => {
    return prisma.users.update({
      where: { id },
      data: {
        active: active,
        updated_by: updatedBy,
      },
    });
  },

  getByRole: async (role: string) => {
    return prisma.users.findMany({
      where: { role },
    });
  },
};
