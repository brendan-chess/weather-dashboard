import prisma from "@/app/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (query == null) return NextResponse.json([]);

  const search = await prisma.city.findMany({
    where: {
      city: {
        startsWith: query,
        mode: "insensitive",
      },
    },
    take: 10,
  });

  return NextResponse.json(search);
}
