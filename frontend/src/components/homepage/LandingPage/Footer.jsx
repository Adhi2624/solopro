import { CiHeart } from "react-icons/ci";
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from "react-router-dom"; 
import './FirstPage.css';

function Footer() {
  return (
    <footer className="foot text-center text-lg-start">
      <section className="foot d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div>
          <Link to="#!" className="me-4 text-reset">
            <i className="fab icon-facebook-f footer-icon" />
          </Link>
          <Link to="#!" className="me-4 text-reset">
            <i className="fab icon-twitter footer-icon" />
          </Link>
          <Link to="#!" className="me-4 text-reset">
            <i className="fab icon-google footer-icon" />
          </Link>
          <Link to="#!" className="me-4 text-reset">
            <i className="fab icon-instagram footer-icon" />
          </Link>
          <Link to="#!" className="me-4 text-reset">
            <i className="fab icon-linkedin footer-icon" />
          </Link>
          <Link to="#!" className="me-4 text-reset">
            <i className="fab icon-github footer-icon" />
          </Link>
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

<<<<<<< HEAD
            <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Background</h6>
              <p>
                <Link to="#!" className="text-reset">
                  Our history
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">
                  Job Opportunities
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">
                  Vendors
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">
                  Investors
=======
            

            <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Services</h6>
              <p>
                <Link to="/login" className="text-reset">
                  Find Investors
                </Link>
              </p>
              <p>
                <Link to="/login" className="text-reset">
                  Find Mentors
>>>>>>> e3f946724b2b68aaec0847ceb208368550127e10
                </Link>
              </p>
            </Col>

            <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Affiliate</h6>
              <p>
<<<<<<< HEAD
                <Link to="#!" className="text-reset">
                  Become a Partner
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">
                  Lead Generator
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">
                  Press Media
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">
                  Ambassadors
=======
                <Link to="/login" className="text-reset">
                  Network!
>>>>>>> e3f946724b2b68aaec0847ceb208368550127e10
                </Link>
              </p>
              
            </Col>

            <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Engage Us</h6>
              <p>
                <i className="icon-home me-3" />New York, NY 10012, US
              </p>
              <p>
                <i className="icon-envelope me-3" />
<<<<<<< HEAD
                info@example.com
=======
                soloprobusiness@gmail.com
>>>>>>> e3f946724b2b68aaec0847ceb208368550127e10
              </p>
              <p>
                <i className="icon-phone me-3" /> + 01 234 567 88
              </p>
              <p>
                <i className="icon-print me-3" /> + 01 234 567 89
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="text-center p-4" >
        © 2021 Copyright:
        <Link className="text-reset fw-bold" to="https://solopro.com/">Solopro.com</Link>
      </div>
    </footer>
  );
}

export default Footer;
