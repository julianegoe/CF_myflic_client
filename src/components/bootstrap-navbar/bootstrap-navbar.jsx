import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './bootstrap-navbar.scss'

export function BootstrapNavbar() {
    /*     const { isloggedIn, setLogInState } = useState(true);
     */
    return (
        <>
            <Navbar className="bs-navbar" variant="dark" role="navigation">
                <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
                <Nav className="bs-navbar" defaultActiveKey="#profile" as="ul">
                    <Nav.Item className="bs-navbar" as="li">
                        <Nav.Link href="#profile">Profile</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </>
    )
}