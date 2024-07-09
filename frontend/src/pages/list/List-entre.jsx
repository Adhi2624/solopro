import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { useState } from "react";

import DatatableEntrepreneur from "../../components/datatable/Datatabe-entre"
const ListEntrepreneur = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="list">
      <Sidebar isOpen={isOpen} handleToggle={handleToggle} />
      <div className={`listContainer ${isOpen ? "sidebar-open" : ""}`}>
        <Navbar/>
        
        <DatatableEntrepreneur/>
      </div>
    </div>
  )
}

export default ListEntrepreneur