import React, { useState, useEffect } from "react";

import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


import './profile-view.scss';

export default function ProfileView() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const token = localStorage.getItem('token');
    const localUsername = localStorage.getItem('user')

    console.log(`https://myflix-0001.herokuapp.com/users/${localUsername}`)


    useEffect(() => {
        axios.get(`https://myflix-0001.herokuapp.com/users/${localUsername}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                console.log(res.data)
                setName(res.data.Name);
                setUsername(res.data.Username);
                setEmail(res.data.Email);
                setPassword(res.data.Password);
                setBirthday(res.data.Birthday);
            }).catch((e) => {
                console.log(e)
            })
    }, [])

    return (
        <Col xs={8} md={6} className="p-1">
            <Form>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl type="text" placeholder="Name" value={name} readOnly></FormControl>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <FormControl type="text" placeholder="Username" value={username} readOnly></FormControl>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="Email" value={email} readOnly></FormControl>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" placeholder="password" value={password} readOnly></FormControl>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl type="text" placeholder="tt.mm.jjjj" value={birthday} readOnly></FormControl>
                </FormGroup>
                <Link to="/profile/edit">
                    <Button as="div" variant="dark" type="submit" className="m-3">
                        Edit
                    </Button>
                </Link>

            </Form>
        </Col>
    )
}
