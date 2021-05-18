import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function ModalComponent({ handleAccountDelete }) {
    const [smShow, setSmShow] = useState(false);

    return (
        <>
            <Button onClick={() => setSmShow(true)} as="div" variant="danger" type="submit" className="mt-3">
                <i className="bi bi-trash-fill mr-2"></i>
                            Delete Account
                    </Button>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Do you really want to delete your profile?
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button onClick={() => setSmShow(false)} variant="primary" size="sm" className="m-2">No, don't delete</Button>
                    <Link to="/register" className="text-decoration-none">
                        <Button onClick={() => handleAccountDelete()} variant="danger" size="sm" className="m-2">Yes, delete</Button>

                    </Link>
                </Modal.Body>
            </Modal>
        </>
    )
}