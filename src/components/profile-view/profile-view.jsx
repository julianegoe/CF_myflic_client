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




export default function ProfileView({ movies }) {
    const [isSuccessful, setisSuccessful] = useState(false);
    /* const name = localStorage.getItem('name');
    const username = localStorage.getItem('user')
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password') */
    /* const birthday = localStorage.getItem('birthday').substring(0, 10) */
    const [favorites, setFavorites] = useState([{ Title: "none" }])
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
            favs.includes(movie._id) ? favoriteMovieList.push(movie) : console.log("didn't find it")
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
                getFavs(res.data.FavoriteMovies)
            }).catch((e) => {
                console.log(e)
            })
    }, [])

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




    return (
        <>
            {favorites.length > 0 &&
                <Col xs={12} sm={6} md={6} lg={6} xl={6} className="p-3">
                    <Divider title="My Favorites" isVisible={true} />
                    <Row>
                        {favorites.map((fav) => {
                            return (

                                <Col xs={12} sm={6} md={4} lg={3} xl={3} className="p-3" key={fav._id}>
                                    <MovieCard movieData={fav} />
                                </Col>

                            )
                        })}
                    </Row>
                </Col>}


            <Col xs={8} md={4} className="p-3">
                <Divider title="Profile Settings" isVisible={true} />
                <Snackbar close={setisSuccessful} isVisible={isSuccessful} />
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

                </Form>
            </Col>
        </>

    )

}
