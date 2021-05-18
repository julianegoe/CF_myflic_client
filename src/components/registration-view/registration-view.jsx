import React, { useState } from "react";
import PropTypes from "prop-types";

export function RegistrationView(props) {
    const [firstnameLastname, setFirstnameLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");

    handleSubmit = (e) => {
        e.preventDefault();
        props.onRegistered(username);
    };

    return (
        <div className="login-component">
            <form>
                <label>Full Name:</label><br />
                <input type="text" id="firstnameLastname" name="firstnameLastname" value={firstnameLastname} onChange={e => { setFirstnameLastname(e.target.value) }} /><br />

                <label>Username:</label><br />
                <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} /><br />

                <label>E-Mail:</label><br />
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} /><br />

                <label>Password:</label><br />
                <input type="password" id="pasword" name="password" value={password} onChange={e => setPassword(e.target.value)} /><br />

                <label>Birthday:</label><br />
                <input type="date" id="birthday" name="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} /><br />

                <button type="submit" onClick={handleSubmit}>Register</button>
            </form>
        </div>
    )
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func
}

