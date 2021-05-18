import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { RegisterUser, SetUser, ValidateUser } from '../../actions/actions';
import PropTypes from "prop-types";
import axios from 'axios'
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

function RegistrationView({ user, SetUser, ValidateUser }) {
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [nameErr, setNameErr] = useState({});
    const [usernameErr, setUsernameErr] = useState({});
    const [emailErr, setEmailErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [birthdayErr, setBirthdayErr] = useState({});

    useEffect(() => {
        SetUser({ Username: "", Name: "", Email: "", Password: "", Birthday: "", FavoriteMovies: [] })
    }, [])

    handleSubmit = (e) => {
        e.preventDefault();
        let isValid = formValidation();
        if (isValid) {
            axios.post("https://myflix-0001.herokuapp.com/users",
                {
                    Name: user.Name,
                    Username: user.Username,
                    Email: user.Email,
                    Password: user.Password,
                    Birthday: user.Birthday

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

        if (user.Name.trim().length === 0) {
            nameErr.nameIsEmpty = "Please enter a name.";
            isValid = false;
        }

        if (user.Username.trim().length < 3) {
            usernameErr.usernameTooShort = "Username must be at least 3 characters long";
            isValid = false;
        };

        if (!user.Email.includes("@")) {
            emailErr.noEmail = "This is not a valid e-mail.";
            isValid = false
        };

        if (user.Password.trim().length < 8) {
            passwordErr.passwordTooShort = "Password must be at least 8 characters long";
            isValid = false
        };

        if (user.Password !== passwordRepeat) {
            passwordErr.passwordNoMatch = "Passwords don't match.";
            isValid = false
        };

        if (user.Birthday.trim().length === 0) {
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
            <Col xs={8} md={"auto"} className="mr-5 mt-5">
                <h1>MyFlix</h1>
                <p className="tag-line">Register to create a new user account.</p>
            </Col>
            <Col xs={8} md={6} className="p-1 mt-5">
                <Form>
                    <Form.Group controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" onChange={e => ValidateUser(e.target.value, "Name")} />
                    </Form.Group>

                    {Object.keys(nameErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{nameErr[key]}</div>
                    })}

                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={e => ValidateUser(e.target.value, "Username")} />
                    </Form.Group>

                    {Object.keys(usernameErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{usernameErr[key]}</div>
                    })}

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => ValidateUser(e.target.value, "Email")} />
                    </Form.Group>

                    {Object.keys(emailErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{emailErr[key]}</div>
                    })}

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => ValidateUser(e.target.value, "Password")} />
                    </Form.Group>

                    <Form.Group controlId="password-repeat">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat Password" defaultValue={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
                    </Form.Group>

                    {Object.keys(passwordErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{passwordErr[key]}</div>
                    })}

                    <Form.Group controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" onChange={e => ValidateUser(e.target.value, "Birthday")} />
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
    ValidateUser: PropTypes.func,
    SetUser: PropTypes.func,
    users: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    })
}

export default connect(mapStateToProps, { RegisterUser, SetUser, ValidateUser })(RegistrationView)
