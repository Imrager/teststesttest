import React, { Component } from 'react';
// import axios from 'axios';
import {Link, Redirect } from "react-router-dom";
// import "../components/Home.css"
import logo from "../components/images/Family_Guy_Logo.png";
class Home extends Component {
    
    state = {
        search: '',
        // redirectToResults: false
    }
    

//     componentDidMount() {
//         // const artistId = this.props.match.params.id;
//         // this.fetchArtist(artistId)
//         this.fetchEpisodes()
//     }

//     fetchEpisodes = async () => {
//         try {
//             const showResponse = await axios.get(`/api/v1/episodes/`)
//             this.setState({
//                 // shows: artistResponse.data,
//                 // songs: artistResponse.data.songs,
//                 show: showResponse.data
//             })

//             // this.searchEpisode()
//         }
//         catch (error) {
//             console.log(error)
//             this.setState({ error: error.message })
//         }
//     }
    
    // searchEpisode = (e) => {
    //     e.preventDefault()
    //     let guess = this.state.search
    //     let showData = this.state.show

    //     for (let i = 0; i < showData.length; i++) {
    //         if (guess === showData[i].season ||
    //             guess === showData[i].number ||
    //             guess === showData[i].name
    //         ) {
    //             this.state.result.push(showData[i])
    //         }
    //     }
    //     this.setState({ result: results
    //         // , 
    //         // redirectToResults : true
    //     })
    //     console.log(this.state.result)
        
    // }
    handleSearchChange = (e) => {
        this.setState({ search : e.target.value });
        // console.log(this.state.search)
        // console.log(this.state)
    }
    homeSearch =(e)=> {
        e.preventDefault()
        this.props.searchEpisode(this.state.search)
    }

    render() {
        // if (this.props.redirectToResults) {
        //     return (< Redirect to="/search" />)
        // }
        
        return (
            <div id='homeBody'>
                <header>
                    
                </header>
                <div id='homeArticle'>
                    <div>
                        <Link to="/"><img src={logo} height='33%' alt='logo'/></Link>
                        <br />
                        <img id='eFLogo' src='https://fontmeme.com/permalink/190612/383739e555ee61e58f0add813ab63630.png' height='4%' />
                        <br />
                        <form id='homeSearch' onSubmit={this.homeSearch}>
                            <label htmlFor="search">Search</label>
                            <input
                                id="search"
                                type="text"
                                onChange={this.handleSearchChange}
                                value={this.search}
                                >
                            </input>
                            <button type='submit'>Find</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;