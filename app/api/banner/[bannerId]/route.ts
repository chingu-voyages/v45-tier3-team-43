import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  bannerId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { bannerId } = params;

  if (!bannerId || typeof bannerId !== "string") {
    throw new Error("Invalid ID");
  }

  const banner = await prisma.banner.deleteMany({
    where: {
      id: bannerId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(banner);
}
