import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleForgotPass = async (e) => {
    e.preventDefault();
    try {
       await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAq51hCyTXYHN7DoieUyaRQ-dELdUUR4Xo`,
        {
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }
      );
      setSuccessMsg("Password reset email sent successfully!");
      setErrorMsg("");
      setTimeout(() => navigate("/auth"), 2000); // navigate after a short delay
    } catch (error) {
      setErrorMsg(
        "Something went wrong. Please check the email and try again."
      );
      setSuccessMsg("");
    }
  };
  return (
    <Container  style={{ maxWidth: "500px", marginTop: "50px" }}>
      <Form onSubmit={handleForgotPass}>
        <Form.Group className="mb-3 ">
          <Form.Label>Please Enter Registered Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter @email"
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Send
        </Button>
      </Form>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </Container>
  );
};

export default ForgotPassword;
