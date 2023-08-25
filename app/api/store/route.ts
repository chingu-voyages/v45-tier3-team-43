import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const userHasStore = await prisma.store.findUnique({
    where: {
      userId: currentUser.id,
    },
  });

  if (userHasStore) {
    return NextResponse.json(
      { error: "User already has a store!" },
      { status: 422 }
    );
  }

  const body = await request.json();

  const { name, description, subdomain } = body;

  if (/^[A-Za-z0-9]*$/.test(subdomain) !== true) {
    // name has any kind of whitespace
    return NextResponse.json(
      { error: "letters/numbers only for subdomain!" },
      { status: 422 }
    );
  }
  // if (/\s/.test(subdomain)) {
  //   // name has any kind of whitespace
  //   return NextResponse.json(
  //     { error: "Subdomain cannot contain spaces!" },
  //     { status: 422 }
  //   );
  // }

  const subdomainTaken = await prisma.store.findUnique({
    where: {
      subdomain: subdomain,
    },
  });

  if (subdomainTaken) {
    return NextResponse.json(
      { error: "Subdomain already taken!" },
      { status: 422 }
    );
  }

  const store = await prisma.store.create({
    data: {
      name,
      description,
      subdomain,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(store);
}
