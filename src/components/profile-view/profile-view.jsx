import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ValidateUser, SetUser, ToggleFavorites } from '../../actions/actions';
import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
        movies: state.movies
    }
}

function ProfileView({ movies, logOut, ValidateUser, SetUser, user, ToggleFavorites }) {
    const [isSuccessful, setisSuccessful] = useState(false); // used for Snackback that appears when update is successful

    const [favorites, setFavorites] = useState([]); // array of movie objects that have been added to FavoriteMovies Array

    const [passwordRepeat, setPasswordRepeat] = useState("");

    const localUsername = localStorage.getItem('user'); // real username to make axios requests
    const token = localStorage.getItem('token'); // jwt token to make axios requests

    /* Objects that include error messages as a result from formValidation() */
    const [nameErr, setNameErr] = useState({});
    const [usernameErr, setUsernameErr] = useState({});
    const [emailErr, setEmailErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [birthdayErr, setBirthdayErr] = useState({});

    /* When component renders for the first time, this fetches user data */
    useEffect(() => {
        axios.get(`https://myflix-0001.herokuapp.com/users/${localUsername}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                const userData = { ...res.data, Birthday: res.data.Birthday.substring(0, 10) }
                SetUser(userData);
            }).catch((e) => {
                console.log(e)
            })
    }, [])

    useEffect(() => {
        getFavs(user.FavoriteMovies)
    }, [])

    /* converts Array of IDs into Object of movies */
    const getFavs = (favs) => {
        let favoriteMovieList = [];
        movies.forEach((movie) => {
            favs.includes(movie._id) ? favoriteMovieList.push(movie) : favoriteMovieList
        });
        setFavorites(favoriteMovieList)
    };


    /* Event handler for updating user data*/
    const updateUserData = (e) => {
        e.preventDefault();
        let isValid = formValidation();
        if (isValid) {
            axios.put(`https://myflix-0001.herokuapp.com/users/${user.Username}`, {
                Name: user.Name,
                Username: user.Username,
                Email: user.Email,
                Password: user.Password,
                Birthday: user.Birthday

            }, { headers: { "Authorization": `Bearer ${token}` } },
            ).then((res) => {
                res.status == 200 ? setisSuccessful(true) : setisSuccessful(false)
            }).catch((e) => {
                console.error("error during editing: " + e)
            })
        }

    }

    const toggleFav = (movieId) => {
        user.FavoriteMovies.includes(movieId) ?
            axios.delete(`https://myflix-0001.herokuapp.com/users/${localUsername}/movies/${movieId}`, { headers: { "Authorization": `Bearer ${token}` } }
            ).then((res) => {
                ToggleFavorites(res.data.FavoriteMovies);
                getFavs(res.data.FavoriteMovies)
            }).catch((e) => { console.log(e) })

            :

            axios.put(`https://myflix-0001.herokuapp.com/users/${localUsername}/movies/${movieId}`, {}, { headers: { "Authorization": `Bearer ${token}` } }
            ).then((res) => {
                ToggleFavorites(res.data.FavoriteMovies)
                getFavs(res.data.FavoriteMovies)
            }).catch((e) => {
                console.log(e.message)
            })
    }

    /* Event handle for account deletion */
    const handleAccountDelete = () => {
        axios.delete(`https://myflix-0001.herokuapp.com/users/${user.Username}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                console.info(res)
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

        if (user.Name.trim().length === 0) {
            nameErr.nameIsEmpty = "Please enter a name.";
            isValid = false;
        }

        if (user.Username.trim().length < 3) {
            usernameErr.usernameTooShort = "Username must be at least 3 characters long";
            isValid = false;
        };

        if (!user.Email.includes("@")) {
            emailErr.noEmail = "This is not a valid e-mail.";
            isValid = false
        };

        if (user.Password.trim().length < 8) {
            passwordErr.passwordTooShort = "Password must be at least 8 characters long";
            isValid = false
        };

        if (user.Password !== passwordRepeat) {
            passwordErr.passwordNoMatch = "Passwords don't match.";
            isValid = false
        };

        if (user.Birthday.trim().length === 0) {
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

            {favorites.length > 0 ?
                <Col xs={12} sm={8} md={6} lg={6} xl={6} className="p-3 m-2">
                    <Divider title="My Favorites" isVisible={true} />
                    <Row>
                        {favorites.map((fav) => {
                            return (

                                <Col xs={6} sm={4} md={4} lg={3} xl={3} className="p-3" key={fav._id}>
                                    <MovieCard movieData={fav} />
                                    <div onClick={() => toggleFav(fav._id)} className="favstar mt-2">
                                        <i className="bi bi-star-fill mr-3 mt-3"></i>
                                        <span>Remove</span>
                                    </div>
                                </Col>

                            )
                        })}
                    </Row>
                </Col>
                :
                <>
                    <Col xs={12} sm={8} md={6} lg={6} xl={6} className="p-3 m-2">
                        <Divider title="My Favorites" isVisible={true} />
                        <p className="tag-line">Add Movies to your Favorites List.</p>

                        <Row>
                            <Col xs={6} sm={4} md={4} lg={3} xl={3} className="p-3" key="1">
                                <div className="placeholder-favorite">
                                    <div></div>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={4} lg={3} xl={3} className="p-3" key="2">
                                <div className="placeholder-favorite">
                                    <div></div>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={4} lg={3} xl={3} className="p-3" key="3">
                                <div className="placeholder-favorite">
                                    <div></div>
                                </div>
                            </Col>
                            <Col xs={6} sm={4} md={4} lg={3} xl={3} className="p-3" key="4">
                                <div className="placeholder-favorite">
                                    <div></div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </>}


            <Col xs={12} sm={8} md={5} lg={4} className="p-3 m-2">
                <Divider title="Profile Settings" isVisible={true} />
                <p className="tag-line">Update your user information.</p>

                <Form>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" defaultValue={user.Name} onChange={e => ValidateUser(e.target.value, "Name")} />

                    </Form.Group>

                    {Object.keys(nameErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{nameErr[key]}</div>
                    })}

                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" defaultValue={user.Username} onChange={e => ValidateUser(e.target.value, "Username")} />
                    </Form.Group>

                    {Object.keys(usernameErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{usernameErr[key]}</div>
                    })}

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" defaultValue={user.Email} onChange={e => ValidateUser(e.target.value, "Email")} />
                    </Form.Group>

                    {Object.keys(emailErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{emailErr[key]}</div>
                    })}

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => ValidateUser(e.target.value, "Password")} />
                    </Form.Group>

                    <Form.Group controlId="password-repeat">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat Password" defaultValue={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
                    </Form.Group>

                    {Object.keys(passwordErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{passwordErr[key]}</div>
                    })}

                    <Form.Group controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" value={user.Birthday} onChange={e => ValidateUser(e.target.value, "Birthday")} />
                    </Form.Group>

                    {Object.keys(birthdayErr).map((key) => {
                        return <div className="m-1" style={{ color: "red" }}>{birthdayErr[key]}</div>
                    })}

                    <Link to="/profile">
                        <Button onClick={updateUserData} as="div" variant="dark" type="submit" className="mt-3 mr-3">
                            Save Changes
                    </Button>
                    </Link>
                    <ModalComponent handleAccountDelete={() => handleAccountDelete()}></ModalComponent>

                </Form>
            </Col>
        </>

    )

};


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
    users: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    }).isRequired,
    logOut: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { ValidateUser, SetUser, ToggleFavorites })(ProfileView)