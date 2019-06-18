import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Results from "./components/Results";
import Home from "./components/Home";
import Episode from "./components/Episode";
import "./App.css";
import axios from 'axios';
import logo from "./components/images/Family_Guy_Logo.png"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            username: '',
            password: '',
            userLoggedIn: '',
            result: [],
            show: [],
            redirectToResults: false,
            newUser: {
                newUsername: '',
                newPassword: '',
                image: ''
            },
            redirectToHome: false
        }
    }
    componentDidMount() {
        // const artistId = this.props.match.params.id;
        // this.fetchArtist(artistId)
        this.fetchUsers()
        this.fetchEpisodes()
    }
    fetchUsers = async () => {
        try {
            const usersResponse = await axios.get('/api/v1/users/')
            this.setState({ users: usersResponse.data })
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
        console.log(this.state.users)
    }
    fetchEpisodes = async () => {
        try {
            const showResponse = await axios.get(`/api/v1/episodes/`)
            this.setState({
                // shows: artistResponse.data,
                // songs: artistResponse.data.songs,
                show: showResponse.data
            })

            // this.searchEpisode()
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }
    userLogin = (e) => {
        e.preventDefault()
        let users = this.state.users
        let user = this.state.username
        let password = this.state.password
        for (let i = 0; i < users.length; i++) {
            if (user === users[i].name && password === users[i].password) {
                console.log(users[i])
                this.setState({ userLoggedIn: users[i] })
                document.getElementById('loginForm').style.display = 'none'
                document.getElementById('loggedIn').style.display = 'flex'

            }
        }
        this.resetLoginForm()

    }
    searchEpisode = (input) => {


        let showData = this.state.show

        for (let i = 0; i < showData.length; i++) {
            if (input == showData[i].season ||
                input == showData[i].number ||
                input === showData[i].name
            ) {
                this.state.result.push(showData[i])
            }
        }
        this.setState({ redirectToResults: true })
        // document.getElementById('loginForm').style.display='none'
        console.log(this.state.result)
    }
    searchEpisodeById = (id) => {
        this.state.show.find((episode) => {
            return episode.id === id
        })
    }
    handleSearchChange = (e) => {
        this.setState({ search: e.target.value });
        // console.log(this.state.search)
        // console.log(this.state)
    }
    // zX
    handleUserNameChange = (e) => {
        this.setState({ username: e.target.value });
    }





    handleNewUserChange = (event) => {
        const cloneNewUser = { ...this.state.newUser }
        cloneNewUser[event.target.name] = event.target.value
        this.setState({ newUser: cloneNewUser })
    }






    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }
    resetLoginForm = () => {
        document.getElementById('userName').value = '';
        document.getElementById('password').value = '';
    }

    createUser = (e) => {
        e.preventDefault()
        axios.post('/api/v1/users/', {
            name: this.state.newUser.newUsername,
            password: this.state.newUser.newPassword,
            image: this.state.newUser.image
        })

            .then(res => {
                // const userList = [...this.state.users]
                // userList.unshift(res.data)
                this.setState({
                    newUser: {
                        username: '',
                        password: '',
                        image: ''

                    },
                    // user: userList
                })

                console.log(this.state.newUser)
                window.location.reload();
            })
    }
    

    deleteUser = () => {
        axios.delete(`/api/v1/users/${this.state.userLoggedIn.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
        window.location.reload();
    }
    render() {
        // if (this.state.redirectToResults) {
        //     return (< Redirect to="/search" />)
        // }
        let ResultsComponent = () => {
            return <Results results={this.state.result} />
        }
        let HomeComponent = () => {
            return <Home getAllEp={this.fetchEpisodes}
                searchEpisode={this.searchEpisode}
            />
        }
        let EpisodeComponent = ({ match }) => {
            return <Episode searchEpisodeById={this.searchEpisodeById} id={match.params.id} show={this.state.show} userLoggedIn={this.state.userLoggedIn}/>
        }

        return (


            <Router>
                {(this.state.redirectToResults) ? (< Redirect to="/search" />) : console.log(" redirect error")}
                {(this.state.redirectToHome) ? (< Redirect to="/" />) : console.log(" redirect error")}

                <div id='userLogin'>
                    <form id='loginForm' onSubmit={this.userLogin}>
                        <label htmlFor="userName">Username</label>
                        <input
                            id='userName'
                            type='text'
                            onChange={this.handleUserNameChange}
                            value={this.state.username}
                        >
                        </input>
                        <br />
                        <label htmlFor="password">Password</label>
                        <input id='password'
                            type='password'
                            onChange={this.handlePasswordChange}
                            value={this.state.password}
                        >
                        </input>
                        <button>Login</button>
                    </form>

                    <form onSubmit={this.createUser}>
                        <label htmlFor='createUser'>Username</label>
                        <input
                            id='createUser'
                            type='text'
                            name='newUsername'
                            onChange={this.handleNewUserChange}
                            placeholder={this.state.newUser.newUsername}
                        />
                        <label htmlFor='createPassword'>Password</label>
                        <input
                            id='createPassword'
                            type='text'
                            name='newPassword'
                            onChange={this.handleNewUserChange}
                            placeholder={this.state.newUser.newPassword}

                        />
                        <label htmlFor='createImage'>Image</label>
                        <input
                            id='createImage'
                            type='text'
                            name='image'
                            onChange={this.handleNewUserChange}
                            placeholder={this.state.newUser.image}
                        />
                        <button>Create</button>
                    </form>




                    <div id='loggedIn'>
                        <img src={this.state.userLoggedIn.image} id='userImg' />


                        <h4>User:{this.state.userLoggedIn.name}</h4>

                        <img id='navbar' src='https://cdn2.iconfinder.com/data/icons/clean-minimal-set/16/open-menu-01-512.png' height='35px' />
                        
                        <button onClick={this.deleteUser}>Delete</button>
                        <nav>

                        </nav>
                    </div>
                </div>



                <Switch>
                    <Route exact path='/' render={HomeComponent} />
                    <Route exact path="/search" render={ResultsComponent} />
                    <Route exact path={`/episode/:id`} render={EpisodeComponent}
                    />
                    {/* <Route path="/" component={Home} /> */}

                </Switch>
            </Router>
        );
    }
}

export default App;
