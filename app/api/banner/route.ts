import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const userStore = await prisma.store.findUnique({
    where: {
      userId: currentUser.id,
    },
  });

  if (!userStore) {
    return NextResponse.json(
      { error: "User hasn't created a store!" },
      { status: 422 }
    );
  }

  const userHasBanner = await prisma.banner.findUnique({
    where: {
      storeId: userStore.id,
    },
  });

  if (userHasBanner) {
    return NextResponse.json({ error: "User has a banner!" }, { status: 422 });
  }

  const body = await request.json();

  const { bannerText, bannerImage } = body;

  if (!bannerText || !bannerImage) {
    return NextResponse.json(
      { error: "Text and Image required!" },
      { status: 422 }
    );
  }

  if (bannerText.length > 100) {
    return NextResponse.json({ error: "100 chars max!" }, { status: 422 });
  }

  const banner = await prisma.banner.create({
    data: {
      bannerText,
      bannerImage,
      storeId: userStore.id,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(banner);
}
