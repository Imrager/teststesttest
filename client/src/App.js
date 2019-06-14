import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Results from "./components/Results";
import Home from "./components/Home";
import "./App.css";
import axios from 'axios';

class App extends Component {
    state = {
        users : [],
        username: '',
        password: '',
        userLoggedIn: ''
    }
    componentDidMount() {
        // const artistId = this.props.match.params.id;
        // this.fetchArtist(artistId)
        this.fetchUsers()
    }
    fetchUsers = async () => {
        try {
            const usersResponse = await axios.get('/api/v1/users/')
            this.setState({ users : usersResponse.data})
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
        console.log(this.state.users)
    }
    userLogin = (e) => {
        e.preventDefault()
        let users = this.state.users
        let user = this.state.username
        let password = this.state.password
        for(let i= 0; i < users.length; i++){
            if(user === users[i].name && password === users[i].password){
                console.log(users[i])
                this.setState({ userLoggedIn: users[i]})
            }
            else {
                alert('Invalid Username or Password')
                this.resetLoginForm()
            }
        }

    }
    handleUserNameChange = (e) => {
        this.setState({ username : e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({ password : e.target.value});   
    }
    resetLoginForm = () => { 
        document.getElementById('userName').value='';
        document.getElementById('password').value='';
      }
    render() {
        return (
            
            <Router>
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
                    <br/>
                    <label htmlFor="password">Password</label>
                    <input id='password'
                        type='password'
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
                        >
                        </input>
                    <button>Login</button>
                </form>
                </div>

                <Switch>
                    <Route exact path="/search" component={Results} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}

export default App;
