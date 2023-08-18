import getCurrentUser from "./actions/getCurrentUser";
import HomePage from "./components/homepage/HomePage";

const Home = async () => {
  const currentUser = await getCurrentUser();

  return <HomePage currentUser={currentUser} />;
};
export default Home;
