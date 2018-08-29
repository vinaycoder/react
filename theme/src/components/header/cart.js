import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const CartItem = ({ item, deleteCartItem, settings, updateCartItemQuantiry, saveForLater, showSize, updateCartItemSize, showPincode, checkPincodeOnCart, pincode }) => {
	const thumbnail = helper.getThumbnailUrl(
		item.image_url,
		themeSettings.cartThumbnailWidth
	);
	const qtyOptions = [];
	const sizeOptions = [];
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

		item.sizelabel.map((size,index) => (
			 sizeOptions.push(
				 <option key={size.product_id} value={size.product_id}>
					 {size.size}
				 </option>
			 )
		 ));

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
					       <div className="cartPopSize mrLR2" >
										<span>Size:</span>
										<span id={"size_" + item.itemId}>
										{productConfigData[1]}&nbsp;&nbsp;<span style={{color:'#f6823c',cursor:'pointer'}} onClick={e => showSize(e,item.id,item.itemId)}>Edit</span>
										</span>
										&nbsp;&nbsp;
										<span id={"sizeShow_" + item.itemId} style={{display:'none',}} className="select is-small mrL5">
										<select
											onChange={e => {
												updateCartItemSize(item.itemId, e.target.value);
											}}
											value={item.id}
										>
											{sizeOptions}
										</select>
										</span>
								</div>

          )}




					{item.deliveryDate=="" ? (
					<div>
					<div className="shipping-days-cartPop mrLR2" id={"shippingDate" + item.itemId}>Ships in 7 business days.</div>
          <div className="delivery-days-cart-popup mrLR2" id={"checkpincode" + item.itemId} onClick={e => showPincode(e,item.id,item.itemId)}>Get delivery dates
						<span className="pincodeOnCart" id={"pincode" + item.itemId}>
							<input
								maxLength="6"
								placeholder="Enter Pincode"
								title="Enter your Pincode to check shipping time"
								type="tel"
								onChange={e => checkPincodeOnCart(e,item.id,item.itemId)}
							/>
						</span>
					</div>
					 <div className="cash-delivery-cartpopup mrLR2" id={"cod" + item.itemId}>Cash On Delivery Available</div>
					</div>
				) : (
					<div>
					<div className="shipping-days-cartPop mrLR2" id={"shippingDate" + item.itemId}>{item.shippingInfo}</div>
					<div className="cash-delivery-cartpopup mrLR2" id={"cod" + item.itemId}>{item.codInfo}</div>
					</div>
				)}




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
					<div className="new-cart-save-for-later" onClick={e => {
						saveForLater(item.id,item.itemId);
					}}>
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
	constructor(props) {
		super(props);
		this.state = {
		pincode:undefined
		};
	}
	showSize(e,product_id,item_id)
	{
		document.getElementById("size_"+item_id).style.display = "none";
		document.getElementById("sizeShow_"+item_id).style.display = "inline-block";
	}
	showPincode(e,product_id,item_id)
	{
		document.getElementById("pincode"+item_id).style.display = "block";
	}

	checkPincodeOnCart(e, productId, item_id) {
		if (
			e.target.value.length == 6 &&
			Number.isInteger(Number(e.target.value))
		) {
			var pincode = e.target.value;
			fetch(
				'https://indiarush.com/irapi/product/getPincodeCheck?product_id=' +
					productId +
					'&pincode=' +
					e.target.value +
					'&version=' +
					'3.99'
			)
				.then(result => {
					return result.json();
				})
				.then(jsonResult => {
					console.log(jsonResult);
					if(jsonResult.metadata.message=='success')
					{
						if (jsonResult.data.postpaid) {
							document.getElementById("cod"+item_id).innerHTML = "Cash On Delivery Available.";
						} else {
							document.getElementById("cod"+item_id).innerHTML = "Cash On Not Delivery Available.";
						}
						document.getElementById("shippingDate"+item_id).innerHTML = "Get it by : "+jsonResult.data.deliveryDate;
						document.getElementById("checkpincode"+item_id).style.display = "none";
						localStorage.setItem('userPincode', pincode);
						// this.setState({pincode:pincode});
						// this.setState({pincode: 110044});
					}
				});

		}
	}
		componentDidMount() {
			if(localStorage.getItem('userPincode'))
			{
				const	 pincode=localStorage.getItem('userPincode');
					this.setState({pincode:pincode});
			}
			else {
				this.setState({pincode:undefined});
			}

		}

	render() {
		const { cart, deleteCartItem, settings, cartToggle, updateCartItemQuantiry, saveForLater, updateCartItemSize } = this.props;

		if (cart && cart.items && cart.items.length > 0) {
			const items = cart.items.map(item => (
				<CartItem
					key={item.id}
					item={item}
					deleteCartItem={deleteCartItem}
					settings={settings}
					updateCartItemQuantiry={updateCartItemQuantiry}
					saveForLater={saveForLater}
					showSize={this.showSize}
					updateCartItemSize={updateCartItemSize}
					showPincode={this.showPincode}
					checkPincodeOnCart={this.checkPincodeOnCart}
					pincode={this.state.pincode}
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
