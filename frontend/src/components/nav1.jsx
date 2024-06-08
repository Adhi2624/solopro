import React from 'react';
import { Navbar, Container, Nav, NavLink } from 'react-bootstrap';
import soloLogo1 from '../images/image.svg';

const Nav1 = ({ username, profilePhoto }) => {
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
                        <NavLink href="/student/mentorpage" className="nav-item text-white">Mentors</NavLink>
                        <NavLink href="/student/investorpage" className="nav-item text-white">Investors</NavLink>
                        <NavLink href="#about-us" className="nav-item text-white">About Us</NavLink>
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

export default Nav1;
