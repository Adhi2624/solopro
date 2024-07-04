import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavLink, Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import soloLogo1 from '../images/image.svg';
import axios from 'axios'

const Nav1 = React.memo(() => {
    // Retrieving data from localStorage
    
    const [profilePhoto, setProfilePhoto] = useState('');
    const lstorage = localStorage.getItem('user');
    const lstorageparse=JSON.parse(lstorage);
    console.log(lstorageparse.value.uid)
    const id=lstorageparse.value.uid;
    const [name,setName]=useState('')
    const backend=process.env.REACT_APP_BACKEND;
    useEffect(()=>{
        axios.post(`${backend}/student/getprofileimg`,{id:id}).then((res)=>{
            console.log(res.data)
            setProfilePhoto(res.data.profileImage);
            setName(res.data.name)
        }).catch((err)=>alert(err));
    },[id])

    // Function to handle logout
    const handleLogout = () => {
        // Remove items from localStorage
        
        localStorage.removeItem('user');

        // Redirect to login or home page
        // Example: Replace with your desired logout behavior
        window.location.href = '/'; // Redirect to login page after logout
    };

    return (
        <Navbar expand="lg" className="nav1">
            <Container>
                <Navbar.Brand href="/student/" className="d-flex align-items-center">
                    <img src={soloLogo1} style={{height:'40px !important'}} alt='logo' />
                    <span className="ms-2" style={{ color: "white", fontWeight: 500, fontSize: "1.75rem", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>SOLOPRO</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className='me-end'>
                        <NavLink href="/student/blogs" className="nav-item text-white">Blogs</NavLink>
                        <NavLink href="/student/mentorpage" className="nav-item text-white">Mentors</NavLink>
                        <NavLink href="/student/investorpage" className="nav-item text-white">Investors</NavLink>
                        <NavLink href="/alluser" className="nav-item text-white">All users</NavLink>
                        <NavLink href={`/student/studentprofile/${id}`} className="profile-link nav-item">
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

export default Nav1;
