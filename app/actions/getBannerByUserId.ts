import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getBannerByUserId() {
  try {
    const currentUser = await getCurrentUser();

    const banner = await prisma.banner.findUnique({
      where: {
        userId: currentUser?.id,
      },
    });

    return banner;
  } catch (error: any) {
    throw new Error(error);
  }
}
