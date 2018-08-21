import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const ItemSize = ({ product, settings }) => {
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

	if (product.size.length) {
		return (
			<div className="product-sizes-wrapper">
				<p className="product-size-element">Sizes : {product.size}</p>
			</div>
		);
	}
	return <div className="product-sizes-wrapper" />;
};

export default ItemSize;
