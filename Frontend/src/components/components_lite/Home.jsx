import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
const Home = () => {
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
