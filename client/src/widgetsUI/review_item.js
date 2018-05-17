import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItem = (item) => {
  return (
    <div>
      <Link to={`/reviews/${item._id}`} className="book_item">
        <div className="book_header">
          <h2>{item.restaurant}</h2>
        </div>

        <div className="book_items">
          <div className="book_author">{item.restaurantOwner}</div>

          <div className="book_bubble">
            <strong>Price</strong> -> $ {item.avgPrice}
          </div>

          <div className="book_bubble">
            <strong>Cuisine</strong> -> {item.cuisine}
          </div>

          <div className="book_bubble rating">
            <strong>Rating</strong> -> {item.rating}/10
          </div>
        </div>

      </Link>
    </div>
  );
}

export default ReviewItem;
