import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button'

export function BootstrapNavbar() {
    /*     const { isloggedIn, setLogInState } = useState(true);
     */
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Profile</Nav.Link>
                    <Nav.Link href="#pricing">Logout</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}