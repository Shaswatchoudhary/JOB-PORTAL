import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Home = () => {
  const { loading, error } = useGetAllJobs();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>
      <Categories />
      <LatestJobs></LatestJobs>
      <Footer></Footer>
    </div>
  );
};

export default Home;
