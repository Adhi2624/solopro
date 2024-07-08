import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, ListGroup, Modal, Form } from 'react-bootstrap';
import Nav1 from '../nav1';
import '../../css/MentorProfile.css'; // Import CSS file

const MentorProfile = () => {
  const { role,id } = useParams();
  const [mentorProfile, setMentorProfile] = useState({});
  const [showModal, setShowModal] = useState(false);
  const lstorage = localStorage.getItem('user');
    const lstorageparse=JSON.parse(lstorage);
    
    const sid=lstorageparse.value.uid;
    console.log(sid);
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    meetinglink:'',
    meetingStatus:'waiting',
    studentid:'',
    mentorid:`${id}`,
    mentorname:'',
    studentname:''
  });

  const backend = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    console.log(id);
    axios
      .post(`${backend}/get${role}`, { _id: id })
      .then((res) => {
        setMentorProfile(res.data);
        console.log(mentorProfile);
        setMeetingDetails({
          ...meetingDetails,
          studentid:`${sid}`,// Same here, use studentid as a string,
          mentorname:mentorProfile.name
        });
      })
      .catch((error) => alert(error));

      axios.post(`${backend}/student/getprofileimg`,{id:sid}).then((res)=>{
        setMeetingDetails({...meetingDetails,studentname:res.data.name})
    }).catch((err)=>alert(err));

  }, [id]);

  const isAvailable = mentorProfile.availableToMentor === "true";
  
  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails({ ...meetingDetails, [name]: value });
  };

  const handleFormSubmit = () => {
    const data = {
      ...meetingDetails,
    };
    console.log(meetingDetails);
    axios.post(`${backend}/schedulemeeting`, {meetingDetails})
      .then((res) => {
        alert('Meeting request raised successfully.');
        // alert('Meeting request raised successfully. you will receive the response via mail');
        handleCloseModal();
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <Nav1 />
      <Container fluid className="main-body mt-lg-3">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="mentor-card">
              <Card.Body>
                <Row>
                  <Col md={4} className="mb-4 mb-md-0 text-center">
                    <div className="mentor-avatar">
                      <img src={mentorProfile.proofImage} alt="Mentor" className="rounded-circle" width="150" />
                    </div>
                    <div className="mt-3">
                      <h4>{mentorProfile.name || 'Unavailable'}</h4>
                      <p className="mb-1">{mentorProfile.areaOfExpertise || 'Unavailable'}</p>
                      <p className="font-size-sm">{mentorProfile.nativePlaceOrWork || 'Unavailable'}</p>
                      <Button variant="outline-primary" disabled={!isAvailable} className="mt-2" onClick={handleShowModal}>
                        Book an appointment
                      </Button>
                    </div>
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col sm={6}>
                        <h5>Personal Details</h5>
                        <ListGroup variant="flush" className="personal-details">
                          <ListGroup.Item>
                            <h6 className="mb-0">Full Name</h6>
                            <span className="">{mentorProfile.name || 'Unavailable'}</span>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">No. of People Mentored</h6>
                            <span className="">{mentorProfile.mentorshipCount || 'Unavailable'}</span>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">Status</h6>
                            <span className={mentorProfile.availableToMentor === 'true' ? 'badge text-bg-success' : 'badge text-bg-danger'}>{mentorProfile.availableToMentor === 'true' ? 'Available' : 'Not Available'}</span>
                           
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col sm={6}>
                        {/* <h5>About Me</h5>
                        <p className="">
                          {mentorProfile.about || 'Unavailable'}
                        </p> */}
                        <h5>Expertise</h5>
                        <p>{mentorProfile.areaOfExpertise}</p>
                        {/* <ul className="list-unstyled">
                          {mentorProfile.expertise &&
                            mentorProfile.expertise.map((item, index) => (
                              <li key={index} className="">
                                {item}
                              </li>
                            ))}
                        </ul> */}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col lg={8} md={10}>
            <Card className="mentor-card">
              <Card.Body>
                <h5 className="mb-3">Social Networks</h5>
                <Row className="social-networks">
                  {[
                    {
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                      </svg>, label: 'LinkedIn', url: mentorProfile.linkedin || 'Unavailable'
                    },
                    {
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                      </svg>, label: 'Website', url: mentorProfile.website || 'Unavailable'
                    },
                    {
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                      </svg>, label: 'YouTube', url: mentorProfile.youtube || 'Unavailable'
                    },
                    {
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                      </svg>, label: 'Instagram', url: mentorProfile.instagram || 'Unavailable'
                    },
                    {
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                      </svg>, label: 'Twitter-x', url: mentorProfile.twitter || 'Unavailable'
                    },
                  ].map(({ icon, label, url }, index) => (
                    <Col md={4} sm={6} key={index} className="mb-3">
                      <ListGroup.Item>
                        <h6 className="mb-0">
                          {icon} 
                          {label}
                        </h6>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                      </ListGroup.Item>
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
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMeetingTitle">
              <Form.Label>Meeting Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter meeting title"
                name="title"
                value={meetingDetails.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMeetingTitle">
              <Form.Label>Meeting link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter meeting title"
                name="meetinglink"
                value={meetingDetails.meetinglink}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={meetingDetails.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={meetingDetails.startTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={meetingDetails.endDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={meetingDetails.endTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                value={meetingDetails.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Schedule Meeting
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MentorProfile;
