import axios from 'axios';
import React, { useState } from "react";
import PropTypes from 'prop-types';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView({ onLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://myflix-0001.herokuapp.com/login?Username=${username}&Password=${password}`)
            .then((res => {
                console.info("Login successfull");
                onLoggedIn(res.data);
            })).catch((e) => {
                console.log(e + " No such user")
            })
    }

    return (
        <Row className="m-5 justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-center">
            <Col xs={8} md={6} className="p-1">
                <Form>
                    <Form.Group controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
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
