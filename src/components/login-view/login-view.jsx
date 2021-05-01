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
    const form = useRef('form');

    const validate = () => {
        console.log("Validation");
        return form.current.reportValidity()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://myflix-0001.herokuapp.com/login?Username=${username}&Password=${password}`)
            .then((res => {
                console.log(res.data);
                onLoggedIn(res.data);
            })).catch((e) => {
                console.log(e)
            })
    }

    return (
        <>
            <Col xs={8} md={"auto"} className="mr-5">
                <h1>MyFlix</h1>
                <p className="tag-line">Discover some of the best movies in cinema history.</p>
            </Col>

            <Col xs={8} md={6} className="p-1">
                <Form ref={form} >
                    <Form.Group controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onBlur={() => { validate() }} type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={() => { validate() }} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength="8" />
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="dark" type="submit">
                        Login
                    </Button>
                    <Link to="/register">
                        <Button as="div" variant="dark" type="submit" className="m-3">
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
