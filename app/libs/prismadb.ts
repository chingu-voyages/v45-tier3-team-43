// NextJS hot reloading can cause a bunch of new PrismaClient instances to be created
// this code allows us to assign the PrismaClient to a globalThis variable
// which is not affected by hot reloading

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
