import { isAdmin } from "@/lib/is-admin";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const orders = await prisma.order.findMany();

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error GET ORDERS " + error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
