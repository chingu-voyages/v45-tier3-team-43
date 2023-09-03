import getStoreById from "@/app/actions/getStoreById";
import StorePageClient from "./StorePageClient";
import getProductsByStoreId from "@/app/actions/getProductsByStoreId";
import getBannerByStoreId from "@/app/actions/getBannerByStoreId";

interface IParams {
  subdomain: string;
}

const StorePage = async ({ params }: { params: IParams }) => {
  const store = await getStoreById(params);
  const products = await getProductsByStoreId(params);
  const banner = await getBannerByStoreId(params);

  return <StorePageClient store={store} products={products} banner={banner} />;
};
export default StorePage;
