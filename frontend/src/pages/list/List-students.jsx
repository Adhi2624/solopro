import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import DatatableStudents from "../../components/datatable/Datatabe-Students"
const ListStudents = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        
        <DatatableStudents/>
      </div>
    </div>
  )
}

export default ListStudents