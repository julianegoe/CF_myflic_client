import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './bootstrap-navbar.scss'
import { Link } from "react-router-dom";


export function BootstrapNavbar({ userState, logOut }) {


    return (
        <>
            <Navbar className="bs-navbar" variant="dark" role="navigation">
                {userState ? (
                    <>
                        <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
                        <Nav className="bs-navbar" as="ul">
                            <Nav.Item className="bs-navbar" as="li">
                                <Nav.Link href="#profile">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="bs-navbar" as="li">
                                <Link to="/">
                                    <Nav.Link as="div" onClick={() => { logOut() }} href="#logout">Logout</Nav.Link>
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </>
                ) : null}


            </Navbar>
        </>
    )
}