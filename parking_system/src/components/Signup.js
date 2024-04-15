import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupValidation } from "./LoginValidation";
import axios from "axios";
import  '../styles/signup.css'


const Signup = () => {
  const [values, setValues] = useState({
    username: "",
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
    setErrors(signupValidation(values));
    if (
      errors.username === "" &&
      errors.email === "" &&
      errors.password === ""
    ) {
      axios
        .post("/signup", values)
        .then((res) => {
          navigate("/");
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
    data-aos="fade-down"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out">
      <div id="login-form-wrap">
        <h2>Register</h2>
        <form id="login-form" action="" onSubmit={handleSubmit}>
          <p>
            <input
              type="text"
              placeholder="Enter Name"
              name="username"
              autoComplete="current-username"
              onChange={handleInput}
              className='input'
            />
            {errors.username && <span>{errors.username}</span>}
          </p>
          <p>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              autoComplete="current-email"
              onChange={handleInput}
              className='input'
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
              className='input'
            />
             {errors.password && <span>{errors.password}</span>}
          </p>
          <p>
            <input type="submit" id="login" value="Register" className='input'/>
          </p>
        </form>
        <div id="create-account-wrap">
          <p>
            Already have an account <Link to= '/'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
