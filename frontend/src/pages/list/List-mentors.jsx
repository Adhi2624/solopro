import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import DatatableMentors from "../../components/datatable/Datatable-Mentors"

const ListMentors = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        
        <DatatableMentors/>
        
      </div>
    </div>
  )
}

export default ListMentors