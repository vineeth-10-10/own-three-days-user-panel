import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteCart, clearCart } from "../store/cartSlice";
import { Container, Card, Button, Row, Col, Modal,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handlePlaceOrder = async()=>{
    if(!address){
        alert('Please provide address');
        return;
    }

    const orderDetails = {
        items:cartItems,
        totalAmount:totalAmount,
        address:address,
        status:"pending",
    }
    const orderId = Date.now();
    try{
        await axios.put(`https://ownthreedays-default-rtdb.firebaseio.com/orders/${userId}/${orderId}.json`,orderDetails);
        dispatch(clearCart());
        setShowModal(false);
        alert("Order placed Successfully!")
        navigate('/home');
    }
    catch(error){
        console.log(error);
        alert("!!! failed to place order");
    }
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Row className="g-4">
            {cartItems.map((item) => (
              <Col md={4} key={item.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={item.imageUrl}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text className="text-muted">
                        ₹{item.price} × {item.quantity} = ₹
                        {item.price * item.quantity}
                      </Card.Text>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <Button
                        variant="danger"
                        onClick={() => dispatch(deleteCart(item.id))}
                      >
                        −
                      </Button>
                      <span className="px-3 fw-bold">{item.quantity}</span>
                      <Button
                        variant="success"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        +
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-between align-items-center mt-5">
            <h4>Total Amount: ₹{totalAmount}</h4>
            <Button
              variant="outline-danger"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
            <div>
              <Button
                variant="outline-primary"
                onClick={() => setShowModal(true)}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.map((item) => (
            <div key={item.id} className="mb-2">
              <strong>{item.name}</strong> - {item.quantity} * ₹{item.price} = ₹{" "}
              {item.quantity * item.price}
            </div>
          ))}
          <hr />
          <h5>₹{totalAmount}</h5>
          <Form.Group controlId="address">
            <Form.Label>Enter Delivery Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter address for Delivery"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;
