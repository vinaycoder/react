import React, { Component } from 'react';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { text } from '../../../lib/settings';
import * as helper from '../../../lib/helper';




const OrderItem = ({ item, settings }) => (
	<div className="columns is-mobile is-gapless checkout-success-row">
		<div className="column is-6">
			{item.name}
			<br />
			<span>{item.variant_name}</span>
		</div>
		<div className="column is-2 has-text-right">
			{helper.formatCurrency(item.price, settings)}
		</div>
		<div className="column is-2 has-text-centered">{item.qty_ordered}</div>
		<div className="column is-2 has-text-right">
			{helper.formatCurrency(item.price, settings)}
		</div>
	</div>
);

const OrderItems = ({ items, settings }) => {
	if (items && items.length > 0) {
		const rows = items.map(item => (
			<OrderItem key={item.item_id} item={item} settings={settings} />
		));
		return <div>{rows}</div>;
	}
	return null;
};

class CheckoutSuccess extends Component{
	constructor(props) {
	super(props);
}
	componentDidMount()
	{
		cookie.save('currentOrderId', '', { path: '/' });
	}
render(){
const {order,settings}=this.props;
	if (order && order.items && order.items.length > 0) {
		return (
			<div className="checkout-success-details">
				<h1 className="checkout-success-title">
				<img src="https://indiarush.com//skin/frontend/default/theme202/images/success-page-green-tick-icon.png" alt="" />
				<br />
				<div className="my-account-green orderPlaceFnt">Order Placed</div>
				<br />
					Thank you for your purchase!
				</h1>
				<hr />

				<div className="columns" style={{ marginBottom: '3rem' }}>
					<div className="column is-6">
					</div>

					<div className="column is-6">
						<b>Order Id</b>: {order.increment_id}
						<br />
						<b>Shipping Address</b>: {order.billing_address.firstname}, {order.billing_address.city}, {order.billing_address.region}, {order.billing_address.postcode}, 'India', {order.billing_address.telephone}
						<br />
						<b>Payment Method</b>: {order.payment_method}
						<br />
					</div>
				</div>

				<div className="columns is-mobile is-gapless checkout-success-row">
					<div className="column is-6">
						<b>{text.productName}</b>
					</div>
					<div className="column is-2 has-text-right">
						<b>{text.price}</b>
					</div>
					<div className="column is-2 has-text-centered">
						<b>{text.qty}</b>
					</div>
					<div className="column is-2 has-text-right">
						<b>{text.total}</b>
					</div>
				</div>

				<OrderItems items={order.items} settings={settings} />

				<div className="columns">
					<div className="column is-offset-7 checkout-success-totals">
						<div>
							<span>{text.subtotal}:</span>
							<span>{helper.formatCurrency(order.subtotal, settings)}</span>
						</div>
						<div>
						{order.discount > 0 && ( 	<span>{text.discount}:</span>	)}
						{order.discount > 0 && (
							<span>
								{helper.formatCurrency(order.shipping_total, settings)}
							</span>
						)}

						</div>
						<div>
						{order.shippingAmount > 0 && ( 	<span>{text.shipping}:</span>	)}
						{order.shippingAmount > 0 && (
							<span>
								{helper.formatCurrency(order.shippingAmount, settings)}
							</span>
						)}
						</div>

						<div>
						{order.codFee > 0 && ( 	<span>Cod Fee:</span>	)}
						{order.codFee > 0 && (
							<span>
								{helper.formatCurrency(order.codFee, settings)}
							</span>
						)}
						</div>

						<div>
							<b>{text.grandTotal}:</b>
							<b>{helper.formatCurrency(order.grand_total, settings)}</b>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return <div className="has-text-centered">{text.cartEmpty}</div>;
}
}
/*
CheckoutSuccess.propTypes = {
	order: PropTypes.shape({}),
	settings: PropTypes.shape({}).isRequired,
	pageDetails: PropTypes.shape({}).isRequired,
	checkoutFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
*/
CheckoutSuccess.defaultProps = {
	order: null
};

export default CheckoutSuccess;
