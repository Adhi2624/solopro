import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navinvmen from '../navinme';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
// import './Appointments.css'; // Import custom CSS

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(20);
  const backend = process.env.REACT_APP_BACKEND;
  const lstorage = localStorage.getItem('user');
  const lstorageparse = JSON.parse(lstorage);
  const id = lstorageparse.value.uid;
  const useremail=JSON.parse(localStorage.getItem('user')).value.email;
  let role = JSON.parse(localStorage.getItem('user')).value.role;
  role = role.toLowerCase();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.post(`${backend}/getappointments`, { id: id });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    const confirmChange = window.confirm("Are you sure you want to change the meeting status?");
    if (!confirmChange) return;
  
    try {
      await axios.post(`${backend}/updatestatus`, { appointmentId: appointmentId, meetingStatus: newStatus,email:useremail });
      fetchAppointments();
      

    } catch (error) {
      console.error('Error updating meeting status:', error);
    }
    window.location.reload(); // Refresh the page
  };
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateFilter = (event) => {
    setFilterDate(event.target.value);
  };

  const filterAppointments = (appointments) => {
    return appointments.filter(appointment => {
      const matchesSearchTerm = appointment.studentname.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilterDate = filterDate ? appointment.startDate === filterDate : true;
      return matchesSearchTerm && matchesFilterDate;
    });
  };

  const sortAppointments = (appointments) => {
    if (sortColumn) {
      return appointments.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return appointments;
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (column) => {
    if (column !== sortColumn) return <FaSort />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const currentAppointments = (appointments) => {
    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    return appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const Pagination = ({ appointmentsPerPage, totalAppointments, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalAppointments / appointmentsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} href="#" className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const upcomingAppointments = sortAppointments(filterAppointments(appointments.filter(app => app.meetingStatus === 'accepted')));
  const toBeApprovedAppointments = sortAppointments(filterAppointments(appointments.filter(app => app.meetingStatus === "waiting")));

  const renderTable = (appointments, showStatusColumn = false) => (
    <div className="table-responsive">
      <table className="table " id='mentor-table'>
        <thead>
          <tr>
            {['title', 'startDate', 'startTime', 'endDate', 'endTime', 'studentname', 'description'].map(column => (
              <th key={column} onClick={() => handleSort(column)} className="sortable-header">
                {column.charAt(0).toUpperCase() + column.slice(1)} {renderSortIcon(column)}
              </th>
            ))}
            {showStatusColumn && <th>Meeting Status</th>}
          </tr>
        </thead>
        <tbody>
          {currentAppointments(appointments).map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.title}</td>
              <td>{appointment.startDate}</td>
              <td>{appointment.startTime}</td>
              <td>{appointment.endDate}</td>
              <td>{appointment.endTime}</td>
              <td>{appointment.studentname}</td>
              <td>{appointment.description}</td>
              {showStatusColumn && (
                <td>
                  <select
                    value={appointment.meetingStatus}
                    onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                    className="form-control dropdown"
                  >
                    <option value="waiting">Waiting</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {appointments.length > 20 && (
        <Pagination
          appointmentsPerPage={appointmentsPerPage}
          totalAppointments={appointments.length}
          paginate={paginate}
        />
      )}
    </div>
  );

  return (
    < div style={{backgroundColor:"#040F15"}}>
      <Navinvmen />
      <div className='container-fluid mt-3' style={{backgroundColor:"#040F15"}}>
        <div className="row mb-3 justify-content-center">
          <div className="col-md-6 col-lg-3 mb-2">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by student name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-6 col-lg-3 mb-2">
            <input
              type="date"
              className="form-control"
              value={filterDate}
              onChange={handleDateFilter}
            />
          </div>
        </div>
        
        <h3 className='text-light'>Upcoming Meetings</h3>
        {upcomingAppointments.length > 0 ? renderTable(upcomingAppointments) : (
          <p className="text-center text-light">No upcoming meetings available.</p>
        )}

        <h3 className="mt-5 text-light">Meetings to be Approved</h3>
        {toBeApprovedAppointments.length > 0 ? renderTable(toBeApprovedAppointments, true) : (
          <p className="text-center text-light">No meetings to be approved.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
