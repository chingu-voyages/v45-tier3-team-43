import getBannerByUserId from "../actions/getBannerByUserId";
import getOrdersByUserId from "../actions/getOrdersByUserId";
import getProductsByUserId from "../actions/getProductsByUserId";
import getStoreByUserId from "../actions/getStoreByUserId";
import DashboardClient from "./DashboardClient";

const Dashboard = async () => {
  const store = await getStoreByUserId();
  const products = await getProductsByUserId();
  const banner = await getBannerByUserId();
  const orders = await getOrdersByUserId();

  return (
    <DashboardClient
      store={store}
      products={products}
      banner={banner}
      orders={orders}
    />
  );
};
export default Dashboard;
