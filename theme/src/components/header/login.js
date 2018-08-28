import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';
import cookie from 'react-cookies';

const CartItem = ({ item, deleteCartItem, settings }) => {
	const thumbnail = helper.getThumbnailUrl(
		item.image_url,
		themeSettings.cartThumbnailWidth
	);

	return (
		<div className="columns is-mobile">
			<div className="column is-2">
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
				{/* {item.name.length > 0 && (
					 <div className="cart-option-name">{item.name}</div>
				)} */}
				<div className="cart-quantity">
					{text.qty}: {item.quantity}
				</div>
			</div>
			<div className="column is-4 has-text-right">
				<div className="mini-cart-item-price">
					Rs {item.price}
					{/* {helper.formatCurrency(item.price, settings)} */}
				</div>
				<a
					className="button is-light is-small"
					onClick={() => deleteCartItem(item.itemId)}
				>
					{text.remove}
				</a>
			</div>
		</div>
	);
};

export default class LoginWrapper extends React.PureComponent {
	render() {
		const { settings, loginToggle } = this.props;

		const isLoggedIn = cookie.load('isLoggedIn');
		const statsCookieId = cookie.load('statsCookieId');

		if (isLoggedIn == 1) {
			return (
				<div className="mini-cart">
					{items}
					<hr className="separator" />
					<div className="columns is-mobile is-gapless">
						<div className="column is-7">
							<b>{text.subtotal}</b>
						</div>
						<div className="column is-5 has-text-right">
							<b>
								Rs
								{/* {helper.formatCurrency(cart.subtotal, settings)} */}
							</b>
						</div>
					</div>
					<NavLink
						className="button is-primary is-fullwidth has-text-centered"
						style={{ textTransform: 'uppercase' }}
						to="/customer/account/login	"
						onClick={loginToggle}
					>
						{text.proceedToCheckout}
					</NavLink>
				</div>
			);
		}
		return (
			<div className="mini-cart">
				<div className="dropdown-login-block-3">
					<div className="font-normal signInToAccess">
						{text.signInToAccess}
					</div>

					<NavLink to="/customer/account/login">
						<button
							className="orange-button btn-cart btn-cart-header-wrapper"
							data-arg1="#loaderHeaderSignInBtn"
							id="headerLoader"
						>
							{text.signIn}
						</button>
					</NavLink>

					<div className="clear" />

					<div className="tab-content-ruler fb-gplus-separator">
						<hr className="tab-content-rulerr-hr" />
						<div className="clear" />
					</div>

					<div className="login-input-link-div facebook-login-div">
						<div className="right login-submit-div">
							<span className="fb-icon" />
							<input
								className="facebookloginbutton left "
								type="button"
								value="Sign-in with Facebook"
								name="send"
							/>
						</div>
					</div>

					<div className="login-input-link-div">
						<div id="forgotpass">
							<span> {text.dontHaveIrAcc}</span>
							<br />

							<NavLink
								className="customerAccountCreate"
								to="/customer/account/login"
							>
								{text.createAccount}
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
