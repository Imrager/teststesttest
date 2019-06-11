import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Artist extends Component {

    state = {
            artist: {},
            songs: [],
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
            <body>

                    <aside>
                        <h1>Family Guy Episode Finder</h1>
                        <div>
                            <div><Link to="/">Home</Link></div>
                        </div>
                    </aside>
                    <div id='content'>
                        <article>
                            
                        </article>
                        <footer>

                        </footer>
                    </div>
                </body>
        );
    }
}

export default Artist;