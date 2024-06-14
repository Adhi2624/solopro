import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';
import Nav1 from '../nav1';
import '../../css/Studentprofile.css'; // Import CSS file

const StudentProfile = () => {
  const { _id } = useParams();
  const [studentProfile, setStudentProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [scheduledAppointments,setscheduledAppointments]=useState([]);
  localStorage.setItem("studentid",_id);
  const backend = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    axios
      .post(`${backend}/getstudent`, { _id: _id })
      .then((res) => {
        setStudentProfile(res.data);
        setEditedProfile(res.data);
      })
      .catch((error) => alert(error));
  }, [_id, backend]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProfile(studentProfile);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleFormSubmit = () => {
    axios
      .post(`${backend}/updatestudent`, editedProfile)
      .then((res) => {
        alert('Profile updated successfully!');
        setStudentProfile(editedProfile);
        setIsEditing(false);
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <Nav1 />
      <Container fluid className="main-body mt-lg-3">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="student-card">
              <Card.Body>
                <Row>
                  <Col md={4} className="mb-4 mb-md-0 text-center">
                    <div className="student-avatar">
                      <img src={studentProfile.profile_img || 'https://via.placeholder.com/150'} alt="Student" className="rounded-circle" width="150" />
                    </div>
                    <div className="mt-3">
                      <h4>{studentProfile.name || 'Unavailable'}</h4>
                      <p className="mb-1">{studentProfile.course || 'Unavailable'}</p>
                      <p className="font-size-sm">{studentProfile.college_name || 'Unavailable'}</p>
                      {!isEditing && (
                        <Button variant="outline-primary " className="mt-2 stu-btn" onClick={handleEditClick}>
                          Edit Profile
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
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="name"
                                value={editedProfile.name || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.name || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">Course</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="course"
                                value={editedProfile.course || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.course || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">University</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="college_name"
                                value={editedProfile.college_name || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.college_name || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">Email</h6>
                            {isEditing ? (
                              <Form.Control
                                type="email"
                                name="email"
                                value={editedProfile.email || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.email || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">Phone</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="phone"
                                value={editedProfile.phone || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.phone || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col sm={6}>
                        <h5>Additional Details</h5>
                        <ListGroup variant="flush" className="additional-details">
                          <ListGroup.Item>
                            <h6 className="mb-0">Institution</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="institution"
                                value={editedProfile.institution || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.institution || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">College Location</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="college_location"
                                value={editedProfile.college_location || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.college_location || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">Native Place of Work</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="native_place_of_work"
                                value={editedProfile.native_place_of_work || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.native_place_of_work || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">GitHub</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="git"
                                value={editedProfile.git || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.git || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">LinkedIn</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="linkedin"
                                value={editedProfile.linkedin || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.linkedin || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">College ID Photo</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="college_id_photo"
                                value={editedProfile.college_id_photo || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <a href={studentProfile.college_id_photo} target="_blank" rel="noopener noreferrer">
                                View College ID
                              </a>
                            )}
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </Row>
                    {isEditing && (
                      <Row className="mt-3">
                        <Col>
                          <Button variant="secondary" className='stu-btn' onClick={handleCancelClick}>
                            Cancel
                          </Button>
                          <Button variant="primary" className="ms-2 stu-btn" onClick={handleFormSubmit}>
                            Save Changes
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
  <Col lg={8} md={10}>
    <Card className="appointment-card student-card">
      <Card.Body>
        <h5 className="mb-3">Scheduled Appointments</h5>
        <ListGroup>
          {}
          {scheduledAppointments.map((appointment, index) => (
            <ListGroup.Item key={index}>
              <h6>Meeting Title: {appointment.title}</h6>
              <p>Start Date: {appointment.startDate}</p>
              <p>Start Time: {appointment.startTime}</p>
              <p>End Date: {appointment.endDate}</p>
              <p>End Time: {appointment.endTime}</p>
              <p>Description: {appointment.description}</p>
              <p>Mentor name : {appointment.mentorname}</p>
              <p>Meeting Link: <a>{appointment.meetinglink}</a></p>
            </ListGroup.Item>
          ))}
          
          {scheduledAppointments.length === 0 && (
            <ListGroup.Item style={{backgroundColor:"transparent", color:"white"}}>
              <p>No appointments scheduled</p>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  </Col>
</Row>

      </Container>
    </>
  );
};

export default StudentProfile;
