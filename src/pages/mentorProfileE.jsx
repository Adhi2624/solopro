import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap';
import Nav1 from '../components/nav1';
import '../css/MentorProfile.css'; // Import CSS file

const MentorProfileE = () => {
  const { _id } = useParams();
  const [mentorProfile, setMentorProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const backend = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    axios
      .post(`${backend}/getmentor`, { _id: _id })
      .then((res) => {
        setMentorProfile(res.data);
        setEditedProfile(res.data); // Initialize editedProfile with the fetched data
      })
      .catch((error) => alert(error));
  }, [_id, backend]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    axios
      .post(`${backend}/updatementor`, editedProfile)
      .then((res) => {
        setMentorProfile(editedProfile);
        setEditMode(false);
        alert('Profile updated successfully');
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
                      <img src={mentorProfile.imgurl || 'https://via.placeholder.com/150'} alt="Mentor" className="rounded-circle" width="150" />
                    </div>
                    <div className="mt-3">
                      <h4>
                        {editMode ? (
                          <Form.Control
                            type="text"
                            name="name"
                            value={editedProfile.name || ''}
                            onChange={handleInputChange}
                          />
                        ) : (
                          mentorProfile.name || 'Unavailable'
                        )}
                      </h4>
                      <p className="mb-1">
                        {editMode ? (
                          <Form.Control
                            type="text"
                            name="areaOfExpertise"
                            value={editedProfile.areaOfExpertise || ''}
                            onChange={handleInputChange}
                          />
                        ) : (
                          mentorProfile.areaOfExpertise || 'Unavailable'
                        )}
                      </p>
                      <p className="font-size-sm">
                        {editMode ? (
                          <Form.Control
                            type="text"
                            name="placeOfService"
                            value={editedProfile.placeOfService || ''}
                            onChange={handleInputChange}
                          />
                        ) : (
                          mentorProfile.placeOfService || 'Unavailable'
                        )}
                      </p>
                      {!editMode && (
                        <Button variant="outline-primary" disabled={mentorProfile.Status !== "Available"} className="mt-2">
                          Book an appointment
                        </Button>
                      )}
                    </div>
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col sm={6}>
                        <h5>Personal Details</h5>
                        <ListGroup variant="flush" className="personal-details">
                          <ListGroup.Item>
                            <h6 className="mb-0">Full Name</h6>
                            {editMode ? (
                              <Form.Control
                                type="text"
                                name="name"
                                value={editedProfile.name || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{mentorProfile.name || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">No. of People Mentored</h6>
                            {editMode ? (
                              <Form.Control
                                type="text"
                                name="noOfPeopleMentored"
                                value={editedProfile.noOfPeopleMentored || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{mentorProfile.noOfPeopleMentored || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">Status</h6>
                            {editMode ? (
                              <Form.Control
                                as="select"
                                name="Status"
                                value={editedProfile.Status || ''}
                                onChange={handleInputChange}
                              >
                                <option value="Available">Available</option>
                                <option value="Not available">Not available</option>
                              </Form.Control>
                            ) : (
                              <span className={mentorProfile.Status === 'Available' ? 'badge text-bg-success' : 'badge text-bg-danger'}>
                                {mentorProfile.Status || 'Unavailable'}
                              </span>
                            )}
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col sm={6}>
                        <h5>About Me</h5>
                        {editMode ? (
                          <Form.Control
                            as="textarea"
                            name="about"
                            value={editedProfile.about || ''}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p>{mentorProfile.about || 'Unavailable'}</p>
                        )}
                        <h5>Expertise</h5>
                        {editMode ? (
                          <Form.Control
                            as="textarea"
                            name="expertise"
                            value={editedProfile.expertise || ''}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <ul className="list-unstyled">
                            {mentorProfile.expertise &&
                              mentorProfile.expertise.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                          </ul>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end mt-3">
                  {editMode ? (
                    <>
                      <Button variant="success" onClick={handleSaveChanges} className="me-2">
                        Save
                      </Button>
                      <Button variant="secondary" onClick={handleEditToggle}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={handleEditToggle}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MentorProfileE;
