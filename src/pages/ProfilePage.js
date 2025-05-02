import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://own3days-user-panel-default-rtdb.firebaseio.com/users/${userId}.json`
        );
        setUserData({
          name: response.data?.name || "",
          email: response.data?.email || "",
          phone: response.data?.phone || "",
          address: response.data?.address || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) fetchDetails();
  }, [userId]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://own3days-user-panel-default-rtdb.firebaseio.com/users/${userId}.json`,
        userData
      );
      alert("Profile updated successfully");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      alert("Failed to update User Details");
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 text-center fs-3">User Profile</Card.Title>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
              <p><strong>Address:</strong> {userData.address}</p>
              <div className="text-center mt-4">
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateUser}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
