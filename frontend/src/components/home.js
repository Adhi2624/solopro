import { Link, useNavigate } from 'react-router-dom';
import Navbarr from "./nav";
import '../css/style.css';
import { Row, Col, Button, Container } from 'react-bootstrap';
import soloLogo1 from '../images/image.svg';
import Expedeimg from '../images/expedition.png';
import img1 from '../images/1.png';
import img2 from '../images/2.png';
import img3 from '../images/3.png';
import tmimg from '../images/team.png';
import service1 from '../images/service1.png';
import service2 from '../images/service2.png';
import service3 from '../images/service3.png';
import service4 from '../images/service4.png';
import { CiHeart } from "react-icons/ci";
import Stepper from './Timeline';
const Home = () => {
    const navigate = useNavigate();

    const handleSignUpNavigation = () => {
        navigate('/SignUp');
    };

    return (
        <>
        <div style={{ overflowX: 'hidden' }}> 
          <Navbarr/>
          <Container fluid style={{ height: '100vh', width: '100vw' }}>
            <div id="main" className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
              <div className="title-text text-center">
                <h1>Simplify Your Startup Journey</h1>
                <p className="mt-2">Your insightful expedition towards success starts here.</p>
                <Row className="justify-content-center gap-2 mt-5">
                  <Col md={3} className="text-center">
                    <Button className="px-4 helpbtn" size="lg" onClick={handleSignUpNavigation}>
                      Help in!
                    </Button>
                  </Col>
                  <Col md={3} className="text-center">
                    <Button variant="outline-light" size="lg">
                      Uncover More
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
  
          <div id="unleas" className="d-flex justify-content-center align-items-center py-3 mt-6" style={{ height: '100vh', width: '100vw' }}>
            <Container>
              <div id="unleas1" className="mx-auto text-center w-75">
                <img src={soloLogo1} className="w-50" alt="logo"></img>
                <h3 className="mt-2">Unleash Your Capability</h3>
                <p className="mt-2">Become an integral part of our thriving and prosperous startup environment.</p>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button className="px-4 imapcttbn mt-2" variant="outline" size="lg">
                    Create an Impact
                  </Button>
                </Link>
              </div>
            </Container>
          </div>
  
          <div id="course" className="d-flex flex-column justify-content-center align-items-center py-5 text-light" style={{ height: '100vh', width: '100vw' }}>
            <h2>Your Journey</h2>
            <Stepper />
          </div>
  
          <div id="expedition" className="p-3 d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <Container className="w-75">
              <Row>
                <Col>
                  <img src={Expedeimg} alt="exp img" className="bg-light w-100" style={{ height: '100%' }} />
                </Col>
                <Col className="my-auto">
                  <div>
                    <h3>Begin Your Expedition</h3>
                    <p className="mt-2">Leap into the future with VioletVanguard.</p>
                    <Button className="px-4 imapcttbn mt-2" variant="outline" size="lg">
                      Jump In
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
  
          <div id="envoffr" className="py-5 d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <div className="ms-5">
              <h3>Our Carefully Selected Environment offers</h3>
            </div>
            <Container className="w-100">
              <Row className="mt-5">
                <Col className="p-3">
                  <div className="text-start">
                    <img src={img1} height={30} className="ms-auto mb-3" alt="Image 1" />
                    <h4>Interactive Discussions</h4>
                    <p>Interactive guidance and investors from diverse areas.</p>
                  </div>
                </Col>
                <Col className="p-3">
                  <div className="text-start">
                    <img src={img2} alt="Image 2" height={30} className="mb-3" />
                    <h4>Educational Blogs</h4>
                    <p>Enjoy and learn at your pace, anywhere, anytime.</p>
                  </div>
                </Col>
                <Col className="p-3">
                  <div className="text-start">
                    <img src={img3} alt="Image 3" height={30} className="mb-3" />
                    <h4>Diverse Community</h4>
                    <p>Exchange, Learn and grow with your community.</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
  
          <div id="prtteam" className="py-5 d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <Container className="w-75">
              <Row>
                <Col>
                  <img src={tmimg} alt="exp img" className="bg-light rounded-circle w-75" />
                </Col>
                <Col className="my-auto">
                  <div>
                    <h3>Become Part of Our Champion Team</h3>
                    <p className="mt-2">Enhance your intellect and wisdom.</p>
                    <Button className="px-4 imapcttbn mt-2" variant="outline" size="lg">
                      Progress With Us
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
  
          <div id="services" className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <div className="ms-5">
              <h3>Services</h3>
              <p>Choose the best service for your entrepreneurial voyage.</p>
            </div>
            <Container className="">
              <Container className="mt-5">
                <Row className="gap-3">
                  <Col>
                    <img src={service1} alt="service1 img" className="bg-light rounded-4 service-img" />
                  </Col>
                  <Col className="my-auto">
                    <img src={service2} alt="service2 img" className="bg-light rounded-4 service-img" />
                  </Col>
                  <Col>
                    <img src={service3} alt="service3 img" className="bg-light rounded-4 service-img" />
                  </Col>
                  <Col>
                    <img src={service4} alt="service4 img" className="bg-light rounded-4 service-img" />
                  </Col>
                </Row>
              </Container>
            </Container>
          </div>
  
          <footer className="bg-light text-center text-lg-start text-muted" style={{ width: '100vw' }}>
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              <div>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-linkedin" />
                </a>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-github" />
                </a>
              </div>
            </section>
  
            <section>
              <Container className="text-center text-md-start mt-5">
                <Row className="mt-3">
                  <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                      <CiHeart />
                      Solopro
                    </h6>
                    <p>Elevating Startups</p>
                  </Col>
  
                  <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">Background</h6>
                    <p>
                      <a href="#!" className="text-reset">
                        Our history
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        Job Opportunities
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        News
                      </a>
                    </p>
                  </Col>
  
                  <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">Packages</h6>
                    <p>
                      <a href="#!" className="text-reset">
                        Features
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        Pricing Structure
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        Illustrations
                      </a>
                    </p>
                  </Col>
  
                  <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">Engage</h6>
                    <p>Tweet to Us</p>
                    <p>Stay Updated</p>
                    <p>Community Chats</p>
                  </Col>
                </Row>
              </Container>
            </section>
            <div className="bg-light text-center p-4">
              <Row>
                <Col lg={6} className="text-start">© SOLOPRO 2024</Col>
                <Col lg={6} className="text-end">
                  <Row>
                    <Col>
                      <p>Privacy</p>
                    </Col>
                    <Col>
                      <p>Policy</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </footer>
        </div>
      </>
    );
  };
export default Home;