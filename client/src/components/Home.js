import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../components/Home.css"
import logo from "../components/images/Family_Guy_Logo.png"

class Home extends Component {

    state = {
            

    }

    componentDidMount() {
        const artistId = this.props.match.params.id;
        this.fetchArtist(artistId)
    }

    fetchArtist = async (artistId) => {
        try {
            const artistResponse = await axios.get(`/api/v1/artists/${artistId}`)
            this.setState({
                artist: artistResponse.data,
                songs: artistResponse.data.songs,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({error: error.message})
        }
    }

    render() {
        return (
            <div id='homeBody'>
                <header>

                </header>
                <div id='homeArticle'>
                    <div>
                    <img src={logo} height='33%'/>
                    <br/>
                    <input></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;