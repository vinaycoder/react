import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../lib/settings';
import * as helper from '../lib/helper';

const SummaryItem = ({ settings, item, updateCartItemQuantiry }) => {
	const thumbnail = helper.getThumbnailUrl(
		item.image_url,
		themeSettings.cartThumbnailWidth
	);
	const qtyOptions = [];
	const maxQty = item.stock_backorder
		? themeSettings.maxCartItemQty
		: item.stock_quantity >= themeSettings.maxCartItemQty
			? themeSettings.maxCartItemQty
			: item.stock_quantity;
	for (let i = 0; i <= item.maxQuantity; i++) {
		const optionText = i === 0 ? text.remove : i;
		qtyOptions.push(
			<option key={i} value={i}>
				{optionText}
			</option>
		);
	}
const productUrl=item.productUrl.split('/');
	return (
		<div className="columns is-mobile">
			<div className="column is-3">
				<div className="image">
					<NavLink to={productUrl[3]}>
						<img
							className="product-image"
							src={item.imageUrl}
							alt={item.name}
							title={item.name}
						/>
					</NavLink>
				</div>
			</div>
			<div className="column">
				<div>
					<NavLink to={productUrl[3]}>{item.name}</NavLink>
				</div>
				<div className="qty">
					<span>{text.qty}:</span>
					<span className="select is-small">
						<select
							onChange={e => {
								updateCartItemQuantiry(item.itemId, e.target.value);
							}}
							value={item.quantity}
						>
							{qtyOptions}
						</select>
					</span>
				</div>
			</div>
			<div className="column is-3 has-text-right price">
				{helper.formatCurrency(item.price, settings)}
			</div>
		</div>
	);
};

SummaryItem.propTypes = {
	settings: PropTypes.shape({}).isRequired,
	item: PropTypes.shape({}).isRequired,
	updateCartItemQuantiry: PropTypes.func.isRequired
};

const OrderSummary = props => {
	const {
		updateCartItemQuantiry,
		state: { cart, settings }
	} = props;
	console.log(props);
	if (cart && cart.items && cart.items.length > 0) {
		const items = cart.items.map(item => (
			<SummaryItem
				key={item.id}
				item={item}
				updateCartItemQuantiry={updateCartItemQuantiry}
				settings={settings}
			/>
		));

		return (
			<div
				className="checkout-box content is-small"
				style={{ paddingBottom: 0 }}
			>
				<div className="title is-4 checkoutTitle">{text.orderSummary}</div>
				<div className="checkoutCounts">{cart.items.length} Item(s) {helper.formatCurrency(cart.grandtotal, settings)}</div>
				<hr className="separator" />
				{items}
				<div className="columns is-mobile is-gapless is-multiline summary-block">
					<div className="column is-7 checkoutLabelColor">{text.subtotal}</div>
					<div className="column is-5 has-text-right price checkoutLabelColor">
						{helper.formatCurrency(cart.subtotal, settings)}
					</div>
					{cart.discount > 0 && (
						<div className="column is-7 checkoutLabelColor">{text.discount}</div>
					)}
					{cart.discount > 0 && (
						<div className="column is-5 has-text-right price checkoutLabelColor">
							-{helper.formatCurrency(cart.discount, settings)}
						</div>
					)}

					{cart.shippingAmount > 0 && (
						<div className="column is-7 checkoutLabelColor">{text.shipping}</div>
					)}
					{cart.shippingAmount > 0 && (
						<div className="column is-5 has-text-right price checkoutLabelColor">
							{helper.formatCurrency(cart.shippingAmount, settings)}
						</div>
					)}

					{cart.codFee > 0 && (
						<div className="column is-7 checkoutLabelColor">Cod Fee</div>
					)}
					{cart.codFee > 0 && (
						<div className="column is-5 has-text-right price checkoutLabelColor">
							{helper.formatCurrency(cart.codFee, settings)}
						</div>
					)}


					<div className="column is-12 checkoutGrandTotalPrice">
						<hr className="separator checkoutSeparator" />
					</div>
					<div className="column is-6 total-text">{text.grandTotal}</div>
					<div className="column is-6 total-price">
						{helper.formatCurrency(cart.grandtotal, settings)}
					</div>
				</div>
			</div>
		);
	}
	return null;
};

OrderSummary.propTypes = {
	updateCartItemQuantiry: PropTypes.func.isRequired,
	state: PropTypes.shape({
		cart: PropTypes.shape({}),
		settings: PropTypes.shape({}).isRequired
	}).isRequired
};

export default OrderSummary;
