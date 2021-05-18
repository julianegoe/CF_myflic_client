import React, { useState } from "react";
import PropTypes from 'prop-types';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView({ onLoggedIn }) {
    const [username, setUsername] = useState("dummy");
    const [password, setPassword] = useState("dummy");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLoggedIn(username);
    }

    return (
        <Row className="m-5 justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-center">
            <Col xs={8} md={6} className="p-1">
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
            </Col>
        </Row>)

}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func
}
