import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap';
import Navimi from '../navinme';
import '../../css/MentorProfile.css';

const MentorProfileE = () => {
  const { _id } = useParams();
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  const localStorageUser = JSON.parse(localStorage.getItem('user'));
  const backend = process.env.REACT_APP_BACKEND;
  const role = localStorageUser.value.role;

  useEffect(() => {
    axios
      .post(`${backend}/get${role}`, { _id: _id })
      .then((res) => {
        setProfile(res.data);
        setEditedProfile(res.data);
      })
      .catch((error) => alert(error));
  }, [_id, backend, role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    axios
      .post(`${backend}/update${role.toLowerCase()}`, editedProfile)
      .then((res) => {
        setProfile(editedProfile);
        setEditMode(false);
        alert('Profile updated successfully');
      })
      .catch((error) => alert(error));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    const statusField = role === 'Mentor' ? 'availableToMentor' : 'availableToInvest';
    const updatedProfile = { ...editedProfile, [statusField]: value };
    setEditedProfile(updatedProfile);
  
    axios
      .post(`${backend}/update${role.toLowerCase()}`, updatedProfile)
      .then((res) => {
        setProfile(updatedProfile);
        alert('Status updated successfully');
      })
      .catch((error) => alert(error));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        const maxSize = 500;
        
        if (width > height && width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        } else if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw resized image to canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert canvas to base64
        const resizedImage = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality here (0.7 = 70% quality)
        
        const updatedProfile = { ...editedProfile, profileImage: resizedImage };
        setEditedProfile(updatedProfile);
        
        axios
          .post(`${backend}/update${role.toLowerCase()}`, updatedProfile)
          .then((res) => {
            setProfile(updatedProfile);
            alert('Profile image updated successfully');
          })
          .catch((error) => alert(error));
      };
      img.src = reader.result;
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navimi />
      <Container fluid className="main-body mt-4">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="mentor-card">
              <Card.Body>
                <Row>
                  <Col md={4} className="mb-4 mb-md-0 text-center">
                    <div className="mentor-avatar">
                      <img
                        src={profile.profileImage || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="rounded-circle img-fluid"
                      />
                      {editMode && (
                        <Form.Group className="mt-3">
                          <Form.Control
                            type="file"
                            id="profileImage"
                            label="Change Profile Image"
                            onChange={handleImageChange}
                          />
                        </Form.Group>
                      )}
                    </div>
                    <div className="mt-3">
                      <h4>{profile.name || 'Unavailable'}</h4>
                      <p className="mb-1">{profile.areaOfExpertise || 'Unavailable'}</p>
                      <p className="font-size-sm">{profile.nativePlaceOrWork || 'Unavailable'}</p>
                      {/* {!editMode && (
                        <Button
                          variant="outline-primary"
                          disabled={profile.availableToMentor !== 'true' && profile.availableToInvest !== 'true'}
                          className="mt-2"
                        >
                          {role === 'Mentor' ? 'Book an appointment' : 'Request Investment'}
                        </Button>
                      )} */}
                    </div>
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col sm={6}>
                        <h5>Personal Details</h5>
                        <ListGroup variant="flush" className="personal-details">
                          <ListGroup.Item>
                            <h6 className="mb-0">Full Name</h6>
                            <span>{profile.name || 'Unavailable'}</span>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">Experience (years)</h6>
                            {editMode ? (
                              <Form.Control
                                type="text"
                                name="experience"
                                value={editedProfile.experience || ''}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <span>{profile.experience || 'Unavailable'}</span>
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">
                              {role === 'Mentor' ? 'No. of People Mentored' : 'Investment Count'}
                            </h6>
                            <span>{profile.mentorshipCount || profile.investmentCount || 'Unavailable'}</span>
                          </ListGroup.Item>
                          {role === 'Investor' && (
                            <ListGroup.Item>
                              <h6 className="mb-0">Investment Amount</h6>
                              <span>{profile.investmentAmount || 'Unavailable'}</span>
                            </ListGroup.Item>
                          )}
                          <ListGroup.Item>
                            <h6 className="mb-0">Status</h6>
                            <Form.Select
                              name={role === 'Mentor' ? 'availableToMentor' : 'availableToInvest'}
                              value={editedProfile.availableToMentor || editedProfile.availableToInvest || ''}
                              onChange={handleStatusChange}
                              className="mt-2"
                            >
                              <option value="true">Available</option>
                              <option value="false">Not available</option>
                            </Form.Select>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col sm={6}>
                        <h5>Contact Details</h5>
                        <ListGroup variant="flush" className="contact-details">
                          <ListGroup.Item>
                            <h6 className="mb-0">Email</h6>
                            <span>{profile.email || 'Unavailable'}</span>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">Phone</h6>
                            <span>{profile.phone || 'Unavailable'}</span>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <h6 className="mb-0">LinkedIn</h6>
                            <span>{profile.linkedin || 'Unavailable'}</span>
                          </ListGroup.Item>
                        </ListGroup>
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