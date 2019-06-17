import React, { Component } from 'react';
import "./Episode.css";
import { Link } from "react-router-dom";
import axios from 'axios';

class Episode extends Component {

    state = {
        episode: '',
        reviews: [],
        newReview: {
            review: '',
            episode: '',
            user: ''
        }
    }

    componentDidMount() {

        this.getEpisodeById()
        this.getReviews()
    }

    // searchEpisodeById = ()=> {
    //     this.props.searchEpisodeById(this.props.params.id)
    //     .then((res)=>{console.log(res)})
    // }
    getReviews = () => {
        axios.get('/api/v1/reviews/')
            .then(res => {
                this.setState({ reviews: res.data })
            })
    }
    getEpisodeById = () => {
        this.props.show.find((episode) => {
            if (episode.id == this.props.id)
                this.setState({ episode: episode })
        })
    }
    createReview = (e) => {
        e.preventDefault()
        axios.post('/api/v1/reviews/', {
            review: this.state.newReview.review,
            episode: this.props.id,
            user: this.props.userLoggedIn.username
        })

            .then(res => {
                this.setState({
                    newReview: {
                        review: '',
                        episode: '',
                        user: ''

                    },
                })

                console.log(this.state.newReview)
                window.location.reload();
            })
    }
    handleReviewChange = (event) => {
        const cloneNewReview = { ...this.state.newReview }
        cloneNewReview[event.target.name] = event.target.value
        this.setState({ newReview: cloneNewReview })
    }
    render() {

        return (
            <div id='episode'>
                <Link to="/">Home</Link>
                <h1>{this.state.episode.name}</h1>
                <div id='epBio'>
                    <img id='epImage' src={this.state.episode.image} />
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
                <div id='showComments'>
                    Reviews:
                    {this.state.reviews.map((review) => {
                        return (
                            <div id='review'>
                                <h1>{review.review}</h1>
                            </div>
                        )
                    })}
                </div>
                <div id='createReview'>
                    <h1>Review</h1>
                    <form onSubmit={this.createReview}>
                        <textarea rows="4" cols="50"
                            id='reviewField'
                            type='text'
                            name='review'
                            onChange={this.handleReviewChange}
                            placeholder={this.state.newReview.review} />
                        <button type='submit'>Submit</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default Episode;