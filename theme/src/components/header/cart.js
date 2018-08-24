import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const CartItem = ({ item, deleteCartItem, settings, updateCartItemQuantiry }) => {
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
		const optionText = i === 0 ? 'Select' : i;
		qtyOptions.push(
			<option key={i} value={i}>
				{optionText}
			</option>
		);
	}
  const productUrl=item.productUrl.split('/');
	let productConfigData ='';
	if(item.isConfigurableProduct)
	{
		 productConfigData=item.name.split('-');
	}
	return (
		<div>
		<div className="columns is-mobile">
			<div className="column is-3">
				<div className="image">
					<NavLink to={productUrl[3]}>
						<img src={item.imageUrl} />
					</NavLink>
				</div>
			</div>
			<div className="column cartPopTop">
				<div>
					<NavLink to={productUrl[3]}>{item.name}</NavLink>
				</div>
					<div className="save-for-later-mrp is-inline mrLR2"> {helper.formatCurrency(item.mrpprice, settings)}</div>
					<div className="save-for-later-offer-price is-inline mrLR2"> {helper.formatCurrency(item.price, settings)}</div>
					{item.isConfigurableProduct && (
			       <div className="cartPopSize mrLR2">
								<span>Size:</span>
								<span>{productConfigData[1]}&nbsp;&nbsp;<span style={{color:'#f6823c'}}>Edit</span></span>
						</div>
          )}
          <div className="shipping-days-cartPop mrLR2">Ships in 7 business days.</div>
          <div className="delivery-days-cart-popup mrLR2">Get delivery dates</div>
          <div className="cash-delivery-cartpopup mrLR2">Cash On Delivery Available</div>
					<div className="qty mrLR6">
						<span>Qty:</span>
						<span className="select is-small mrL5">
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
		</div>

			<div className="saveLaterBtns">
			<div className="cart-buttons">
					<div className="new-cart-save-for-later">
							<div className="movetocart">SAVE FOR LATER</div>
					</div>
					<div className="new-cart-remove right" 	onClick={() => deleteCartItem(item.itemId)}>
							<span className="gtmCartremove">Remove</span>
					</div>
			</div>
	 </div>
			<div className="clear" />
		</div>
	);
};

export default class Cart extends React.PureComponent {
	render() {
		const { cart, deleteCartItem, settings, cartToggle, updateCartItemQuantiry } = this.props;
		if (cart && cart.items && cart.items.length > 0) {
			const items = cart.items.map(item => (
				<CartItem
					key={item.id}
					item={item}
					deleteCartItem={deleteCartItem}
					settings={settings}
					updateCartItemQuantiry={updateCartItemQuantiry}
				/>
			));

			return (
				<div className="mini-cart cartPopBottom">
					<p className="save-for-later-counts is-inline">{items.length} Items</p>
					<p className="save-for-later-counts is-inline is-pulled-right">Total : <span className="cartPopTopPrice">	{helper.formatCurrency(cart.subtotal, settings)}</span></p>
					<NavLink
						className="button is-primary is-fullwidth has-text-centered checkoutBottomButton mrB20"
						style={{ textTransform: 'uppercase' }}
						to="/checkout"
						onClick={cartToggle}
					>
						PROCEED TO SECURE CHECKOUT
					</NavLink>
					<div className="cart-main-div">
					{items}
					</div>
					{/*<hr className="separator" />*/}
					<div className="columns is-mobile is-gapless cart-checkout-button">
						<div className="column is-12 cartPopBottom">
							<p className="checkout-coupon-text">
								Have a coupon code? <a href="">Click Here</a>
							</p>
								<NavLink
									className="button is-primary is-fullwidth has-text-centered checkoutBottomButton"
									style={{ textTransform: 'uppercase' }}
									to="/checkout"
									onClick={cartToggle}
								>
									PROCEED TO SECURE CHECKOUT
								</NavLink>
								<p className="item-in-your"> Items in your cart are not reserved and can sell out. </p>
								<NavLink
									className="button is-primary is-fullwidth has-text-centered backToShoppingCart"
									to="/"
									onClick={cartToggle}
								>
								BACK TO SHOPPING
								</NavLink>
						</div>
					</div>

				</div>
			);
		}
		return (
			<div className="mini-cart">
				<p>{text.cartEmpty}</p>
			</div>
		);
	}
}
