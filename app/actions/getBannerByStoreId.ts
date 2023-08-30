import prisma from "@/app/libs/prismadb";
import getStoreById from "./getStoreById";

interface IParams {
  subdomain: string;
}

export default async function getBannerByStoreId(params: IParams) {
  try {
    const store = await getStoreById(params);

    const banner = await prisma.banner.findUnique({
      where: {
        storeId: store?.id,
      },
    });

    return banner;
  } catch (error: any) {
    throw new Error(error);
  }
}
