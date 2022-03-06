import React, { useState } from "react";
import propTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Col } from "react-bootstrap";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(username);
  };

  return (
    <Container fluid style={{ paddingTop: "0.75rem" }}>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Title>Please register here</Card.Title>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      value={values.username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={values.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter birthday"
                      value={values.birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    type="submit"
                    onClick={handleRegistration}
                  >
                    Sign up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
