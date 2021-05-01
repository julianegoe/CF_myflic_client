import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export function RegistrationView() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");


    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://myflix-0001.herokuapp.com/users",
            {
                Name: name,
                Username: username,
                Email: email,
                Password: password,
                Birthday: birthday

            }).then((res) => {
                console.log(res.data);
                window.open('/', '_self');
            }).catch((e) => {
                console.error("error during registration: " + e)
            })
    };

    return (
        <Col xs={8} md={6} className="p-1">
            <Form>
                <Form.Group controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="birthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" placeholder="Enter your birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
                </Form.Group>
                <Button onClick={handleSubmit} variant="dark" type="submit">
                    Register
                    </Button>
                <Link to="/">
                    <Button as="div" variant="dark" type="submit" className="m-3">
                        Login
                    </Button>
                </Link>

            </Form>
        </Col>

    )
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func
}

/* PropTypes.shape(
    {
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired
    }
)
} */