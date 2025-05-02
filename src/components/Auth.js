import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Card, Button, Container } from "react-bootstrap";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loginStatus, setLoginStatus] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.auth.isLoggedIn);

  const API_KEY = "AIzaSyAq51hCyTXYHN7DoieUyaRQ-dELdUUR4Xo";

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!loginStatus && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const url = loginStatus
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    const payload = loginStatus
      ? { email, password, returnSecureToken: true }
      : { name: userName, email, password, returnSecureToken: true };

    try {
      const response = await axios.post(url, payload);
      const data = response.data;
      const userId = response.data.localId;
      localStorage.setItem("userId", userId);
      console.log(data);
      dispatch(login({
        idToken:response.data.idToken,
        userName:response.data.userName,
        email:response.data.email,
      }));
      
      if (!loginStatus) {
        await axios.put(
          `https://own3days-user-panel-default-rtdb.firebaseio.com/users/${userId}.json`,
          {
            name: userName,
            email: email,
          }
        );
      }
      console.log(data);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const changeLogin = () => setLoginStatus(!loginStatus);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">
          {loginStatus ? "Login" : "Sign Up"}
        </h2>
        <Form onSubmit={loginHandler}>
          {!loginStatus && (
            <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {!loginStatus && (
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          )}

          {loginStatus && (
            <div className="mb-3 text-start">
              <Button
                variant="link"
                type="button"
                className="p-0"
                onClick={() => navigate("/forgotPassword")}
              >
                Forgot Password?
              </Button>
            </div>
          )}

          <Button variant="primary" type="submit" className="w-100">
            {loginStatus ? "Login" : "Sign Up"}
          </Button>

          <div className="mt-3 text-center">
            <span>
              {loginStatus
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
            </span>
            <Button variant="link" type="button" onClick={changeLogin}>
              {loginStatus ? "Sign Up" : "Login"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
