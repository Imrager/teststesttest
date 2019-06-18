import React, { Component } from 'react';
import "./Episode.css";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

class Episode extends Component {

    state = {
        episode: '',
        reviews: [],
        newReview: {
            review: '',
            episode: '',
            user: ''
        },
        updateReview:{
            updatedReview: '',
            updateEpisode: '',
            updateUser: ''
        },
        comments: [],
        newComment: {
            reply:'',
            reviewId: ''
        },
        redirectToHome: false
    }

    componentDidMount() {

        this.getEpisodeById()
        this.getReviews()
        this.getComments()
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
    getComments = () => {
        axios.get('/api/v1/comments/')
            .then(res => {
                this.setState({ comments: res.data })
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
            user: 1
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
    updateReview = (e) => {
        e.preventDefault()
        axios.put('/api/v1/reviews/2/', {
            review: this.state.updateReview.updatedReview,
            episode: this.props.id,
            user: 1
        })
            .then(res => {
                this.setState({ updateReview:{
                    updatedReview: '',
                    updateEpisode: '',
                    updateUser: ''
                } })
            })
            window.location.reload();

    }
    createComment = (e) => {
        e.preventDefault()
        axios.post('/api/v1/comments/', {
            reply: this.state.newComment.reply,
            review: 2
        })
            .then(res => {
                this.setState({
                    newComment: {
                        reply: '',
                        reviewId: ''

                    },
                })

                console.log(this.state.newComment)
                window.location.reload();
            })
    }
    stopFormQuery = (e) =>  {
        e.preventDefault()
    }
    deleteReview = (id) => {
        axios.delete(`/api/v1/reviews/${id}`)
            // .then(res => {
            //     this.setState({ redirectToHome: true })
            // })
        window.location.reload();
    }
    deleteComment = (id) => {
        axios.delete(`/api/v1/comments/${id}/`)
            // .then(res => {
            //     this.setState({ redirectToHome: true })
            // })
        window.location.reload();
    }
    handleReviewChange = (event) => {
        const cloneNewReview = { ...this.state.newReview }
        cloneNewReview[event.target.name] = event.target.value
        this.setState({ newReview: cloneNewReview })
    }
    handleUpdateChange = (event) => {
        const cloneNewReview = { ...this.state.updateReview }
        cloneNewReview[event.target.name] = event.target.value
        this.setState({ updateReview: cloneNewReview })
    }
    handleCommentChange = (event) => {
        const cloneNewComment = { ...this.state.newComment }
        cloneNewComment[event.target.name] = event.target.value
        this.setState({ newComment: cloneNewComment})
    }
    render() {

        return (
            <div id='episode'>
               
                {(this.state.redirectToHome) ? (< Redirect to="/" />) : console.log(" redirect error")}
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

                                <form onSubmit={this.updateReview}>
                                    <input
                                    id='reviewField'
                                    type='text'
                                    name='updatedReview'
                                    onChange={this.handleUpdateChange}
                                    placeholder={this.state.updateReview.updatedReview}
                                    />
                                    <button type='submit'>Update Review</button>
                                </form>
                                <button onClick={() => (this.deleteReview(review.id))}>Delete Review</button>
                                {review.comments.map((comment)=>{
                                    return (
                                        <div>
                                        <h3>{comment.reply}</h3>
                                        <button onClick={() => (this.deleteComment(comment.id))}>Delete Comment</button>
                                        </div>
                                        )
                                })}
                                <form onSubmit={this.createComment}>
                                    <textarea rows="4" cols="25"
                                        id='replyField'
                                        type='text'
                                        name='reply'
                                        onChange={this.handleCommentChange}
                                        placeholder={this.state.newComment.reply} />
                                    <button type='submit'>Submit</button>
                                </form>
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
                            placeholder={this.state.newReview.reply} />
                        <button type='submit'>Submit</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default Episode;