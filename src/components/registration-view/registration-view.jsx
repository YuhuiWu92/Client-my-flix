import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthdayErr, setBirthdayErr] = useState("");
  // validate user inputs
  const validateRegister = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    }

    if (!email) {
      setEmailErr("Email Required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Email must habe @ ,Email is invalid ");
      isReq = false;
    }
    return isReq;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validateRegister();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios
        .post("https://my-film-flix.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "-self"); //the page will open on the same page.
        })
        .catch((e) => {
          console.log("error register the user");
        });
    }
  };
  return (
    <Row className="mt-5">
      <Col md={12}>
        <Form>
          <h3> Please register here</h3>
          <p></p>
          <Form.Group controlId="formUsername" className="reg-form-inputs">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter Username"
            />
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword" className="reg-form-inputs">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              minLength="8"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <Form.Group className="reg-form-inputs" controlId="Email">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
            {emailErr && <p>{emailErr}</p>}

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="updateBirthday" className="reg-form-inputs">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              placeholder="Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>

          <Button
            className="signUpButton"
            variant="primary"
            type="submit"
            onClick={handleRegister}
          >
            Submit and Sign up
          </Button>
          <p></p>
          <p>
            Already registered?
            <Link to={"/"}>Sign in</Link>here
          </p>
        </Form>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};
