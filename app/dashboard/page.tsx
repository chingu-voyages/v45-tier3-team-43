import getProductsByUserId from "../actions/getProductsByUserId";
import getStoreByUserId from "../actions/getStoreByUserId";
import DashboardClient from "./DashboardClient";

const Dashboard = async () => {
  const store = await getStoreByUserId();
  const products = await getProductsByUserId();

  return <DashboardClient store={store} products={products} />;
};
export default Dashboard;
