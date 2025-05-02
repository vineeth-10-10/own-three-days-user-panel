import { Card, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [order, setOrder] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://ownthreedays-default-rtdb.firebaseio.com/orders/${userId}.json`
        );

        if (response.data) {
          const allOrders = [];

          for (const orderId in response.data) {
            const orderInfo = response.data[orderId];

            const order = {
              orderId: orderId,
              ...orderInfo,
            };
            allOrders.push(order);
          }
          setOrder(allOrders);
        } else {
          setOrder([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <Container className="py-4">
      <h3 className="mb-4">My orders</h3>
      {order.length === 0 ? (
        <p>No orders Found</p>
      ) : (
        order.map((order) => (
          <Card key={order.orderId} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Order #{order.orderId}</Card.Title>
              <Card.Subtitle>Status:{order.status}</Card.Subtitle>
              <Card.Text>
                <strong>Address:</strong>
                {order.address}
              </Card.Text>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} * {item.quantity} = ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <hr />
              <strong>Total:{order.totalAmount}</strong>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}
