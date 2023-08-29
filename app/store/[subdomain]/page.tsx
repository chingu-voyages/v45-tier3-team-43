import getStoreById from "@/app/actions/getStoreById";
import StorePageClient from "./StorePageClient";
import getProductsByStoreId from "@/app/actions/getProductsByStoreId";

interface IParams {
  subdomain: string;
}

const productsData = [
  {
    id: 1,
    title: "String",
    description: "String",
    price: 800,
    images: ["yes"],
    createdAt: "78",
    userId: 4,
    storeId: 67
  }
]

const StorePage = async ({ params }: { params: IParams }) => {
  const store = await getStoreById(params);
 const products = await getProductsByStoreId(params);

  return <StorePageClient store={store} products={products || productsData} />;
};
export default StorePage;
