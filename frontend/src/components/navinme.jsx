import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import soloLogo1 from '../images/image.svg';
import axios from 'axios';

const Navinvmen = ({ username, profilePhoto }) => {
  const [appointmentCount, setAppointmentCount] = useState(0);

  const fetchAppointmentCount = async () => {
    try {
      const response = await axios.get('/api/appointments/count');
      setAppointmentCount(response.data.count);
    } catch (error) {
      console.error('Error fetching appointment count:', error);
    }
  };

  useEffect(() => {
    fetchAppointmentCount();
  }, []);

  return (
    <Navbar expand="lg" className="nav1 ">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img src={soloLogo1} height={50} alt='logo' />
          <span className="ms-2" style={{ color: "white", fontWeight: 500, fontSize: "1.75rem", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>SOLOPRO</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className='me-end'>
            <NavLink href="#blogs" className="nav-item text-white">Blogs</NavLink>
            <NavLink href="#about-us" className="nav-item text-white">About Us</NavLink>
            <NavLink as={Link} to="appointment" className="nav-item text-white">
              Appointments {appointmentCount > 0 && (<span className="badge bg-secondary">{appointmentCount}</span>)}
            </NavLink>
            <NavLink href="#profile" className="profile-link nav-item">
              <div className='d-flex align-items-center col'>
                <img src={profilePhoto} width="30" height="30" className="rounded-circle me-2" alt="profile" />
                {username}
              </div>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navinvmen;