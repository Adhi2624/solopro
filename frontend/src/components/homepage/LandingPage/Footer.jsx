import { CiHeart } from "react-icons/ci";
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './FirstPage.css';

function Footer() {
  return (
    <footer className="foot text-center text-lg-start bg-black text-white">
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

            <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Services</h6>

              <p>
                <Link to="/signup" className="text-reset">
                  Mentors
                </Link>
              </p>
              <p>
                <Link to="/signup" className="text-reset">
                  Investors
                </Link>
              </p>
              <p>
                <Link to="/signup" className="text-reset">
                  community
                </Link>
              </p>
              <p>
                <Link to="/signup" className="text-reset">
                  Blog
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
                <a href="mailto:soloprobusiness@gmail.com">soloprobusiness@gmail.com</a>
              </p>
              <p>
                <i className="icon-phone me-3" />
                <a href="tel:+0123456788">+ 01 234 567 88</a>
              </p>
              <p>
                <i className="icon-print me-3" />
                <a href="tel:+0123456789">+ 01 234 567 89</a>
              </p>
            </Col>

          </Row>
        </Container>
      </section>

      <div className="text-center p-4" >
        © 2021 Solopro.com
      </div>
    </footer>
  );
}

export default Footer;
