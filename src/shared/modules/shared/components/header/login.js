import React from 'react';
import { NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import { text } from '../../../../lib/settings';
import * as helper from '../../../../lib/helper';

export default class LoginWrapper extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	customerLogout(props) {
		this.props.logoutPost(props);

		console.log('after logoutPost this props');
		console.log(this.props);
		console.log(Object.keys(this.props.customerDetails).length);

		if (Object.keys(this.props.customerDetails).length < 0) {
			const statsCookieId = cookie.load('statsCookieId');
			const timeStamp = Math.round(Math.floor(Date.now()) / 1000);
			// if (cookie.load('statsCookieId').length < 10) {
			console.log('in cookie setter');
			cookie.save('statsCookieId', timeStamp, { path: '/' });
			cookie.save('isLoggedIn', 0, { path: '/' });
			// }
		}

		// console.log("this.props");
		// console.log(props);

		// let customerDetails = Object.assign({}, props.customerDetails);
		// let customerDetails = {...this.state.customerDetails, [customerDetails]: {}};

		// customerDetails = {};
		// this.setState({customerDetails : {}});
		//
		// console.log("customerDetails");
		// console.log(customerDetails);
		//
		// console.log("this.props");
		// console.log(props);
	}

	render() {
		const { settings, loginToggle, loginPost, logoutPost } = this.props;
		// const { isLoggedIn, statsCookieId, customerDetails } = this.state;
		//
		// console.log('LoginWrapper this.props');
		// console.log(this.props);
		// console.log("LoginWrapper this.state");
		// console.log(this.state);
		// const isLoggedIn = cookie.load('isLoggedIn');
		// const statsCookieId = cookie.load('statsCookieId');
		// const isLoggedInTest = 0;

		console.log('LoginWrapper props');
		console.log(this.props);

		console.log('LoginWrapper props customerDetails length');
		// console.log(Object.keys(this.props.customerDetails).length);

		// console.log('LoginWrapper props customerDetails customer_id');
		// console.log(this.props.customerDetails.customer_id);

		if (this.props.customerDetails != null) {
			if (Object.keys(this.props.customerDetails).length > 0) {
				if (this.props.customerDetails.customer_id !== '') {
					return (
						<div className="mini-cart">
							<div className="">
								<div>
									<div className="left">
										<ul className="">
											<li className="dropdown-login-block-item">
												<NavLink to="/customer/account/">My Account</NavLink>
											</li>
											<li className="dropdown-login-block-item">
												<NavLink to="/sales/order/history/">My Orders</NavLink>
											</li>
										</ul>
									</div>
									<div className="right image-box">
										<NavLink to="/customer/account/">
											<span className="fb-connect-header-image-inner left sprites" />
										</NavLink>
									</div>
								</div>
								<div className="clear" />

								<div>
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
											<div
												className="gtmUserInfo"
												onClick={() => this.customerLogout(this.props)}
											>
												<div className="dropdown-login-block-3">Sign out</div>
											</div>
										</span>
									</div>
								</div>
							</div>
						</div>
					);
				}
			}
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
