import { PrismaClient, RoleEnum } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const UserService = {
  getAll: async () => {
    const users = await prisma.users.findMany({
      orderBy: { id: "asc" },
    });
    return users;
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

  getByUsername: async (username: string) => {
    const user = await prisma.users.findFirst({
      where: { username },
    });
    return user;
  },
  getByRole: async (role: RoleEnum) => {
    const users = await prisma.users.findMany({
      where: { role },
    });
    return users;
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
  create: async (userData: any) => {
    const newUser = await prisma.users.create({
      data: userData,
    });
    return newUser;
  },

  update: async (id: number, userData: any) => {
    const updatedUser = await prisma.users.update({
      where: { id },
      data: userData,
    });
    return updatedUser;
  },

  delete: async (id: number) => {
    const deletedUser = await prisma.users.delete({
      where: { id },
    });
    return deletedUser;
  },
};
