import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, ListGroup, Modal, Form } from 'react-bootstrap';
import Nav1 from '../nav1';
import Navinvmen from '../navinme';
import '../../css/MentorProfile.css';

const MentorProfile = () => {
  const { role, id } = useParams();
  const [mentorProfile, setMentorProfile] = useState({});
  const [showModal, setShowModal] = useState(false);
  const lstorage = localStorage.getItem('user');
  const lstorageparse = JSON.parse(lstorage);
  
  const sid = lstorageparse.value.uid;
  const urole = lstorageparse.value.role;
  const isstudent = urole === 'Student';
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    meetinglink: '',
    meetingStatus: 'waiting',
    studentid: `${sid}`,
    mentorid: `${id}`,
    mentorname: '',
    studentname: '',
    description: ''
  });
  const [peru, setperu] = useState('');
  const [validated, setValidated] = useState(false);
  const backend = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    axios
      .post(`${backend}/get${role}`, { _id: id })
      .then((res) => {
        setMentorProfile(res.data);
      })
      .catch((error) => console.log(error));

    axios.post(`${backend}/student/getprofileimg`, { id: sid })
      .catch((err) => console.log(err));

    axios
      .post(`${backend}/getstudent`, { _id: sid })
      .then((res) => {
        setperu(res.data.name);
      })
      .catch((error) => console.log(error));
  }, [id, role, sid, backend]);

  const isAvailable = mentorProfile.availableToMentor === "true";

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setValidated(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails({ ...meetingDetails, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const updatedMeetingDetails = {
        ...meetingDetails,
        studentid: `${sid}`,
        mentorname: mentorProfile.name,
        studentname: `${peru}`
      };
      
      axios.post(`${backend}/schedulemeeting`, { meetingDetails: updatedMeetingDetails })
        .then((res) => {
          alert('Meeting request raised successfully.');
          handleCloseModal();
        })
        .catch((error) => alert(error));
    }
    setValidated(true);
  };

  return (
    <>
      {isstudent ? <Nav1 /> : <Navinvmen />}
      <Container fluid className="main-body mt-4">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="mentor-card mb-4">
              <Card.Body>
                <Row>
                  <Col md={4} className="text-center">
                    <div className="mentor-avatar mb-3">
                      <img src={mentorProfile.profileImage} alt="Mentor" className="rounded-circle" width="150" height="150" />
                    </div>
                    <h4>{mentorProfile.name || 'Unavailable'}</h4>
                    <p className="text-muted mb-1">{mentorProfile.areaOfExpertise || 'Unavailable'}</p>
                    <p className="text-muted mb-3">{mentorProfile.nativePlaceOrWork || 'Unavailable'}</p>
                    <Button variant="outline-primary" disabled={!isAvailable} onClick={handleShowModal}>
                      Book an appointment
                    </Button>
                  </Col>
                  <Col md={8}>
                    <h5 className="mb-3">Personal Details</h5>
                    <Row>
                      <Col sm={6}>
                        <ListGroup variant="flush" className="personal-details">
                          <ListGroup.Item>
                            <strong>Full Name:</strong> {mentorProfile.name || 'Unavailable'}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>No. of People Mentored:</strong> {mentorProfile.mentorshipCount || 'Unavailable'}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Status:</strong> <span className={`badge ${mentorProfile.availableToMentor === 'true' ? 'bg-success' : 'bg-danger'}`}>
                              {mentorProfile.availableToMentor === 'true' ? 'Available' : 'Not Available'}
                            </span>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col sm={6}>
                        <h5 className="mb-3">Expertise</h5>
                        <p>{mentorProfile.areaOfExpertise || 'Unavailable'}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="mentor-card">
              <Card.Body>
                <h5 className="mb-3">Social Networks</h5>
                <Row className="social-networks">
                  {[
                    { icon: <i className="bi bi-linkedin"></i>, label: 'LinkedIn', url: mentorProfile.linkedin },
                    { icon: <i className="bi bi-link-45deg"></i>, label: 'Website', url: mentorProfile.website },
                    { icon: <i className="bi bi-youtube"></i>, label: 'YouTube', url: mentorProfile.youtube },
                    { icon: <i className="bi bi-instagram"></i>, label: 'Instagram', url: mentorProfile.instagram },
                    { icon: <i className="bi bi-twitter-x"></i>, label: 'Twitter-x', url: mentorProfile.twitter },
                  ].map(({ icon, label, url }, index) => (
                    <Col md={4} sm={6} key={index} className="mb-3">
                      <div className="d-flex align-items-center">
                        {icon}
                        <div className="ms-2">
                          <h6 className="mb-0">{label}</h6>
                          <a href={url || '#'} target="_blank" rel="noopener noreferrer" className="text-truncate d-block">
                            {url || 'Unavailable'}
                          </a>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule a Meeting</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formMeetingTitle">
              <Form.Label>Meeting Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter meeting title"
                name="title"
                value={meetingDetails.title}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a meeting title.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMeetingLink">
              <Form.Label>Meeting Link</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter meeting link"
                name="meetinglink"
                value={meetingDetails.meetinglink}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a valid meeting link.</Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={meetingDetails.startDate}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please select a start date.</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formStartTime">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={meetingDetails.startTime}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please select a start time.</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={meetingDetails.endDate}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please select an end date.</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formEndTime">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={meetingDetails.endTime}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please select an end time.</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                value={meetingDetails.description}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Schedule Meeting
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MentorProfile;