import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const CartItem = ({ item, settings,moveSaveForLaterToCart, removeFromSaveForLater }) => {
	const thumbnail = helper.getThumbnailUrl(
		item.image_url,
		themeSettings.cartThumbnailWidth
	);
  const productUrl=item.name.split('/');
  // const productUrl=item.productUrl.split('/');
	return (
		<div>
		<div className="columns is-mobile">
			<div className="column is-3">
				<div className="image">
					<NavLink to='name'>
						<img src={item.image_url} />
					</NavLink>
				</div>
			</div>
			<div className="column">
				<div>
					<NavLink to='name'>{item.name}</NavLink>
				</div>
					<div className="save-for-later-mrp"> {helper.formatCurrency(item.price, settings)}</div>
					<div className="save-for-later-offer-price"> {helper.formatCurrency(item.special_price, settings)}</div>
			</div>
		</div>

			<div className="saveLaterBtns">
			<div className="cart-buttons">
					<div className="new-cart-save-for-later" onClick={()=>moveSaveForLaterToCart(item.product_id)}>
							<div className="movetocart">Move to cart</div>
					</div>
					<div className="new-cart-remove right" onClick={()=>removeFromSaveForLater(item.product_id)}>
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
		const { saveForLater, settings, saveForLaterToggle, moveSaveForLaterToCart, removeFromSaveForLater } = this.props;
		if (saveForLater.length > 0) {
			const items = saveForLater.map(item => (
				<CartItem
					key={item.id}
					item={item}
					settings={settings}
					moveSaveForLaterToCart={moveSaveForLaterToCart}
					removeFromSaveForLater={removeFromSaveForLater}
				/>
			));

			return (
				<div className="mini-cart">
					<p className="save-for-later-counts">{saveForLater.length} Items</p>
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
				<p>Your Save For Later is Empty</p>
			</div>
		);
	}
}
