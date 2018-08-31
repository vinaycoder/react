import React from 'react';
import { NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

export default class LoginWrapper extends React.PureComponent {
	render() {
		const { settings, loginToggle, loginPost } = this.props;
		// const { isLoggedIn, statsCookieId, customerDetails } = this.state;

		console.log('LoginWrapper this.props');
		console.log(this.props);
		// console.log("LoginWrapper this.state");
		// console.log(this.state);
		// const isLoggedIn = cookie.load('isLoggedIn');
		// const statsCookieId = cookie.load('statsCookieId');
		// const isLoggedInTest = 0;

		if (this.props.isLoggedIn === true) {
			return (
				<div className="mini-cart">
					<div className="dropdown-login-test mob_drop_loginn-test">
						<span>
							<div className="left">
								<ul className="dropdown-login-block-1">
									<li className="dropdown-login-block-item">
										<span className="dropdown-login-block-item-icon" />
										<NavLink className="ullia" to="/customer/account/">
											My Account
										</NavLink>
									</li>
									<li className="dropdown-login-block-item">
										<span className="dropdown-login-block-item-icon" />
										<i className="material-icons icon logged-in-image">
											person
										</i>
										<NavLink className="ullia" to="/sales/order/history/">
											My Orders
										</NavLink>
									</li>
								</ul>
							</div>
							<div className="right image-box">
								<NavLink to="/customer/account/">
									<span className="fb-connect-header-image-inner left sprites" />
								</NavLink>
							</div>
						</span>
						<span className="clear" />

						<span>
							<div className="test">
								<span className="test">
									<NavLink to="/customer/account/profile/">
										<div className="dropdown-login-block-2">
											<span className="dropdown-login-block-2-text">
												{this.props.customerDetails.email}
											</span>
										</div>
									</NavLink>
								</span>
								<span className="test">
									<input
										type="hidden"
										id="loggedOutEmail"
										value={this.props.customerDetails.email}
									/>
									<div className="divider" />
									<NavLink
										className="gtmUserInfo"
										id="trackLoggedoutState"
										to="/customer/account/logout/"
									>
										<div className="dropdown-login-block-3">Sign out</div>
									</NavLink>
								</span>
							</div>
						</span>
					</div>
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
