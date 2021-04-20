import React, { useState } from "react";
import PropTypes from 'prop-types';
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }

    return (
        <div className="login-component">
            <form>
                <div className="login-username">
                    <label>Username:</label><br />
                    <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} /><br />
                </div>
                <div className="login-password">
                    <label>Password:</label><br />
                    <input type="password" id="pasword" name="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
                </div>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>)

}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func
}
