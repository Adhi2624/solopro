import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Player } from '@lottiefiles/react-lottie-player';
import BLOG from './BLOG.json'; // Import the Lottie animation JSON file
import Investor from './investor.json'
import mentor from './mentor.json'
import home from './home.json';
const LandingPage = () => {
  const services = [
    {
      title: 'Blog',
      animationUrl: BLOG, // Use the imported BLOG object directly
      link: '/blog'
    },
    {
      title: 'Find Investor',
      animationUrl: Investor,
      link: '/find-investor'
    },
    {
      title: 'Find Mentor',
      animationUrl: mentor,
      link: '/find-mentor'
    },
    {
      title: 'Home Page',
      animationUrl: home,
      link: '/'
    },
  ];

  return (
    <div style={{ backgroundColor: '#040F15', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container>
        <Row className="text-center">
          {services.map((service, index) => (
            <Col key={index} xs={12} md={6} lg={3} className="mb-4">
              <Card className="h-100" style={{ backgroundColor: '#040F15', color: 'white', border:'groove' }}>
                <Card.Body>
                  <Player
                    src={service.animationUrl}
                    className="mx-auto"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                    style={{ height: '200px' }}
                    onError={(error) => console.log('Lottie Error:', error)}
                  />
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>
                    {`Explore our ${service.title} services.`}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <a href={service.link} className="btn btn-primary">
                    Take me there
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
