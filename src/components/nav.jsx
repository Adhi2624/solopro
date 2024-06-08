import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import soloLogo1 from '../images/image.svg';
import '../css/style.css';

const Navbarr = () => {
    return (
        <Navbar expand="lg" className="rounded-4 mt-lg-2 mx-lg-1 rounded-sm-0 mt-md-1 mx-sm-0">
            <Container>
                <Navbar.Brand href="/" className="d-lg-none">
                    <img src={soloLogo1} height={30} alt='logo' />
                    <span className="align-self-center">SOLOPRO</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#our-storyline" className='text-nowrap'>Our Storyline</Nav.Link>
                        <Nav.Link href="#our-initiatives" className='text-nowrap'>Our Initiatives</Nav.Link>
                        <Nav.Link href="#join-our-tribe" className='text-nowrap'>Join our Tribe!</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto d-lg-none">
                        <Nav.Link href="#register-now" className='text-nowrap'>Register Now</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <div className="d-none d-lg-flex w-100 justify-content-center">
                    <Navbar.Brand href="/" className="d-flex align-items-center">
                        <img src={soloLogo1} height={30} alt='logo' />
                        <span className="align-self-center">SOLOPRO</span>
                    </Navbar.Brand>
                </div>
                <div className="d-none d-lg-flex">
                    <Nav className="ms-auto">
                        <Nav.Link href="#register-now" className='text-nowrap'>Register Now</Nav.Link>
                    </Nav>
                </div>
            </Container>
        </Navbar>
    );
};

export default Navbarr;
