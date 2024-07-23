import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavLink, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import soloLogo1 from '../images/image.svg';
import axios from 'axios';

const Navinvmen = React.memo(() => {
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState('');
  const lstorage = localStorage.getItem('user');
  const lstorageparse = JSON.parse(lstorage);
  console.log(lstorageparse.value.uid)
  const id = lstorageparse.value.uid;
  const [name, setName] = useState('');
  var role = lstorageparse.value.role;
  const backend = process.env.REACT_APP_BACKEND;
  // const fetchAppointmentCount = async () => {
  //   try {
  //     const response = await axios.get('/api/appointments/count');
  //     setAppointmentCount(response.data.count);
  //   } catch (error) {
  //     console.error('Error fetching appointment count:', error);
  //   }
  // };

  useEffect(() => {
    axios.post(`${backend}/${role}/getprofileimg`, { id: id }).then((res) => {
      console.log(res.data)
      setProfilePhoto(res.data.profileImage);
      setName(res.data.name)
    }).catch((err) => alert(err));
    // fetchAppointmentCount();
  }, []);

  const handleLogout = () => {
    // Remove items from localStorage

    localStorage.removeItem('user');

    // Redirect to login or home page
    // Example: Replace with your desired logout behavior
    window.location.href = '/'; // Redirect to login page after logout
  };

  return (
    <Navbar expand="lg" className="nav1 ">
      <Container>
        <Navbar.Brand href="/mi" className="d-flex align-items-center">
          <img src={soloLogo1} height={50} alt='logo' />
          <span className="ms-2" style={{ color: "white", fontWeight: 500, fontSize: "1.75rem", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>SOLOPRO</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className='me-end'>
            <NavLink href="/mi/blogs" className="nav-item text-white">Blogs</NavLink>
            <NavLink as={Link} to="/mi/appointments" className="nav-item text-white">
              Appointments {appointmentCount > 0 && (<span className="badge bg-secondary">{appointmentCount}</span>)}
            </NavLink>
            <NavLink href="/mi/community" className="nav-item text-white">Solopro Community</NavLink>
            <NavLink href="/mi/alluser" className="nav-item text-white">All Users</NavLink>
            <NavLink href={`/mi/miprofile/${id}`} className="profile-link nav-item">
              <div className='d-flex align-items-center col'>
                <img src={profilePhoto} width="30" height="30" className="rounded-circle me-2" alt="profile" />
                {name}
              </div>
            </NavLink>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default Navinvmen;