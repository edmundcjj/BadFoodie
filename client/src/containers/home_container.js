import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getReviews } from './../actions';
import ReviewItem from './../widgetsUI/review_item';

class HomeContainer extends Component {

  constructor() {
    super()

    this.renderItems = this.renderItems.bind(this);
    this.loadmore = this.loadmore.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getReviews(2, 0, 'asc'))
  }

  renderItems = (reviews) => (
    reviews.list ?
      reviews.list.map( item => (
        <ReviewItem {...item} key={item._id} />
      ))
    :null
  )

  loadmore = () => {
    let currentCount = this.props.reviews.list.length;

    this.props.dispatch(getReviews(2, currentCount, 'asc', this.props.reviews.list))
  }

  render() {
    return (
      <div>
        {this.renderItems(this.props.reviews)}
        <div className="loadmore" onClick={this.loadmore}>LOAD MORE</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reviews: state.reviews
  }
}

export default connect(mapStateToProps)(HomeContainer);
