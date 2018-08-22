import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const CartItem = ({ item, deleteCartItem, settings }) => {
	const thumbnail = helper.getThumbnailUrl(
		item.image_url,
		themeSettings.cartThumbnailWidth
	);

	return (
		<div>
		<div className="columns is-mobile">
			<div className="column is-3">
				<div className="image">
					<NavLink to={item.name}>
						<img src={item.imageUrl} />
					</NavLink>
				</div>
			</div>
			<div className="column">
				<div>
					<NavLink to={item.name}>{item.name}</NavLink>
				</div>
					<div className="save-for-later-mrp"> {helper.formatCurrency(item.mrpprice, settings)}</div>
					<div className="save-for-later-offer-price"> {helper.formatCurrency(item.price, settings)}</div>
			</div>
		</div>

			<div className="saveLaterBtns">
			<div className="cart-buttons">
					<div className="new-cart-save-for-later">
							<div className="movetocart">Move to cart</div>
					</div>
					<div className="new-cart-remove right">
							<span className="gtmCartremove">Remove</span>
					</div>
			</div>
	 </div>
			<div className="clear" />
		</div>
	);
};

export default class saveForLater extends React.PureComponent {
	render() {
		const { cart, deleteCartItem, settings, cartToggle } = this.props;
		if (cart && cart.items && cart.items.length > 0) {
			const items = cart.items.map(item => (
				<CartItem
					key={item.id}
					item={item}
					deleteCartItem={deleteCartItem}
					settings={settings}
				/>
			));

			return (
				<div className="mini-cart">
					<p className="save-for-later-counts">{items.length} Items</p>
					<div className="cart-main-div">
					{items}
					</div>
					<hr className="separator" />
					<div className="columns is-mobile is-gapless">
						<div className="column is-12">
						<p>*We will notify when sold out items are available for purchase again.</p>
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
