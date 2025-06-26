import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

const defaultInclude = {
  ae_area: true,
};

export const OperationAreaService = {
  getAll: async (customer_type_id?: number, ae_id?: number): Promise<any> => {
    return await prisma.operation_area.findMany({
      where: {
        ...(customer_type_id && { customer_type_id }),
        ...(ae_id && { ae_id }),
      },
      include: defaultInclude,
      orderBy: { id: "asc" },
    });
  },
  getAllIdAndName: async (): Promise<any> => {
    return await prisma.operation_area.findMany({
      select: {
        id: true,
        operation_area: true,
      },
    });
  },
  getById: async (id: number): Promise<any> => {
    return await prisma.operation_area.findUnique({
      where: { id },
      include: defaultInclude,
    });
  },
  getByCustomerType: async (
    customer_type_id: number,
    ae_id: number | undefined
  ): Promise<any> => {
    return await prisma.operation_area.findMany({
      where: { customer_type_id, ae_id },
      include: defaultInclude,
      orderBy: { id: "asc" },
    });
  },
  getByName: async (name: string): Promise<any> => {
    return await prisma.operation_area.findFirst({
      where: { operation_area: name },
      include: defaultInclude,
    });
  },
  create: async (data: any): Promise<any> => {
    return await prisma.operation_area.create({
      data,
    });
  },
  update: async (id: number, data: any): Promise<any> => {
    return await prisma.operation_area.update({
      where: { id },
      data,
    });
  },
  delete: async (id: number): Promise<any> => {
    return await prisma.operation_area.delete({
      where: { id },
    });
  },
};
