import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navinvmen from '../navinme';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const backend = process.env.REACT_APP_BACKEND;
  const lstorage = localStorage.getItem('user');
    const lstorageparse=JSON.parse(lstorage);
    console.log(lstorageparse.value.uid)
    const id=lstorageparse.value.uid;
    let role = JSON.parse(localStorage.getItem('user')).value.role;
role = role.toLowerCase();
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.post(`${backend}/getappointments`, { id:id });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.post(`${backend}/updatestatus`, {appointmentId:appointmentId, meetingStatus: newStatus });
      fetchAppointments(); // Fetch updated appointments after status change
    } catch (error) {
      console.error('Error updating meeting status:', error);
    }
  };

  return (
    <>
      <Navinvmen />
      <div className='mt-3'></div>
      <div className="container">
        <div className="row justify-content-center">
            
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment._id} className="col-md-8 col-lg-10 mb-3">
                <div className="card student-card bg-dark text-white">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{appointment.title}</h5>
                    <div className="d-flex flex-wrap">
                      <p className="card-text col-md-6">Start Date: {appointment.startDate}</p>
                      <p className="card-text col-md-6">Start Time: {appointment.startTime}</p>
                      <p className="card-text col-md-6">End Date: {appointment.endDate}</p>
                      <p className="card-text col-md-6">End Time: {appointment.endTime}</p>
                      <p className="card-text col-md-6">Meeting Link: {appointment.meetinglink || 'N/A'}</p>
                      <p className="card-text col-md-6">Student ID: {appointment.studentid}</p>
                      <p className="card-text col-md-6">Mentor ID: {appointment.mentorid}</p>
                      <p className="card-text col-md-6">Description: {appointment.description}</p>
                      <div className="form-group col-md-6">
                      <label htmlFor={`status-${appointment._id}`}>Meeting Status:</label>
                      <select
                        id={`status-${appointment._id}`}
                        value={appointment.meetingStatus}
                        onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                        className="form-control"
                      >
                        <option value="waiting">Waiting</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    </div>
                  </div>
                  
                </div>
                
              </div>
            ))
          ) : (
            <p className="text-white">No appointments available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Appointments;
