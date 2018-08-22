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

	if (product.rating.average_rating > 3 && product.rating.rating_count != 0) {
		return (
			<div className="product-rating-wrapper">
				<p className="product-rating-data-element">
					Rating : {product.rating.average_rating} (
					{product.rating.rating_count} Ratings)
				</p>
			</div>
		);
	}
	return <div className="product-rating-wrapper" />;
};

export default ItemRatings;
