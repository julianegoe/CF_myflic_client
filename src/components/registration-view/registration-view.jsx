import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export function RegistrationView() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");


    const [nameErr, setNameErr] = useState({});
    const [usernameErr, setUsernameErr] = useState({});
    const [emailErr, setEmailErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [birthdayErr, setBirthdayErr] = useState({});


    handleSubmit = (e) => {
        e.preventDefault();
        let isValid = formValidation();
        if (isValid) {
            axios.post("https://myflix-0001.herokuapp.com/users",
                {
                    Name: name,
                    Username: username,
                    Email: email,
                    Password: password,
                    Birthday: birthday

                }).then((res) => {
                    alert("Successfully registered.")
                    window.open('/', '_self');
                }).catch((e) => {
                    console.error("error during registration: " + e.message)
                })
        }
    };

    const formValidation = () => {
        const nameErr = {};
        const usernameErr = {};
        const emailErr = {};
        const passwordErr = {};
        const birthdayErr = {};
        let isValid = true;

        if (name.trim().length === 0) {
            nameErr.nameIsEmpty = "Please enter a name.";
            isValid = false;
        }

        if (username.trim().length < 3) {
            usernameErr.usernameTooShort = "Username must be at least 3 characters long";
            isValid = false;
        };

        if (!email.includes("@")) {
            emailErr.noEmail = "This is not a valid e-mail.";
            isValid = false
        };

        if (password.trim().length < 8) {
            passwordErr.passwordTooShort = "Password must be at least 8 characters long";
            isValid = false
        };

        if (password !== passwordRepeat) {
            passwordErr.passwordNoMatch = "Passwords don't match.";
            isValid = false
        };

        if (birthday.trim().length === 0) {
            birthdayErr.birthdayIsEmpty = "Please enter a birthday.";
            isValid = false
        };

        setNameErr(nameErr);
        setUsernameErr(usernameErr);
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);
        setBirthdayErr(birthdayErr)

        return isValid



    }

    return (
        <>
            <Col xs={8} md={"auto"} className="mr-5">
                <h1>MyFlix</h1>
                <p className="tag-line">Register to create a new user account.</p>
            </Col>
            <Col xs={8} md={6} className="p-1">
                <Form>
                    <Form.Group controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>

                    {Object.keys(nameErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{nameErr[key]}</div>
                    })}

                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    {Object.keys(usernameErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{usernameErr[key]}</div>
                    })}

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    {Object.keys(emailErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{emailErr[key]}</div>
                    })}

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="password-repeat">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat Password" value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
                    </Form.Group>

                    {Object.keys(passwordErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{passwordErr[key]}</div>
                    })}

                    <Form.Group controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" placeholder="yyyy.mm.dd" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>

                    {Object.keys(birthdayErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{birthdayErr[key]}</div>
                    })}

                    <Button onClick={handleSubmit} variant="primary" type="submit">
                        Register
                    </Button>
                    <Link to="/">
                        <Button as="div" variant="secondary" type="submit" className="m-3">
                            Login
                    </Button>
                    </Link>

                </Form>
            </Col>
        </>

    )
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func
}

