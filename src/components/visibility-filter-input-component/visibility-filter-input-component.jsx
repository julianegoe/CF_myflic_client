import React from 'react';
import { Form, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import { SetFilter } from '../../actions/actions';


function VisibilityFilterInput(props) {

    const handleSearch = (e) => {
        e.preventDefault;
        props.SetFilter(e.target.value)
    }

    return (
        <Form inline>
            <Form.Group className="m-1" controlId="Search">
                <Form.Label className="mr-3">Search: </Form.Label>
                <Form.Control className="form-control-sm" type="text" placeholder="Search for movies" defaultValue={props.visibilityFilter} onChange={e => handleSearch(e)} />

            </Form.Group>
        </Form>)
};

export default connect(null, { SetFilter })(VisibilityFilterInput)