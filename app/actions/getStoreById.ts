import prisma from "@/app/libs/prismadb";

interface IParams {
  subdomain?: string;
}

export default async function getStoreById(params: IParams) {
  try {
    const { subdomain } = params;

    const store = await prisma.store.findUnique({
      where: {
        subdomain: subdomain,
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
