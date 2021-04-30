import React, { useState } from "react";
import PropTypes from 'prop-types';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

export function LoginView({ onLoggedIn }) {
    const [username, setUsername] = useState("dummy");
    const [password, setPassword] = useState("dummy");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLoggedIn(username);
    }

    return (
        <Container className="p-5 m-5">
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={handleSubmit} variant="dark" type="submit">
                    Login
  </Button>
            </Form>
        </Container>)

}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func
}
