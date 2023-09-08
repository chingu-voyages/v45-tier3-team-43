import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getProductsByUserId() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const store = await prisma.store.findUnique({
      where: {
        userId: currentUser?.id,
      },
    });

    if (!store) {
      return null;
    }

    const orders = await prisma.order.findMany({
      where: {
        storeId: store?.id,
        isPaid: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
