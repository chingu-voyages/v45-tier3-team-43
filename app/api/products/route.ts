import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getStoreByUserId from "@/app/actions/getStoreByUserId";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const currentStore = await getStoreByUserId();

  if (!currentStore) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { title, description, price, images } = body;

  if (!title || !description || !price || images.length === 0) {
    return NextResponse.json(
      { error: "At least one image required!" },
      { status: 422 }
    );
  }

  if (title.length > 45) {
    return NextResponse.json(
      { error: "Max 45 Chars For Title!" },
      { status: 422 }
    );
  }

  if (price.length > 4) {
    return NextResponse.json({ error: "Max $9999 For Price" }, { status: 422 });
  }

  if (images.length > 3) {
    return NextResponse.json({ error: "Max 3 Images!" }, { status: 422 });
  }

  const product = await prisma.product.create({
    data: {
      title,
      description,
      price: parseInt(price, 10),
      images,
      userId: currentUser.id,
      storeId: currentStore.id,
    },
  });

  return NextResponse.json(product);
}
