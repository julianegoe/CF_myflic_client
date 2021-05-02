import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

import './snackbar-component.scss'

export default function Snackbar({ isVisible, close }) {
    return (
        <Toast onClose={() => close(false)} show={isVisible} delay={1500} animation={true} autohide>
            <Toast.Header>
                <strong className="mr-auto">Changes saved!</strong>
            </Toast.Header>
        </Toast>
    )
}