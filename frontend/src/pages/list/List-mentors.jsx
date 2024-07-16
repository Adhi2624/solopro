import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/homepage/LandingPage/Navbarbri"
import { useState } from "react";

import DatatableMentors from "../../components/datatable/Datatable-Mentors"

const ListMentors = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="list">
      <Sidebar isOpen={isOpen} handleToggle={handleToggle} />
      <div className="listContainer">
        {/* <Navbar/> */}
        
        <DatatableMentors/>
        
      </div>
    </div>
  )
}

export default ListMentors