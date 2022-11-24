import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.scss";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const { dispatch } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const url = process.env.REACT_APP_SERVER_URL + "/api/auth/login";
      axios.post(url, { email, password }).then((res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setErrorText("Incorrect username or password");
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter Your useraname ..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton">Login</button>
      </form>
      {error && <span className="error">{errorText}</span>}
      <Link className="link" to="/register">
        <button className="loginRegisterButton">Register</button>
      </Link>
    </div>
  );
}

export default Login;
