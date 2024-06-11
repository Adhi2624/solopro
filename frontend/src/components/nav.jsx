import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import soloLogo1 from '../images/image.svg';
import '../css/style.css';

const Navbarr = () => {
    return (
        <Navbar expand="lg" className="rounded-4 mt-lg-2 mx-lg-1 rounded-sm-0 mt-md-1 mx-sm-0">
            <Container fluid>

                {/* Toggler for small screens */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* Navbar links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* First three links aligned to left corner */}
                        <Nav.Link href="#our-storyline" className='text-nowrap'>Our Storyline</Nav.Link>
                        <Nav.Link href="#our-initiatives" className='text-nowrap'>Our Initiatives</Nav.Link>
                        <Nav.Link as={Link} to="./signup" className='text-nowrap'>Join our Tribe!</Nav.Link>
                    </Nav>
                    {/* Logo centered */}
                    <Navbar.Brand href="/" className="mx-auto">
                        <img src={soloLogo1} height={30} alt='logo' />
                        <span className="align-self-center ms-2">SOLOPRO</span>
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        {/* Last two links aligned to right corner */}
                        <Nav.Link as={Link} to="./signUp" className='text-nowrap'>Register Now</Nav.Link>
                        <Nav.Link as={Link} to="./login" className='text-nowrap'>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navbarr;
