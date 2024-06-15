import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Player } from '@lottiefiles/react-lottie-player';

const LandingPage = () => {
  const services = [
    {
      title: 'Blog',
      animation: 'https://assets9.lottiefiles.com/packages/lf20_9rsyskl2.json',
      link: '/blog'
    },
    {
      title: 'Find Investor',
      animation: 'https://assets9.lottiefiles.com/packages/lf20_ukxz5qnn.json',
      link: '/find-investor'
    },
    {
      title: 'Find Mentor',
      animation: 'https://assets9.lottiefiles.com/packages/lf20_nkkxldru.json',
      link: '/find-mentor'
    },
    {
      title: 'Home Page',
      animation: 'https://assets9.lottiefiles.com/packages/lf20_c6zhqx.json',
      link: '/'
    },
  ];

  return (
    <div style={{ backgroundColor: '#040F15', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container>
        <Row className="text-center">
          {services.map((service, index) => (
            <Col key={index} xs={12} md={6} lg={3} className="mb-4">
              <Card className="h-100" style={{ backgroundColor: '#1c1c1c', color: 'white', border: 'none' }}>
                <Card.Body>
                  <Player
                    src={service.animation}
                    className="mx-auto"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                    style={{ height: '200px' }}
                  />
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>
                    {`Explore our ${service.title} services.`}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <a href={service.link} className="btn btn-primary">
                    Go to {service.title}
                  </a>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
