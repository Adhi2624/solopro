import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/homepage/LandingPage/Navbarbri";
import { useState } from "react";

import DatatableStudents from "../../components/datatable/Datatabe-Students"
const ListStudents = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="list">
      <Sidebar isOpen={isOpen} handleToggle={handleToggle} />
      <div className={`listContainer ${isOpen ? "sidebar-open" : ""}`}>
        {/* <Navbar/> */}
        
        <DatatableStudents/>
      </div>
    </div>
  )
}

export default ListStudents