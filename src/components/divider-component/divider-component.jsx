import React from 'react';
import './divider-component.scss';


export function Divider(props) {


    return (
        <div className="dividers mx-5 mt-5">
            <h5>{props.title}</h5>
            <hr className="solid"></hr>
        </div>
    )
}




