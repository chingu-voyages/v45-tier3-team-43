import getStoreById from "@/app/actions/getStoreById";
import StorePageClient from "./StorePageClient";
import getProductsByStoreId from "@/app/actions/getProductsByStoreId";
import getBannerByStoreId from "@/app/actions/getBannerByStoreId";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  subdomain: string;
}

const StorePage = async ({ params }: { params: IParams }) => {
  const store = await getStoreById(params);
  const allProducts = await getProductsByStoreId(params);
  const banner = await getBannerByStoreId(params);
  const currentUser = await getCurrentUser();

  const unarchivedProducts = allProducts.filter(
    (product) => product.archived !== true
  );

  return (
    <StorePageClient
      store={store}
      products={unarchivedProducts}
      banner={banner}
      currentUser={currentUser}
    />
  );
};
export default StorePage;
