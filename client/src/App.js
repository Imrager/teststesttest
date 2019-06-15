import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Results from "./components/Results";
import "./App.css";
import axios from 'axios';
import logo from "./components/images/Family_Guy_Logo.png"

class App extends Component {
    constructor(props){
        super(props)
    this.state = {
        users : [],
        username: '',
        password: '',
        userLoggedIn: '',
        result: [],
        show: [],
        search: '',
        redirectToResults: false
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
            this.setState({ users : usersResponse.data})
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
        for(let i= 0; i < users.length; i++){
            if(user === users[i].name && password === users[i].password){
                console.log(users[i])
                this.setState({ userLoggedIn: users[i]})
                document.getElementById('loginForm').style.display='none'
                document.getElementById('loggedIn').style.display='flex'
                
            }
        }
        this.resetLoginForm()

    }
    searchEpisode = (e) => {
        e.preventDefault()
        let guess = this.state.search
        let showData = this.state.show
        
        for (let i = 0; i < showData.length; i++) {
            if (guess == showData[i].season ||
                guess == showData[i].number ||
                guess === showData[i].name
            ) {
                this.state.result.push(showData[i])
            }
        }
        this.setState({redirectToResults : true})
        console.log(this.state.result)      
    }
    handleChange = (e) => {
        this.setState({ search : e.target.value });
        // console.log(this.state.search)
        // console.log(this.state)
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
        if (this.state.redirectToResults) {
            return (< Redirect to="/search" />)
        }
        
        
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
                <div id='loggedIn'>
                    <img src={this.state.userLoggedIn.image} id='userImg'/>
                    
                    
                    <h4>User:{this.state.userLoggedIn.name}</h4>
                    
                    <img id='navbar'src='https://cdn2.iconfinder.com/data/icons/clean-minimal-set/16/open-menu-01-512.png' height='35px'/>
                    <nav>

                    </nav>
                </div>
                </div>
                <div id='homeBody'>
                <header>
                    
                </header>
                <div id='homeArticle'>
                    <div>
                        <Link to="/"><img src={logo} height='33%' alt='logo'/></Link>
                        <br />
                        <img id='eFLogo' src='https://fontmeme.com/permalink/190612/383739e555ee61e58f0add813ab63630.png' height='4%' />
                        <br />
                        <form id='homeSearch' onSubmit={this.searchEpisode}>
                            <label htmlFor="search">Search</label>
                            <input
                                id="search"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.search}
                                >
                            </input>
                            <button type='submit'>Find</button>
                        </form>
                    </div>
                </div>
            </div>

                <Switch>
                    <Route exact path="/search" component={Results} result={this.state.result}
                    result={this.state.result}
                    />
                    {/* <Route path="/" component={Home} /> */}
                    
                </Switch>
            </Router>
        );
    }
}

export default App;
