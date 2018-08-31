import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';
import { Redirect } from 'react-router-dom';

export default class FormLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			data: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.PasswordChange = this.PasswordChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
		// console.log('FormLogin this.props');
		// console.log(this.props);
		// console.log('FormLogin this.state');
		// console.log(this.state);
	}

	handleChange(event) {
		this.setState({ email: event.target.value });
	}

	PasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	handleSubmitForm(event) {
		this.state.data.push(`${this.state.email}`);
		this.state.data.push(`${this.state.password}`);

		// console.log("this.state.data");
		// console.log(this.state.data);
		//
		// console.log("this.props");
		// console.log(this.props);

		console.log('goto action');
		this.props.loginPost(this.state.data);
		console.log('returned from action');

		console.log('handleSubmitForm this.state');
		console.log(this.state);
		console.log('handleSubmitForm this.props');
		console.log(this.props);
	}

	handleSubmit(event) {
		// console.log('handleSubmit event');
		// console.log(event);

		// const {
		// 	state: { isLoggedIn, statsCookieId, customerDetails }
		// } = props;

		alert(`A name was submitted: ${this.state.email}`);
		alert(`A password was submitted: ${this.state.password}`);

		// console.log('this props');
		// console.log(this.props);
		//
		// console.log('this.state');
		// console.log(this.state);

		const version = 3.81;
		const isOtp = 0;

		fetch(
			`https://indiarush.com/irapi/customer/customerLogin/?email=${
				this.state.email
			}&password=${this.state.password}&isOtp=${isOtp}&version=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				console.log('jsonResult');
				console.log(jsonResult);

				console.log('this props');
				console.log(this.props);

				console.log('this props');
				console.log(this.props.state);
				// console.log("props");
				// console.log(props);

				if (jsonResult.customer_id != '') {
					console.log('in here');
					// this.setState({ email: jsonResult.email});
					// this.setState({ isLoggedIn: true});
					// this.setState({ statsCookieId: jsonResult.customer_id});
					// this.setState({ customerDetails: jsonResult});
					// this.props.customerDetails.push(jsonResult);
					// this.props.isLoggedIn = true;
					// this.props.statsCookieId = jsonResult.customer_id;

					// console.log("this.props");
					// console.log(this.props);
				}

				// if (this.state.allRecommendations) {
				// 	const mainOptions = this.state.allRecommendations.map(
				// 		(recommendationProduct, index) => {
				// 			const subOptions = recommendationProduct.map(
				// 				(recommendedProduct, index) => {
				// 					this.props.recommendationProducts.push(recommendedProduct);
				// 				}
				// 			);
				// 		}
				// 	);
				// }

				// return jsonResult;
			});

		event.preventDefault();
	}

	componentDidMount() {
		console.log('componentDidMount viewed');
		// const { product } = this.props;
		// const viewedProducts = this.getArrayFromLocalStorage();
		// this.setState({ viewedProducts });
		//
		// if (product && product.id) {
		// 	this.addProductIdToLocalStorage(product.id);
		// }
	}

	componentWillReceiveProps(nextProps) {
		// if (
		// 	this.props.product !== nextProps.product &&
		// 	nextProps.product &&
		// 	nextProps.product.id
		// ) {
		// 	this.addProductIdToLocalStorage(nextProps.product.id);
		// }
	}
	//
	// shouldComponentUpdate(nextProps, nextState) {
	// 	return this.state.email !== nextState.email;
	// }

	render() {
		console.log('in Form Login Render');

		const { loginPost } = this.props;
		const { isLoggedIn, statsCookieId, customerDetails } = this.state;

		// console.log("this.state");
		// console.log(this.state);
		// console.log("this.props");
		// console.log(this.props);

		// console.log("this.props.isLoggedIn");
		// console.log(this.props.isLoggedIn);
		// console.log("this.props.statsCookieId.length");
		// console.log(this.props.statsCookieId);

		// console.log("props");
		// console.log(`${isLoggedIn}`);
		if (this.props.isLoggedIn == true) {
			// return <Redirect to={'/customer/account/'} />;
			// return <Redirect to={'/sarees-for-women/'} />;
			return <Redirect to={'/cotton-silk-blue-printed-saree-ed21622/'} />;
		}

		return (
			<div>
				<p className="product-border-around">
					<div className="account-login-errors" />

					<form method="post" id="login-form">
						<label>Mobile number or Email Address</label>

						<div className="login-input-div">
							<i className="material-icons icon login-email-image">
								mail_outline
							</i>
							<input
								className="input-field input-field-login  required-entry validate-email"
								type="text"
								placeholder="Enter Mobile number or email address"
								title="Email Address"
								name="username"
								value={this.state.email}
								id="email"
								onChange={this.handleChange}
							/>
						</div>

						<label>Password</label>

						<div className="login-input-div">
							<i className="material-icons icon login-password-image">lock</i>
							<input
								className="input-field input-field-login required-entry validate-password login-password-showhide"
								type="password"
								placeholder="Password"
								name="password"
								id="loginPassword"
								title="Password"
								value={this.state.password}
								onChange={this.PasswordChange}
							/>
							<span
								className="sprites showHidePwd hidePwd"
								title="Show Password"
							/>
						</div>

						<div className="login-input-link-div">
							<div className="login-submit-div">
								<button
									id="loginAccountButton"
									type="button"
									title="Sign in"
									onClick={this.handleSubmitForm}
									// onClick={e => {
									// 	// loginPost(`${this.state.email}`,`${this.state.password}`);
									// 	handleSubmitForm();
									// }}
									className="orange-button gtmUserInfo"
								>
									<div id="buy-now">
										<span
											className="product-page-add-to-cart-button product-page-add-to-cart-text addToCartBtn productAddToCartText "
											data-content="bar"
										>
											Sign In
										</span>
									</div>
								</button>
							</div>
						</div>

						<div className="login-input-link-div">
							<div id="forgotpass">
								<NavLink
									to="#"
									// onClick="forgotpwd();"
									className="forgotpwd-login-link"
								>
									Forgot your password?
								</NavLink>
							</div>
						</div>
					</form>

					<form
						action="/customer/account/forgotpasswordpost/' ?>"
						method="post"
						id="form-validate-forgot"
					>
						<div className="no-display" id="forgotpassform">
							<div className="login-input-div">
								<i className="material-icons icon login-email-image">
									mail_outline
								</i>
								<input
									type="text"
									placeholder="Enter Mobile number or Email Address"
									name="forget_email"
									id="forgotbutton"
									title="Email Address"
									className="input-field input-field-login  required-entry validate-email"
								/>
							</div>

							<div className="login-input-link-div">
								<div className="right login-submit-div">
									<input
										id="forgetButton"
										className="forgotpassbutton orange-button left gtmUserInfo "
										type="submit"
										value="Get Your Password"
										name="send"
									/>
									<span className="arrow" />
								</div>
							</div>
						</div>
					</form>
				</p>

				<p className="login-account-create-label-p">
					<span className="login-account-create-label">
						Dont Have IndiaRush Account ?
					</span>
				</p>

				<p className="login-account-create-label-action-p">
					<div id="forgotpass">
						<span className="login-account-create">
							<NavLink to="/customer/account/create/">Create Account</NavLink>
						</span>
					</div>
				</p>
			</div>
		);
	}
}
