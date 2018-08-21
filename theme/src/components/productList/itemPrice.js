import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const FormattedCurrency = ({ number, settings }) =>
	helper.formatCurrency(number, settings);

const ItemPrice = ({ product, settings }) => {
	const priceStyle = {};
	if (themeSettings.list_price_size && themeSettings.list_price_size > 0) {
		priceStyle.fontSize = `${themeSettings.list_price_size}px`;
	}
	if (
		themeSettings.list_price_color &&
		themeSettings.list_price_color.length > 0
	) {
		priceStyle.color = themeSettings.list_price_color;
	}

	if (product.stock_status === 'discontinued') {
		return <div className="product-price">{text.discontinued}</div>;
	}
	if (product.stock_status === 'out_of_stock') {
		return <div className="product-price">{text.outOfStock}</div>;
	}
	if (product.is_salable) {
		return (
			<div className="product-price">
				<span className="product-new-price">
					Rs. {product.offered_price}
					{/* <FormattedCurrency settings={settings} number={product.offered_price} /> */}
				</span>
				<del className="product-old-price">
					Rs. {product.actual_price}
					{/* <FormattedCurrency
						settings={settings}
						number={product.actual_price}
					/> */}
				</del>
			</div>
		);
	}
	return (
		<div className="product-price" style={priceStyle}>
			<FormattedCurrency settings={settings} number={product.price} />
		</div>
	);
};

export default ItemPrice;
