import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addReview, clearNewReview } from '../../actions'

class AddReview extends Component {

    state = {
        formdata:{
            restaurant: '',
            restaurantOwner: '',
            cuisine: '',
            review: '',
            rating: '',
            avgprice: ''
        }
    }

    handleInput = (event,name) => {
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value

        this.setState({
            formdata:newFormdata
        })
    }

    showNewReview = (review) => (
        review.post ?
            <div className="conf_link">
                Cool !! <Link to={`/reviews/${review.reviewId}`}>
                    Click the link to see the post
                </Link>
            </div>
        :null
    )

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(addReview({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        }))
    }

    componentWillUnmount(){
        this.props.dispatch(clearNewReview())
    }

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add a review</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter restaurant"
                            value={this.state.formdata.restaurant}
                            onChange={(event)=>this.handleInput(event,'restaurant')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter restaurant owner"
                            value={this.state.formdata.restaurantOwner}
                            onChange={(event)=>this.handleInput(event,'restaurantOwner')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter cuisine"
                            value={this.state.formdata.cuisine}
                            onChange={(event)=>this.handleInput(event,'cuisine')}
                        />
                    </div>

                    <textarea
                        value={this.state.formdata.review}
                        onChange={(event)=>this.handleInput(event,'review')}
                    />

                    <div className="form_element">
                        <select
                            value={this.state.formdata.rating}
                            onChange={(event)=>this.handleInput(event,'rating')}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                            <option val="6">6</option>
                            <option val="7">7</option>
                            <option val="8">8</option>
                            <option val="9">9</option>
                            <option val="10">10</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter Average Price"
                            value={this.state.formdata.avgprice}
                            onChange={(event)=>this.handleInput(event,'avgprice')}
                        />
                    </div>

                    <button type="submit">Add review</button>
                    {
                        this.props.reviews.newreview ?
                            this.showNewBook(this.props.books.newreview)
                        :null
                    }
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log(state)
    return {
        reviews:state.reviews
    }
}

export default connect(mapStateToProps)(AddReview)
