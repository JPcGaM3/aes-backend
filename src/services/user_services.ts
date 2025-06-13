import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const UserService = {
  create: async (userData: any) => {
    const newUser = await prisma.users.create({
      data: userData,
    });
    return newUser;
  },

  getById: async (id: number) => {
    const user = await prisma.users.findUnique({
      where: { id },
    });
    return user;
  },

  getByEmail: async (email: string) => {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    return user;
  },

  getAll: async () => {
    const users = await prisma.users.findMany({
      orderBy: { id: "asc" },
    });
    return users;
  },

  getByLeaderId: async (leaderId: number) => {
    const users = await prisma.users.findMany({
      where: { leader_id: leaderId },
    });
    return users;
  },

  update: async (id: number, userData: any) => {
    const updatedUser = await prisma.users.update({
      where: { id },
      data: userData,
    });
    return updatedUser;
  },

  setActive: async (id: number, active: boolean, updatedBy: any) => {
    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        active: active,
        updated_by: updatedBy,
      },
    });
    return updatedUser;
  },

  getByRole: async (role: string) => {
    const users = await prisma.users.findMany({
      where: { role },
    });
    return users;
  },
};
