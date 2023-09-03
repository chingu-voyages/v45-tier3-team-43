import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const emailTaken = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (emailTaken) {
    return NextResponse.json(
      { error: "Email already in use!" },
      { status: 422 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
