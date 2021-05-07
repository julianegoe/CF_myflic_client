import axios from 'axios';
import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormCheck } from 'react-bootstrap';
import { Link } from "react-router-dom";


export function LoginView({ onLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameErr, setUsernameErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});


    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = formValidation()
        if (isValid) {
            axios.post(`https://myflix-0001.herokuapp.com/login?Username=${username}&Password=${password}`)
                .then((res => {
                    onLoggedIn(res.data);
                })).catch((e) => {
                    console.log(e)
                })
        }
    };

    const formValidation = () => {
        const usernameErr = {};
        const passwordErr = {};
        let isValid = true;

        if (username.trim().length < 3) {
            usernameErr.usernameTooShort = "Username must be at least 3 characters long";
            isValid = false;
        };


        if (password.trim().length < 8) {
            passwordErr.passwordTooShort = "Password must be at least 8 characters long";
            isValid = false
        };

        setUsernameErr(usernameErr);
        setPasswordErr(passwordErr);

        return isValid



    }

    return (
        <>
            <Col xs={8} md={"auto"} className="mr-5">
                <h1>MyFlix</h1>
                <p className="tag-line">Discover some of the best movies in cinema history.</p>
            </Col>

            <Col xs={8} md={6} className="p-1">
                <Form>
                    <Form.Group controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required />
                    </Form.Group>

                    {Object.keys(usernameErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{usernameErr[key]}</div>
                    })}

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength="8" />
                    </Form.Group>

                    {Object.keys(passwordErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{passwordErr[key]}</div>
                    })}

                    <Button onClick={handleSubmit} variant="primary" type="submit">
                        Login
                    </Button>
                    <Link to="/register">
                        <Button as="div" variant="secondary" type="submit" className="m-3">
                            Register
                    </Button>
                    </Link>
                </Form>
            </Col>
        </>)

}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func
}
