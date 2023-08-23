import getStoreById from "@/app/actions/getStoreById";
import StorePageClient from "./StorePageClient";

interface IParams {
  subdomain?: string;
}

const StorePage = async ({ params }: { params: IParams }) => {
  const store = await getStoreById(params);

  return <StorePageClient store={store} />;
};
export default StorePage;
