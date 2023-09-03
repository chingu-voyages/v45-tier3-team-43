import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getStoreByUserId() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const store = await prisma.store.findUnique({
      where: {
        userId: currentUser?.id,
      },
      include: {
        user: true,
      },
    });

    if (!store) {
      return null;
    }

    return store;
  } catch (error: any) {
    throw new Error(error);
  }
}
