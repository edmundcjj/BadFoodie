import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getReview, updateReview, clearReview, deleteReview } from '../../actions'

class EditReview extends PureComponent {

    state = {
        formdata:{
            _id: this.props.match.params.id,
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

    submitForm = (e) => {
      e.preventDefault();
      this.props.dispatch(updateReview(this.state.formdata))
    }

    deletePost = () => {
      this.props.dispatch(deleteReview(this.props.match.params.id))
    }

    redirectUser = () => {
      setTimeout(() =>{
        this.props.history.push("/user/user-reviews");
      },1000)
    }

    componentWillMount() {
      this.props.dispatch(getReview(this.props.match.params.id))
    }

    componentWillUnmount() {
      this.props.dispatch(clearReview())
    }

    componentWillReceiveProps(nextProps) {
      let review = nextProps.reviews.review;
      this.setState({
        formdata:{
          _id: review._id,
          restaurant: review.restaurant,
          restaurantOwner: review.restaurantOwner,
          cuisine: review.cuisine,
          review: review.review,
          rating: review.rating,
          avgprice: review.avgPrice
        }
      })
    }

    render() {
        let reviews = this.props.reviews;
        return (
            <div className="rl_container article">
                {
                  reviews.updatereview ?
                    <div className="edit_confirm">
                      Review Updated, <Link to={`/reviews/${reviews.review._id}`}>
                        Click here to see your review
                      </Link>
                    </div>
                  :null
                }

                {
                  reviews.postDeleted ?
                    <div className="red_tag">
                      Review Deleted
                      {this.redirectUser()}
                    </div>
                  :null
                }

                <form onSubmit={this.submitForm}>
                    <h2>Edit review</h2>

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

                    <button type="submit">Edit review</button>

                    <div className="delete_post">
                      <div className="button" onClick={this.deletePost}>Delete review</div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        reviews:state.reviews
    }
}

export default connect(mapStateToProps)(EditReview)
