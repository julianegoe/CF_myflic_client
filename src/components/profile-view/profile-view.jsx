import axios from 'axios';
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
    const [isSuccessful, setisSuccessful] = useState(false);
    /* const name = localStorage.getItem('name');
    const username = localStorage.getItem('user')
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password') */
    /* const birthday = localStorage.getItem('birthday').substring(0, 10) */
    const [favorites, setFavorites] = useState([{ Title: "none" }]);
    const [favIds, setFavIds] = useState([]);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const localUsername = localStorage.getItem('user');
    const token = localStorage.getItem('token');


    const getFavs = (favs) => {
        let favoriteMovieList = [];
        movies.forEach((movie) => {
            favs.includes(movie._id) ? favoriteMovieList.push(movie) : null
        });
        setFavorites(favoriteMovieList)
    };

    useEffect(() => {
        console.log("getting user data...")
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

    useEffect(() => {
        favIds ? getFavs(favIds) : setFavorites({})
        console.log("favs in favIds: " + favIds)
    }, [favIds])

    const updateUserData = (e) => {
        e.preventDefault();
        axios.put(`https://myflix-0001.herokuapp.com/users/${username}`, {
            Name: name,
            Username: username,
            Email: email,
            Password: password,
            Birthday: birthday

        }, { headers: { "Authorization": `Bearer ${token}` } },
        ).then((res) => {
            console.log(res.data);
            res.status == 200 ? setisSuccessful(true) : setisSuccessful(false)
        }).catch((e) => {
            console.log(name);
            console.error("error during editing: " + e)
        })
    }

    const deleteFav = (favId) => {
        console.log(username);
        axios.delete(`https://myflix-0001.herokuapp.com/users/${username}/movies/${favId}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setFavIds(res.data.FavoriteMovies)

            }).catch((e) => { console.log(e) })
    }

    const handleAccountDelete = () => {
        axios.delete(`https://myflix-0001.herokuapp.com/users/${username}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                console.log(res.data)
                logOut()
            })
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

            <Col xs={12} sm={8} md={4} lg={4} className="p-3 m-2">
                <Divider title="Profile Settings" isVisible={true} />
                <Form>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} />

                    </Form.Group>

                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="text" placeholder="yyyy-mm-dd" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Link to="/profile">
                        <Button onClick={updateUserData} as="div" variant="dark" type="submit" className="mt-3">
                            Save Changes
                    </Button>
                    </Link>
                    <ModalComponent handleAccountDelete={() => handleAccountDelete()}>></ModalComponent>

                </Form>
            </Col>
        </>

    )

}
