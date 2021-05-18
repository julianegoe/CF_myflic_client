import React from 'react';
import './divider-component.scss';


export default function Divider({ title, isVisible }) {

    if (isVisible) {
        return (
            <div className="dividers mx-5 mt-5">
                <h5>{title}</h5>
                <hr className="solid"></hr>
            </div>
        )
    }
    return null
}




