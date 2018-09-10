import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
// import { themeSettings, text } from '../../lib/settings';
// import * as helper from '../../lib/helper';
import Register from './register';

export default class FormLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			data: [],
			forgetUser: '',
			forgotPasswordFormIsActive: false,
			createIsActive: false,
			signInIsActive: true
		};

		this.handleChange = this.handleChange.bind(this);
		this.PasswordChange = this.PasswordChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
		this.forgetUserChange = this.forgetUserChange.bind(this);

		// console.log('FormLogin this.props');
		// console.log(this.props);
		// console.log('FormLogin this.state');
		// console.log(this.state);
	}

	handleChange(event) {
		this.setState({ email: event.target.value });
	}

	forgetUserChange(event) {
		this.setState({ forgetUser: event.target.value });
	}

	PasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	submitForgotPasswordForm(event) {
		console.log('submitForgotPasswordForm state');
		console.log(this.state);

		if (this.state.forgetUser) {
			this.state.data.push(`${this.state.forgetUser}`);
			const version = 3.81;
			const isOtp = 0;

			fetch(
				`https://indiarush.com/irapi/customer/getforgotPasswordOtp/?email=${
					this.state.forgetUser
				}&version=${version}`
			)
				.then(result => result.json())
				.then(jsonResult => {
					console.log('submitForgotPasswordForm jsonResult');
					console.log(jsonResult);
				});

			event.preventDefault();
		}
	}

	handleSubmitForm(event) {
		this.state.data.push(`${this.state.email}`);
		this.state.data.push(`${this.state.password}`);
		this.props.loginPost(this.state.data);
	}

	forgotPasswordFormToggle = () => {
		this.setState({
			forgotPasswordFormIsActive: !this.state.forgotPasswordFormIsActive
		});
	};

	createFormToggle = () => {
		this.setState({
			createIsActive: !this.state.createIsActive,
			signInIsActive: !this.state.signInIsActive
		});
	};

	signInFormToggle = () => {
		this.setState({
			signInIsActive: !this.state.signInIsActive,
			createIsActive: !this.state.createIsActive
		});
	};

	// forgotPasswordFormShow = () => {
	// 	this.setState({
	// 		forgotPasswordFormIsActive: true
	// 	});
	// };

	componentDidMount() {
		console.log('componentDidMount Form Login');
		const { loginPost } = this.props;
		const { isLoggedIn, statsCookieId, customerDetails } = this.state;
		const statsCookieIdCookie = cookie.load('statsCookieId');

		let customerId = null;

		console.log('statsCookieIdCookie');
		console.log(statsCookieIdCookie.length);

		if (statsCookieIdCookie.length < 10) {
			customerId = statsCookieIdCookie;
		}

		// console.log("list.isLoggedIn");
		// console.log(list.isLoggedIn);

		// console.log('this.props');
		// console.log(this.props);
		// const viewedProducts = this.getArrayFromLocalStorage();
		// this.setState({ viewedProducts });
		//
		// if (product && product.id) {
		// 	this.addProductIdToLocalStorage(product.id);
		// }

		// const version = 3.81;

		// let username = 'abhinesh.yadav@indiarush.com';

		//  fetch(
		// 	`https://indiarush.com/irapi/customer/checkRegisteredUser/?username=${
		// 		username
		// 	}&version=${version}`
		// )
		// 	.then(result => result.json())
		// 	.then(jsonResult => {
		//
		// 		console.log("server side json for login");
		// 		console.log(jsonResult.data);
		//
		// 		if(jsonResult.data)
		// 		{
		// 				console.log("inside fetch data");
		// 					// this.props.loginPost(this.state.data);
		// 		}
		//
		// 		// return jsonResult.data;
		// 	});
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
		// console.log('in Form Login Render');
		//
		// console.log('state');
		// console.log(this.state);

		const { loginPost } = this.props;
		const { isLoggedIn, statsCookieId, customerDetails } = this.state;

		if (this.props.isLoggedIn == true) {
			return <Redirect to="/customer/account/login" />;
			// return <Redirect to={'/sarees-for-women/'} />;
			// return <Redirect to={'/cotton-silk-blue-printed-saree-ed21622/'} />;
		}

		return (
			<div>
				<p className="product-border-around">
					{
						<Register
							onClick={this.createFormToggle}
							createIsActive={this.state.createIsActive}
							loginPost={loginPost}
							isLoggedIn={isLoggedIn}
							statsCookieId={statsCookieId}
							customerDetails={customerDetails}
						/>
					}

					<form
						method="post"
						id="login-form"
						className={
							this.state.signInIsActive
								? 'sub-child-active'
								: 'sub-child-inactive'
						}
					>
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
									className="orange-button gtmUserInfo"
								>
									<span>Sign In</span>
								</button>
							</div>
						</div>

						<div className="login-input-link-div">
							<div id="forgotpass">
								<button
									id="loginAccountButton"
									type="button"
									title="Sign in"
									onClick={this.forgotPasswordFormToggle}
									forgotPasswordFormIsActive={
										this.state.forgotPasswordFormIsActive
									}
									className="orange-button gtmUserInfo"
								>
									<span>Forgot your password?</span>
								</button>
							</div>
						</div>
					</form>

					<form
						action="/customer/account/forgotpasswordpost/' ?>"
						method="post"
						id="form-validate-forgot"
					>
						<div
							className={
								this.state.forgotPasswordFormIsActive
									? 'sub-child-active'
									: 'sub-child-inactive'
							}
							id="forgotpassform"
						>
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
									value={this.state.forgetUser}
									onChange={this.forgetUserChange}
								/>
							</div>

							<div className="login-input-link-div">
								<div className="right login-submit-div">
									<button
										id="forgetButton"
										type="button"
										title="Get Your Password"
										onClick={this.submitForgotPasswordForm}
										className="forgotpassbutton orange-button left gtmUserInfo"
									>
										<span>Get Your Password</span>
									</button>
								</div>
							</div>
						</div>
					</form>
				</p>

				<div className="login-align-center">
					<p
						className={
							this.state.signInIsActive
								? 'sub-child-active'
								: 'sub-child-inactive'
						}
					>
						<span className="login-account-create-label">
							Dont Have IndiaRush Account ?
						</span>
					</p>

					<p
						className={
							this.state.signInIsActive
								? 'sub-child-active'
								: 'sub-child-inactive'
						}
					>
						<div id="forgotpass">
							<span className="login-account-create">
								<button
									id="createAccountButton"
									type="button"
									title="Create Account"
									onClick={this.createFormToggle}
									createIsActive={this.state.createIsActive}
									className="orange-button"
								>
									<span>Create Account</span>
								</button>
							</span>
						</div>
					</p>
				</div>

				<div className="login-align-center">
					<p
						// className="login-account-create-label-p"
						className={
							this.state.createIsActive
								? 'sub-child-active'
								: 'sub-child-inactive'
						}
					>
						<span className="login-account-create-label">
							Already part of IndiaRush ?
						</span>
					</p>

					<p
						className={
							this.state.createIsActive
								? 'sub-child-active'
								: 'sub-child-inactive'
						}
					>
						<div>
							<span className="login-account-signin-redirect">
								<button
									id="signInButton"
									type="button"
									title="Sign In"
									onClick={this.signInFormToggle}
									signInIsActive={this.state.signInIsActive}
									className="orange-button"
								>
									<span>Sign In</span>
								</button>
							</span>
						</div>
					</p>
				</div>
			</div>
		);
	}
}
