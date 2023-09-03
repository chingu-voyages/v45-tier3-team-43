import prisma from "@/app/libs/prismadb";
import getStoreById from "./getStoreById";

interface IParams {
  subdomain: string;
}

export default async function getProductsByStoreId(params: IParams) {
  try {
    const store = await getStoreById(params);

    const products = await prisma.product.findMany({
      where: {
        storeId: store?.id,
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
