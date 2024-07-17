import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, ListGroup, Table } from 'react-bootstrap';
import Nav1 from '../nav1';
import '../../css/Studentprofile.css'; // Import CSS file

const StudentProfile = () => {
  const { _id } = useParams();
  const [studentProfile, setStudentProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [scheduledAppointments, setscheduledAppointments] = useState([]);
  const backend = process.env.REACT_APP_BACKEND;
  const lstorage = localStorage.getItem('user');
    const lstorageparse=JSON.parse(lstorage);
 

  const localStorageId = lstorageparse.value.uid;

  useEffect(() => {
    axios
      .post(`${backend}/getstudent`, { _id: _id })
      .then((res) => {
        setStudentProfile(res.data);
        setEditedProfile(res.data);
      })
      .catch((error) => alert(error));

    axios
      .post(`${backend}/getmeetingstu`, { _id: _id })
      .then((res) => {
        console.log(res.data);
        setscheduledAppointments(res.data);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxWidth = 500; // Max width for the image
        const maxHeight = 500; // Max height for the image
        let width = img.width;
        let height = img.height;

        // Calculate the new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality as needed
        setEditedProfile({ ...editedProfile, profileImage: resizedDataUrl });
      };
      img.onerror = (error) => {
        console.error('Error loading image:', error);
      };
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
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
                      <img src={studentProfile.profileImage} alt="Student" className="rounded-circle" width="150" />
                    </div>
                    <div className="mt-3">
                      <h4>{studentProfile.name || 'Unavailable'}</h4>
                      <p className="mb-1">{studentProfile.course || 'Unavailable'}</p>
                      <p className="font-size-sm">{studentProfile.collegeName || 'Unavailable'}</p>
                      {!isEditing && localStorageId === _id && (
                        <Button variant="outline-primary" className="mt-2 stu-btn" onClick={handleEditClick}>
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
                            <h6 className="mb-0">Institution</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="college_name"
                                value={editedProfile.collegeName || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.collegeName || 'Unavailable'}</span>
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
                                name="collegeLocation"
                                value={editedProfile.collegeLocation || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.collegeLocation || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">Native Place of Work</h6>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                name="nativePlaceOrWork"
                                value={editedProfile.nativePlaceOrWork || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{studentProfile.nativePlaceOrWork || 'Unavailable'}</span>
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
                                type="file"
                                name="profileImage"
                                onChange={handleImageChange}
                              />
                            ) : (
                              <a href={studentProfile.profileImage} target="_blank" rel="noopener noreferrer">
                                <img src={studentProfile.profileImage} alt="College ID" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                              </a>
                            )}
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </Row>
                    {isEditing && (
                      <Row className="mt-3">
                        <Col>
                          <Button variant="secondary" className="stu-btn" onClick={handleCancelClick}>
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
          <Col lg={10} md={12}>
            <h5 className="mb-3 text-light">Scheduled Appointments</h5>
            <div className="appointment-table-container">
              <Table striped bordered hover className="appointment-table">
                <thead style={{ backgroundColor: "#102836" }}>
                  <tr>
                    <th>Meeting Title</th>
                    <th>Start Date</th>
                    <th>Start Time</th>
                    <th>End Date</th>
                    <th>End Time</th>
                    <th>Description</th>
                    <th>Mentor Name</th>
                    <th>Meeting Status</th>
                    <th>Meeting Link</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledAppointments.length > 0 ? (
                    scheduledAppointments.map((appointment, index) => (
                      <tr key={index}>
                        <td>{appointment.title}</td>
                        <td>{appointment.startDate}</td>
                        <td>{appointment.startTime}</td>
                        <td>{appointment.endDate}</td>
                        <td>{appointment.endTime}</td>
                        <td>{appointment.description}</td>
                        <td>{appointment.mentorname}</td>
                        <td
                          style={{
                            backgroundColor: appointment.meetingStatus === 'approved' ? 'green' : appointment.meetingStatus === 'rejected' ? 'red' : appointment.meetingStatus === 'waiting' ? 'blue' : 'black',
                            padding: '8px'
                          }}
                        >
                          {appointment.meetingStatus}
                        </td>
                        <td>
                          <a href={appointment.meetinglink} target="_blank" rel="noopener noreferrer">
                            {appointment.meetinglink}
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center' }}>
                        No appointments scheduled
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudentProfile;
