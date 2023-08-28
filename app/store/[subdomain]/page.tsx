import getStoreById from "@/app/actions/getStoreById";
import StorePageClient from "./StorePageClient";
import getProductsByStoreId from "@/app/actions/getProductsByStoreId";

interface IParams {
  subdomain: string;
}

const StorePage = async ({ params }: { params: IParams }) => {
  const store = await getStoreById(params);
  const products = await getProductsByStoreId(params);

  return <StorePageClient store={store} products={products} />;
};
export default StorePage;
