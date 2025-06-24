import { PrismaClient, RoleEnum } from "../../generated/prisma/index";

const prisma = new PrismaClient();

export const UserService = {
  getAll: async (ae_id?: number, role?: RoleEnum[]) => {
    let orderByConditions: any = [];

    if (role) {
      orderByConditions.unshift({ role: "desc" });
    }
    orderByConditions.unshift({ id: "asc" });

    const users = await prisma.users.findMany({
      where: {
        active: true,
        ...(ae_id && { ae_id }),
        ...(role && { role: { hasEvery: role as RoleEnum[] } }),
      },
      orderBy: orderByConditions,
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
  getByRole: async (role: RoleEnum[], ae_id?: number) => {
    const users = await prisma.users.findMany({
      where: {
        role: { hasEvery: role },
        active: true,
        ...(ae_id && { ae_id }),
      },
    });
    return users;
  },
  getByEmployeeId: async (employee_id: string) => {
    const user = await prisma.users.findUnique({
      where: { employee_id },
    });
    return user;
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
