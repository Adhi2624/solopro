import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import logo from './image.svg';

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="students" />
          <Widget type="mentors" />
          <Widget type="investors" />
        </div>
        <div className="charts">
          <Featured />
        </div>
        <div className="imageContainer">
          {/* <img src={logo} style={{width:'100%'}} alt="Logo" className="responsiveImage" /> */}
        </div>
      </div>
    </div>
  );
};


export default Home;
