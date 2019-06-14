import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../components/Results.css"
import logo from "../components/images/Family_Guy_Logo.png"

class Results extends Component {
    // state = {
    //     error: '',
    //     episodes: []
    // }

    // componentDidMount(){
    //     this.fetchEpisode();
    // }

    // fetchEpisodes = async () => {
    //     try {
    //         const res = await axios.get('/api/v1/episodes');
    //         this.setState({artists: res.data});
    //     }
    //     catch (err) {
    //         console.log(err)
    //         this.setState({error: err.message})
    //     }
    // }

    render() {
        // if (this.state.error){
        //     return <div>{this.state.error}</div>
        // }
        return (
            <body>
                <aside>
                    <img src={logo} height='20%' />
                    <img id='eflogo' src='https://fontmeme.com/permalink/190611/383739e555ee61e58f0add813ab63630.png' width='60%' />
                    <div id='asideSearch'>
                        <input value="Search Here"></input>
                        <input type='button' value='Find'></input>
                    </div>
                    <Link to="/">Home</Link>
                </aside>

                <article>
                    <div id='highsky'>
                    </div>
                    <div id='test'>Result1</div>
                    <div id='test'>Result2</div>
                    <div id='test'>Result3</div>
                    <div id='test'>Result3</div>
                    <div id='test'>Result3</div>
                    <div id='test'>Result3</div>
                    <div id='test'>Result3</div>
                    <div id='test'>Result3</div>

                </article>
            </body>
        );
    }
}

export default Results;