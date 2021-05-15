import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import './bootstrap-navbar.scss'
import { Link } from "react-router-dom";



export function BootstrapNavbar(props) {
    const { userState, logOut } = props;
    const { visibilityFilter } = props;

    return (
        <>
            <Navbar className="bs-navbar" variant="dark" role="navigation">
                {userState ? (
                    <>
                        <Link to="/">
                            <Navbar.Brand as="div" >MyFlix</Navbar.Brand>
                        </Link>

                        <Nav className="justify-content-end" as="ul">
                            <Nav.Item className="bs-navbar" as="li">
                                <Link to="/profile" className="text-decoration-none">
                                    <OverlayTrigger
                                        key="bottom"
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Profile
                                            </Tooltip>
                                        }
                                    >
                                        <Nav.Link as="div"> <i className="bi bi-person-circle"></i></Nav.Link>
                                    </OverlayTrigger>
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

