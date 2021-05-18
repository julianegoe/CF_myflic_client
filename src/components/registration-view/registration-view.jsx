import React, { useState } from "react";
import PropTypes from "prop-types";
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

export function RegistrationView(props) {
    const [firstnameLastname, setFirstnameLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");

    handleSubmit = (e) => {
        e.preventDefault();
        props.onRegistered(username);
    };

    return (
        <Row className="m-5 justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-center">
            <Col xs={8} md={6} className="p-1">
                <Form>
                    <Form.Group controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" />
                    </Form.Group>

                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" placeholder="Enter your birthday" />
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="dark" type="submit">
                        Register
                    </Button>
                </Form>
            </Col>
        </Row>

    )
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func
}

