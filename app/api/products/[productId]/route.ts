import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  productId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
      userId: currentUser.id,
    },
  });

  if (!product) {
    return NextResponse.error();
  }

  let value;

  if (product.archived === false) {
    value = true;
  } else {
    value = false;
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
      userId: currentUser.id,
    },
    data: {
      archived: value,
    },
  });

  return NextResponse.json(updatedProduct);
}
