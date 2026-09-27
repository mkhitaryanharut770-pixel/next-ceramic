/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AdminState } from "@/@types/admin";
import { isAdmin } from "@/lib/is-admin";
import { prisma } from "@/prisma/prisma-client";

interface Props {
  name: string;
  state: AdminState;
  property: "category" | "color";
  id?: number;
}

export const adminAllAction = async (data: Props) => {
  if (!(await isAdmin())) {
    throw new Error("Forbidden");
  }
  if (data.state === "create" && data.name.trim() !== "") {
    await (prisma[data.property] as any).create({
      data: { name: data.name },
    });
  } else if (data.state === "update" && data.id) {
    const findCategory = await (prisma[data.property] as any).findUnique({
      where: { id: data.id },
    });
    if (!findCategory) {
      throw new Error("category not found");
    }
    await (prisma[data.property] as any).update({
      where: { id: findCategory.id },
      data: { name: data.name },
    });
  } else if (data.state === "delete" && data.id) {
    const findCategory = await (prisma[data.property] as any).findUnique({
      where: { id: data.id },
    });
    if (!findCategory) {
      throw new Error("category not found");
    }
    const count = await prisma.product.count({
      where: { categoryId: findCategory.id },
    });
    if (count > 0) {
      throw new Error("used in product");
    }
    await (prisma[data.property] as any).delete({
      where: { id: findCategory.id },
    });
  }
};
