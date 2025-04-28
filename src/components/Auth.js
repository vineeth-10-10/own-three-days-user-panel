import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div className="container mt-5">
      <form>
        <h1>Login</h1>
        <div className="mb-3">
          <label htMLFor="userName" className="form-label">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputEmail" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="InputEmail"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htnlFor="InputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="InputPassword"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <a href="#" >ForgotPass</a>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Auth;
