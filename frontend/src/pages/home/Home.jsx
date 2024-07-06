import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useState } from "react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="home">
      <Sidebar isOpen={isOpen} handleToggle={handleToggle} />
      <div className={`homeContainer ${isOpen ? "sidebar-open" : ""}`}>
        <div className="widgets">
          <Widget type="students" />
          <Widget type="mentors" />
          <Widget type="investors" />
        </div>
        <div className="charts">
          <Featured />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
