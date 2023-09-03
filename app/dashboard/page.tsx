import getBannerByUserId from "../actions/getBannerByUserId";
import getProductsByUserId from "../actions/getProductsByUserId";
import getStoreByUserId from "../actions/getStoreByUserId";
import DashboardClient from "./DashboardClient";

const Dashboard = async () => {
  const store = await getStoreByUserId();
  const products = await getProductsByUserId();
  const banner = await getBannerByUserId();

  return <DashboardClient store={store} products={products} banner={banner} />;
};
export default Dashboard;
