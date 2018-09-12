import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			mobile_number: '',
			male: 2,
			female: 1,
			email: '',
			password: '',
			data: []
		};

		this.nameChange = this.nameChange.bind(this);
		this.mobilenumberChange = this.mobilenumberChange.bind(this);
		this.genderChange = this.genderChange.bind(this);
		this.emailChange = this.emailChange.bind(this);
		this.PasswordChange = this.PasswordChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
	}

	nameChange(event) {
		this.setState({ name: event.target.value });
	}

	mobilenumberChange(event) {
		this.setState({ mobile_number: event.target.value });
	}

	genderChange(event) {
		this.setState({ gender: event.target.value });
	}

	emailChange(event) {
		this.setState({ email: event.target.value });
	}

	PasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	handleSubmitForm(event) {
		this.state.data.push('Form');
		this.state.data.push(`${this.state.name}`);
		this.state.data.push(`${this.state.email}`);
		this.state.data.push(`${this.state.mobile_number}`);
		this.state.data.push(`${this.state.gender}`);
		this.state.data.push(`${this.state.password}`);
		this.props.createUserPost(this.state.data);
	}

	render() {
		const {
			onClick,
			loginPost,
			createIsActive,
			isLoggedIn,
			statsCookieId,
			customerDetails,
			createUserPost
		} = this.props;

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
						<i className="material-icons icon register-form-image">
							account_circle
						</i>
						<div className="left register-form-input">
							<input
								type="text"
								placeholder="Name"
								className="input-field signup-field-lname-input signup-input-field required-entry registerNameField"
								title="Name"
								value={this.state.name}
								name="firstname"
								id="firstname"
								autoComplete="on"
								onChange={this.nameChange}
							/>
						</div>
						<div className="clear" />
					</div>

					<label>Email</label>
					<div className="login-input-div account-create-name">
						<i className="material-icons icon register-form-image">email</i>
						<div className="left register-form-input">
							<input
								type="text"
								placeholder="Email Address"
								name="email"
								id="email_address"
								className="input-field signup-input-field validate-email required-entry"
								title="Email Address"
								value={this.state.email}
								onChange={this.emailChange}
							/>
						</div>
						<div className="clear" />
					</div>

					<label>Mobile Number</label>
					<div className="login-input-div account-create-full-field">
						<i className="material-icons icon register-form-image">
							phone_iphone
						</i>
						<div className="left register-form-input">
							<input
								type="tel"
								placeholder="Enter Your Mobile Number"
								name="telephone_number"
								id="telephone_number"
								title="Enter Your Mobile Number"
								className="input-field required-entry signup-input-field validate-numeric"
								maxLength="10"
								value={this.state.mobile_number}
								onChange={this.mobilenumberChange}
							/>
							<div className="clear" />
						</div>
						<div className="clear" />
					</div>

					<div className="clear" />
					<label>Gender</label>
					<div className="login-input-div">
						<div className="signup-gender-container left">
							<div className="signup-gender-male-container">
								<input
									className="input-field validate-one-required signup-radio-button signup-female-radio"
									type="radio"
									name="gender"
									title="Gender"
									value={this.state.male}
									onChange={this.genderChange}
								/>
								<span className="signup-gender-span signup-female-span">
									Female
								</span>

								<input
									className="input-field signup-radio-button signup-male-radio"
									type="radio"
									name="gender"
									value={this.state.female}
									title="Gender"
									onChange={this.genderChange}
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
						<i className="material-icons icon register-form-image">lock</i>
						<div className="left register-form-input">
							<input
								type="password"
								placeholder="Choose a Password"
								name="password"
								id="password"
								title="Choose a Password"
								className="input-field required-entry  signup-input-field validate-password"
								readOnly=""
								value={this.state.password}
								onChange={this.PasswordChange}
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
								type="button"
								value="Create Account"
								onClick={this.handleSubmitForm}
							/>
						</div>
					</div>
				</div>
			</form>
		);
	}
}
