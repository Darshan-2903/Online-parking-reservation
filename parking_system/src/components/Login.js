import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./LoginValidation";
import axios from "axios";
import "../styles/signup.css";

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data === "Success") {
            setIsAuthenticated(true);
            navigate("/Home");
          } else {
            alert("No record exist");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
    data-aos="fade-up"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out">
      <div id="login-form-wrap">
        <h2>Login</h2>
        <form id="login-form" action="" onSubmit={handleSubmit}>
          <p>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              autoComplete="current-email"
              onChange={handleInput}
              className="input"
            />
            {errors.email && <span>{errors.email}</span>}
          </p>
          <p>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              autoComplete="current-password"
              onChange={handleInput}
              className="input"
            />
            {errors.password && <span>{errors.password}</span>}
          </p>
          <p>
            <input type="submit" id="login" value="Login" className="input" />
          </p>
        </form>
        <div id="create-account-wrap">
          <p>
            Don't have an account <Link to="/signup">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
