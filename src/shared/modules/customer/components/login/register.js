import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

import { Field, reduxForm } from 'redux-form';
import { text } from '../../../../lib/settings';
import InputField from '../../../checkout/components/checkoutForm/inputField';
import TextareaField from '../../../checkout/components/checkoutForm/textareaField';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			registerData: []
		};

		// const { onClick, loginPost, signInIsActive, createIsActive, forgotPasswordFormIsActive } = this.props;
		// this.handleChange = this.handleChange.bind(this);
		// this.PasswordChange = this.PasswordChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);

		// console.log('FormLogin this.props');
		// console.log(this.props);
		// console.log('FormLogin this.state');
		// console.log(this.state);
	}

	handleChange(event) {
		this.setState({ email: event.target.value });
	}

	handleSubmitForm(event) {
		this.state.data.push(`${this.state.email}`);
		this.state.data.push(`${this.state.password}`);
		// this.props.loginPost(this.state.data);
	}

	// createFormToggle = () => {
	// 	this.setState({
	// 		createIsActive: !this.state.createIsActive,
	// 		signInIsActive: !this.state.signInIsActive
	// 	});
	// };

	render() {
		const {
			onClick,
			loginPost,
			createIsActive,
			isLoggedIn,
			statsCookieId,
			customerDetails
		} = this.props;

		// console.log('in Register Render');

		// console.log('props');
		// console.log(this.props);

		// const { isLoggedIn, statsCookieId, customerDetails } = this.state;

		return (
			<form
				action="https://indiarush.com/customer/account/createpost/"
				method="post"
				id="form-validate"
				className={
					this.props.createIsActive ? 'sub-child-active' : 'sub-child-inactive'
				}
			>
				<div>
					<label>Name</label>
					<div className="login-input-div account-create-name">
						<span className="login-people-image" />
						<div className="left login-input-div-block1 signUpNameDiv">
							<input
								type="text"
								placeholder="Name"
								className="input-field signup-field-lname-input signup-input-field required-entry registerNameField"
								title="Name"
								value=""
								name="firstname"
								id="firstname"
								autoComplete="on"
							/>
						</div>
						<div className="clear" />
					</div>

					<label>Email</label>
					<div className="login-input-div account-create-full-field">
						<span className="login-email-image" />
						<div className="left">
							<input
								type="text"
								placeholder="Email Address"
								name="email"
								id="email_address"
								className="input-field signup-input-field validate-email required-entry"
								title="Email Address"
								value=""
							/>

							<div className="clear" />
						</div>
					</div>

					<label>Mobile Number</label>
					<div className="login-input-div account-create-full-field">
						<span className="login-mobile-image" />
						<div className="left">
							<input
								onKeyPress="return isNumber(event)"
								type="tel"
								placeholder="Enter Your Mobile Number"
								name="telephone_number"
								id="telephone_number"
								title="Enter Your Mobile Number"
								className="input-field required-entry signup-input-field validate-numeric"
								maxLength="10"
								value=""
							/>
							<div className="clear" />
						</div>
						<div className="clear" />
					</div>

					<div className="clear" />
					<label>Gender</label>
					<div className="login-input-div">
						<div className="signup-gender-image left" />
						<div className="signup-gender-container left">
							<div className="signup-gender-male-container">
								<input
									className="input-field validate-one-required signup-radio-button signup-female-radio"
									type="radio"
									name="gender"
									value="2"
									title="Gender"
								/>
								<span className="signup-gender-span signup-female-span">
									Female
								</span>

								<input
									className="input-field signup-radio-button signup-male-radio"
									type="radio"
									name="gender"
									value="1"
									title="Gender"
								/>
								<span className="signup-gender-span signup-male-span">
									Male
								</span>
							</div>
						</div>
						<div className="clear" />
					</div>

					<label>Password</label>
					<div className="login-input-div account-create-full-field">
						<span className="login-password-image" />
						<div className="left">
							<input
								type="password"
								placeholder="Choose a Password"
								name="password"
								id="password"
								title="Choose a Password"
								className="input-field required-entry  signup-input-field validate-password"
								readOnly=""
								onFocus="this.removeAttribute('readonly');"
							/>
							<div className="clear" />
						</div>
						<div className="clear" />
					</div>

					<div className="login-input-link-div">
						<div className="right login-submit-div">
							<input
								id="createAccountButton"
								className="orange-button left gtmUserInfo"
								type="submit"
								value="Create Account"
							/>
						</div>
					</div>
				</div>
			</form>
		);
	}
}
