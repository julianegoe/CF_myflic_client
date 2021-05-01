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
                        <Link to="/">
                            <Navbar.Brand as="div" >MyFlix</Navbar.Brand>
                        </Link>

                        <Nav className="bs-navbar" as="ul">
                            <Nav.Item className="bs-navbar" as="li">
                                <Link to="/profile" className="text-decoration-none">
                                    <Nav.Link as="div">Profile</Nav.Link>
                                </Link>

                            </Nav.Item>
                            <Nav.Item className="bs-navbar" as="li">
                                <Link to="/" className="text-decoration-none">
                                    <Nav.Link as="div" onClick={() => { logOut() }}>Logout</Nav.Link>
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </>
                ) : null}


            </Navbar>
        </>
    )
}