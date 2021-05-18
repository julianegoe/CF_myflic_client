import React, { useState, useEffect } from "react";
import { Accordion, Button } from 'react-bootstrap';

import './genre-view.scss'

export default function GenreView({ movieData }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleClick = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <Accordion>
            <div>
                <div>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="p-0 mt-2" onClick={handleClick}>
                        {movieData.Genre.Name} {isCollapsed ? <i className="bi bi-caret-up-fill"> </i> : <i className="bi bi-caret-down-fill"></i>}
                    </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="0">
                    <div className="genre-accordion mt-3">{movieData.Genre.Description}</div>
                </Accordion.Collapse>
            </div>
        </Accordion>)
}