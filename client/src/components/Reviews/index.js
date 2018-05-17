import React, { Component } from 'react';
import {getReviewWithReviewer, clearReviewWithReviewer } from './../../actions';
import { connect } from 'react-redux';

class ReviewView extends Component {

  constructor() {
    super()

    this.renderReview = this.renderReview.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getReviewWithReviewer(this.props.match.params.id));
  }

  componentWillUnmount(){
    this.props.dispatch(clearReviewWithReviewer());
  }

  renderReview = (reviews) => (
        reviews.review ?
            <div className="br_container">
                <div className="br_header">
                    <h2>{reviews.review.restaurant}</h2>
                    <h5>{reviews.review.restaurantOwner}</h5>
                    <div className="br_reviewer">
                        <span>Review by:</span> {reviews.reviewer.name} {reviews.reviewer.lastname}
                    </div>
                </div>
                <div className="br_review">
                    {reviews.review.review}
                </div>
                <div className="br_box">
                    <div className="left">
                        <div>
                            <span>Cuisine:</span> {reviews.review.cuisine}
                        </div>
                        <div>
                            <span>Avg Price:</span> SGD {reviews.review.avgPrice}
                        </div>
                    </div>
                    <div className="right">
                        <span>Rating</span>
                        <div>{reviews.review.rating}/10</div>
                    </div>
                </div>
            </div>
        :null
    )

  render() {
    let reviews = this.props.reviews;
    return (
        <div>
            {this.renderReview(reviews)}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reviews: state.reviews
  }
}

export default connect(mapStateToProps)(ReviewView);
