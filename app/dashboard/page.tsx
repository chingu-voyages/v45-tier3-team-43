import getStoreByUserId from "../actions/getStoreByUserId";
import DashboardClient from "./DashboardClient";

const Dashboard = async () => {
  const store = await getStoreByUserId();

  return <DashboardClient store={store} />;
};
export default Dashboard;
