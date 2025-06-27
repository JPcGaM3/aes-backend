// import { PrismaClient, RoleEnum } from "../../generated/prisma/index";

// const prisma = new PrismaClient();
import { RoleEnum, StatusEnum } from "../../generated/prisma/index";
import prisma from "../middlewares/prisma.middleware";

const defaultInclude = {
  ae_area: true,
};

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
      include: defaultInclude,
      orderBy: orderByConditions,
    });
    return users;
  },

  getById: async (id: number) => {
    const user = await prisma.users.findUnique({
      where: { id },
      include: defaultInclude,
    });
    return user;
  },

  getByEmail: async (email: string) => {
    const user = await prisma.users.findUnique({
      where: { email },
      include: defaultInclude,
    });
    return user;
  },

  getByUsername: async (username: string) => {
    const user = await prisma.users.findFirst({
      where: { username },
      include: defaultInclude,
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
      include: defaultInclude,
    });
    return users;
  },
  getByEmployeeId: async (employee_id: string) => {
    const user = await prisma.users.findUnique({
      where: { employee_id },
      include: defaultInclude,
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
    const transformedData = {
      username: userData.username,
      email: userData.email,
      fullname: userData.fullname,
      unit: userData.unit,
      phone: userData.phone,
      role: Array.isArray(userData.role) ? userData.role : [],
      status: userData.status ?? StatusEnum.INACTIVE,
      active: userData.active ?? true,
      employee_id: userData.employee_id,
      created_by: userData.created_by,
      updated_by: userData.updated_by,
      ae_area: userData.ae_id
        ? { connect: { id: Number(userData.ae_id) } }
        : undefined,
    };

    const newUser = await prisma.users.create({
      data: transformedData,
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
