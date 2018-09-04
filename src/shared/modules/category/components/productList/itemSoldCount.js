import React from 'react';
import { themeSettings, text } from '../../../../lib/settings';
import * as helper from '../../../../lib/helper';

const ItemSoldCount = ({ product, settings }) => {
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

	if (product.today_sold_count) {
		return (
			<div className="product-soldcount-wrapper">
				<p className="product-soldcount-data-element">
					<i className="material-icons catRatingNotification">
						notifications_active
					</i>
					<span className="cat_sold_count_label">
						Sold {product.today_sold_count} times today
					</span>
				</p>
			</div>
		);
	}
	return <div className="product-sizes-wrapper" />;
};

export default ItemSoldCount;
