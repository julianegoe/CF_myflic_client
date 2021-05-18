import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Divider from '../divider-component/divider-component';
import Snackbar from '../snackbar-component/snackbar-component'
import MovieCard from '../movie-card/movie-card';
import ModalComponent from '../modal-component/modal-component';

import './profile-view.scss'



export default function ProfileView({ movies, logOut }) {
    const [isSuccessful, setisSuccessful] = useState(false); // used for Snackback that appears when update is successful

    const [favorites, setFavorites] = useState([{ Title: "none" }]); // array of movie objects that have been added to FavoriteMovies Array
    const [favIds, setFavIds] = useState([]); // an Array of movie IDs that have been added to FavoriteMovies

    /* Values from input fields and/or fetched use data */
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [birthday, setBirthday] = useState("");

    const localUsername = localStorage.getItem('user'); // real username to make axios requests
    const token = localStorage.getItem('token'); // jwt token to make axios requests

    /* Objects that include error messages as a result from formValidation() */
    const [nameErr, setNameErr] = useState({});
    const [usernameErr, setUsernameErr] = useState({});
    const [emailErr, setEmailErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [birthdayErr, setBirthdayErr] = useState({});

    /* converts Array of IDs into Object on movies */
    const getFavs = (favs) => {
        let favoriteMovieList = [];
        movies.forEach((movie) => {
            favs.includes(movie._id) ? favoriteMovieList.push(movie) : null
        });
        setFavorites(favoriteMovieList)
    };

    /* When component renders for the first time, this fetches user data */
    useEffect(() => {
        axios.get(`https://myflix-0001.herokuapp.com/users/${localUsername}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setName(res.data.Name);
                setUsername(res.data.Username);
                setEmail(res.data.Email);
                setPassword(res.data.Password);
                const date = res.data.Birthday.substring(0, 10)
                setBirthday(date);
                setFavIds(res.data.FavoriteMovies)
            }).catch((e) => {
                console.log(e)
            })
    }, [])

    /* When Array of IDs change and are not empty, convert to a array of movie objects  */
    useEffect(() => {
        favIds ? getFavs(favIds) : setFavorites({})
    }, [favIds])


    /* Event handler for updating user data*/
    const updateUserData = (e) => {
        e.preventDefault();
        let isValid = formValidation();
        if (isValid) {
            axios.put(`https://myflix-0001.herokuapp.com/users/${username}`, {
                Name: name,
                Username: username,
                Email: email,
                Password: password,
                Birthday: birthday

            }, { headers: { "Authorization": `Bearer ${token}` } },
            ).then((res) => {
                res.status == 200 ? setisSuccessful(true) : setisSuccessful(false)
            }).catch((e) => {
                console.error("error during editing: " + e)
            })
        }

    }

    /* Deletes Favrorite from List of favorites*/
    const deleteFav = (favId) => {
        axios.delete(`https://myflix-0001.herokuapp.com/users/${username}/movies/${favId}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setFavIds(res.data.FavoriteMovies)

            }).catch((e) => { console.log(e) })
    }

    /* Event handle for account deletion */
    const handleAccountDelete = () => {
        axios.delete(`https://myflix-0001.herokuapp.com/users/${username}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                logOut()
            })
    };

    /* Function that validates certain inputs*/
    const formValidation = () => {
        const nameErr = {};
        const usernameErr = {};
        const emailErr = {};
        const passwordErr = {};
        const birthdayErr = {};
        let isValid = true;

        if (name.trim().length === 0) {
            nameErr.nameIsEmpty = "Please enter a name.";
            isValid = false;
        }

        if (username.trim().length < 3) {
            usernameErr.usernameTooShort = "Username must be at least 3 characters long";
            isValid = false;
        };

        if (!email.includes("@")) {
            emailErr.noEmail = "This is not a valid e-mail.";
            isValid = false
        };

        if (password.trim().length < 8) {
            passwordErr.passwordTooShort = "Password must be at least 8 characters long";
            isValid = false
        };

        if (password !== passwordRepeat) {
            passwordErr.passwordNoMatch = "Passwords don't match.";
            isValid = false
        };

        if (birthday.trim().length === 0) {
            birthdayErr.birthdayIsEmpty = "Please enter a birthday.";
            isValid = false
        };

        setNameErr(nameErr);
        setUsernameErr(usernameErr);
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);
        setBirthdayErr(birthdayErr)

        return isValid



    }

    return (
        <>
            <Snackbar close={setisSuccessful} isVisible={isSuccessful} />

            {favorites.length > 0 &&
                <Col xs={12} sm={8} md={6} lg={6} xl={6} className="p-3 m-2">
                    <Divider title="My Favorites" isVisible={true} />
                    <Row>
                        {favorites.map((fav) => {
                            return (

                                <Col xs={6} sm={4} md={4} lg={3} xl={3} className="p-3" key={fav._id}>
                                    <MovieCard movieData={fav} />
                                    <Button onClick={() => deleteFav(fav._id)} type="submit " className="mt-3" size="sm" variant="outline-danger">Delete</Button>
                                </Col>

                            )
                        })}
                    </Row>
                </Col>}

            <Col xs={12} sm={8} md={5} lg={4} className="p-3 m-2">
                <Divider title="Profile Settings" isVisible={true} />
                <p className="tag-line">Update your user information.</p>

                <Form>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} />

                    </Form.Group>

                    {Object.keys(nameErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{nameErr[key]}</div>
                    })}

                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    {Object.keys(usernameErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{usernameErr[key]}</div>
                    })}

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    {Object.keys(emailErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{emailErr[key]}</div>
                    })}

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="password-repeat">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat Password" value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
                    </Form.Group>

                    {Object.keys(passwordErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{passwordErr[key]}</div>
                    })}

                    <Form.Group controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" placeholder="yyyy-mm-dd" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>

                    {Object.keys(birthdayErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{birthdayErr[key]}</div>
                    })}

                    <Link to="/profile">
                        <Button onClick={updateUserData} as="div" variant="dark" type="submit" className="mt-3">
                            Save Changes
                    </Button>
                    </Link>
                    <ModalComponent handleAccountDelete={() => handleAccountDelete()}></ModalComponent>

                </Form>
            </Col>
        </>

    )

}

ProfileView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string
        }).isRequired,
        Year: PropTypes.number.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        Actors: PropTypes.array.isRequired,
        _id: PropTypes.string.isRequired,
        ImageUrl: PropTypes.string.isRequired,
        Featured: PropTypes.bool.isRequired
    })).isRequired,
    logOut: PropTypes.func.isRequired
}