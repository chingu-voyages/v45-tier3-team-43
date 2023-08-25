import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getProductsByUserId() {
  try {
    const currentUser = await getCurrentUser();

    const products = await prisma.product.findMany({
      where: {
        userId: currentUser?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
