import React, { Component } from 'react';
import "./Episode.css";
class Episode extends Component {

    state = {
        episode: ''
    }

    componentDidMount(){

        this.getEpisodeById()
        }
        
    // searchEpisodeById = ()=> {
    //     this.props.searchEpisodeById(this.props.params.id)
    //     .then((res)=>{console.log(res)})
    // }
    getEpisodeById = () => {
        this.props.show.find((episode)=> {
            if(episode.id == this.props.id)
            this.setState({ episode: episode})
        })
    }
    render() {

        return (
            <div id='episode'>
                <h1>{this.state.episode.name}</h1>
                <div id='epBio'>
                    <img id='epImage' src={this.state.episode.image}/>
                    <div>
                        <h3>
                            Season:{this.state.episode.season}
                    </h3>
                        <h3>
                            Episode:{this.state.episode.number}
                    </h3>
                    <p>Summary: {this.state.episode.summary}</p>
                    </div>
                </div>
                <div id='comment'>
                    comment
                </div>

            </div>
        );
    }
}

export default Episode;