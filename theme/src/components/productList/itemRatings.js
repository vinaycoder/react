import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const ItemRatings = ({ product, settings }) => {
	const priceStyle = {};
	// if (themeSettings.list_price_size && themeSettings.list_price_size > 0) {
	// 	priceStyle.fontSize = `${themeSettings.list_price_size}px`;
	// }
	// if (
	// 	themeSettings.list_price_color &&
	// 	themeSettings.list_price_color.length > 0
	// ) {
	// 	priceStyle.color = themeSettings.list_price_color;
	// }

	let star_1 = 'star_border';
	let star_2 = 'star_border';
	let star_3 = 'star_border';
	let star_4 = 'star_border';
	let star_5 = 'star_border';

	if (
		product.rating.average_rating > 0 &&
		product.rating.average_rating <= 0.5
	) {
		star_1 = 'star_half';
	} else if (
		product.rating.average_rating > 0.5 &&
		product.rating.average_rating <= 1
	) {
		star_1 = 'star';
	} else if (product.rating.average_rating >= 1) {
		star_1 = 'star';
	}

	if (
		product.rating.average_rating > 1 &&
		product.rating.average_rating <= 1.5
	) {
		star_2 = 'star_half';
	} else if (
		product.rating.average_rating > 1.5 &&
		product.rating.average_rating <= 2
	) {
		star_2 = 'star';
	} else if (product.rating.average_rating >= 2) {
		star_2 = 'star';
	}

	if (
		product.rating.average_rating > 2 &&
		product.rating.average_rating <= 2.5
	) {
		star_3 = 'star_half';
	} else if (
		product.rating.average_rating > 2.5 &&
		product.rating.average_rating <= 3
	) {
		star_3 = 'star';
	} else if (product.rating.average_rating >= 3) {
		star_3 = 'star';
	}

	if (
		product.rating.average_rating > 3 &&
		product.rating.average_rating <= 3.5
	) {
		star_4 = 'star_half';
	} else if (
		product.rating.average_rating > 3.5 &&
		product.rating.average_rating <= 4
	) {
		star_4 = 'star';
	} else if (product.rating.average_rating >= 4) {
		star_4 = 'star';
	}

	if (
		product.rating.average_rating > 4 &&
		product.rating.average_rating <= 4.5
	) {
		star_5 = 'star_half';
	} else if (
		product.rating.average_rating > 4.5 &&
		product.rating.average_rating <= 5
	) {
		star_5 = 'star';
	} else if (product.rating.average_rating >= 5) {
		star_5 = 'star';
	}

	if (product.rating.average_rating > 3 && product.rating.rating_count != 0) {
		return (
			<div className="product-rating-wrapper">
				<span className="product-rating-data-element">
					<i className="material-icons catRatingUnselectedStarIconWidth rating-star-variation ">
						{star_1}
					</i>
					<i className="material-icons catRatingUnselectedStarIconWidth rating-star-variation ">
						{star_2}
					</i>
					<i className="material-icons catRatingUnselectedStarIconWidth rating-star-variation ">
						{star_3}
					</i>
					<i className="material-icons catRatingUnselectedStarIconWidth rating-star-variation ">
						{star_4}
					</i>
					<i className="material-icons catRatingUnselectedStarIconWidth rating-star-variation ">
						{star_5}
					</i>
				</span>
				<span className="catRatinglabel">
					{product.rating.average_rating} ({product.rating.rating_count}{' '}
					Ratings){' '}
				</span>
			</div>
		);
	}
	return <div className="product-rating-wrapper" />;
};

export default ItemRatings;
