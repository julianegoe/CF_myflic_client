import React, { useState } from "react";
import { Accordion, Button } from 'react-bootstrap';

import './director-view.scss'

export default function DirectorView({ movieData }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleClick = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <Accordion>
            <div>
                <div>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="p-0 mt-2" onClick={handleClick}>
                        {movieData.Director.Name} {isCollapsed ? <i className="bi bi-caret-up-fill"> </i> : <i className="bi bi-caret-down-fill"></i>}
                    </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey="0">
                    <div className="director-accordion mt-3">{movieData.Director.Bio}</div>
                </Accordion.Collapse>
            </div>
        </Accordion>)
}