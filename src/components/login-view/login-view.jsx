import axios from 'axios';
import { ValidateUser, SetUser } from '../../actions/actions';
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }

}

function LoginView({ onLoggedIn, user, ValidateUser, SetUser }) {
    const [usernameErr, setUsernameErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [httpErr, setHttpErr] = useState({});

    useEffect(() => {
        SetUser({ Username: "", Password: "" })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = formValidation()
        if (isValid) {
            axios.post(`https://myflix-0001.herokuapp.com/login?Username=${user.Username}&Password=${user.Password}`)
                .then((res => {
                    onLoggedIn(res.data);
                })).catch((e) => {
                    console.log(e.response.status)
                    formValidation(e.response.status)
                })
        }
    };

    const formValidation = (statusCode) => {
        const usernameErr = {};
        const passwordErr = {};
        const httpErr = {};

        let isValid = true;


        if (statusCode === 400) {
            httpErr.wrongCredentials = "Username or password are incorrect. Please try again.";
            isValid = false
        }

        if (user.Username.trim().length < 3) {
            usernameErr.usernameTooShort = "Username must be at least 3 characters long";
            isValid = false;
        };


        if (user.Password.trim().length < 8) {
            passwordErr.passwordTooShort = "Password must be at least 8 characters long";
            isValid = false
        };

        setUsernameErr(usernameErr);
        setPasswordErr(passwordErr);
        setHttpErr(httpErr);

        return isValid



    }

    return (
        <>
            <Col xs={8} md={"auto"} className="mr-5 mt-5">
                <h1>MyFlix</h1>
                <p className="tag-line">Discover some of the best movies in cinema history.</p>
            </Col>

            <Col xs={8} md={6} className="p-1 mt-5">
                <Form>
                    <Form.Group controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={e => ValidateUser(e.target.value, "Username")} required />
                    </Form.Group>

                    {Object.keys(usernameErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{usernameErr[key]}</div>
                    })}

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => ValidateUser(e.target.value, "Password")} required minLength="8" />

                    </Form.Group>

                    {Object.keys(passwordErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{passwordErr[key]}</div>
                    })}

                    {Object.keys(httpErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{httpErr[key]}</div>
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
    onLoggedIn: PropTypes.func,
    ValidateUser: PropTypes.func,
    SetUser: PropTypes.func,
    users: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    })
};

export default connect(mapStateToProps, { ValidateUser, SetUser })(LoginView)
