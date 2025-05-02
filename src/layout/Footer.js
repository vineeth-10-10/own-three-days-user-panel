import { Container, Row, Col, Navbar } from 'react-bootstrap';

export default function Footer() {
  return (
    <Navbar bg="dark" variant="dark" fixed='bottom'  className="mt-5 py-3">
      <Container>
        <Row className="w-100 text-center">
          <Col>
            <small className="text-white">© 2025 Foodie App. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
