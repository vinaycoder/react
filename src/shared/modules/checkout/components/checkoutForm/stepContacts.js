import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { text } from '../../../../lib/settings';
import { formatCurrency } from '../../../../lib/helper';
import InputField from './inputField';
import SocialLogin from '../../../customer/components/login/socialLogin';
// import FacebookLoginWrapper from '../../../customer/components/login/facebookLoginWrapper';
import OrDiv from '../../../customer/components/login/orDiv';

const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;

const validateEmail = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? text.emailInvalid
		: undefined;

const ReadOnlyField = ({ name, value }) => {
	return (
		<div className="checkout-field-preview">
			<div className="name">{name}</div>
			<div className="value">{value}</div>
		</div>
	);
};

class CheckoutStepContacts extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		var username = document.getElementById('userName').value;

		let postData;
		if (username) {
			postData = {
				type: 'checkout',
				username: username
			};
		}

		if (postData) {
			const result = Object.values(postData);
			this.props.createUserPost(result);
		}
	}

	componentDidMount() {
		if (this.props.state.customerDetails != null) {
			if (Object.keys(this.props.state.customerDetails).length > 0) {
				this.props.onSave();
			}
		}
	}
	getField = fieldName => {
		const fields = this.props.checkoutFields || [];
		const field = fields.find(item => item.name === fieldName);
		return field;
	};

	getFieldStatus = fieldName => {
		const field = this.getField(fieldName);
		return field && field.status ? field.status : 'required';
	};

	isFieldOptional = fieldName => {
		return this.getFieldStatus(fieldName) === 'optional';
	};

	isFieldHidden = fieldName => {
		return this.getFieldStatus(fieldName) === 'hidden';
	};

	getFieldValidators = fieldName => {
		const isOptional = this.isFieldOptional(fieldName);
		let validatorsArray = [];
		if (!isOptional) {
			validatorsArray.push(validateRequired);
		}
		if (fieldName === 'email') {
			validatorsArray.push(validateEmail);
		}

		return validatorsArray;
	};

	getFieldPlaceholder = fieldName => {
		const field = this.getField(fieldName);
		return field && field.placeholder && field.placeholder.length > 0
			? field.placeholder
			: '';
	};

	getFieldLabelText = fieldName => {
		const field = this.getField(fieldName);
		if (field && field.label && field.label.length > 0) {
			return field.label;
		} else {
			switch (fieldName) {
				case 'email':
					return text.email;
					break;
				case 'mobile':
					return text.mobile;
					break;
				case 'country':
					return text.country;
					break;
				case 'state':
					return text.state;
					break;
				case 'city':
					return text.city;
					break;
				default:
					return 'Unnamed field';
			}
		}
	};

	getFieldLabel = fieldName => {
		const labelText = this.getFieldLabelText(fieldName);
		return this.isFieldOptional(fieldName)
			? `${labelText} (${text.optional})`
			: labelText;
	};

	render() {
		const {
			handleSubmit,
			pristine,
			invalid,
			valid,
			reset,
			submitting,
			loadingShippingMethods,
			loadingPaymentMethods,
			initialValues,
			settings,
			saveShippingLocation,
			saveShippingMethod,
			savePaymentMethod,
			paymentMethods,
			shippingMethods,
			inputClassName,
			buttonClassName,
			editButtonClassName,
			onEdit,
			isReadOnly,
			title,
			loginPost,
			logoutPost,
			createUserPost,
			state: { isLoggedIn, statsCookieId, customerDetails }
		} = this.props;
		console.log('this.props in checkout');
		console.log(this.props);
		if (this.props.state.isLoggedIn == 1) {
			if (isReadOnly) {
				return (
					<div className="checkout-step">
						{!this.isFieldHidden('email') && (
							<div className="synopsis logged-synopsis newCartDesign">
								<div className="synopsisText">
									<div className="addNewHeadingCartPage">
										<h2 className="without_variation checkoutLogedUserDetails">
											Email Address
										</h2>
									</div>
									<strong>

										{this.props.state.isLoggedIn == 1 && (
											<span>{this.props.state.customerDetails.email}</span>
										)}
										{this.props.state.isLoggedIn == 1 && (
											<span>
												{' '}
												/ {this.props.state.customerDetails.telephone_number}
											</span>
										)}
									</strong>
								</div>
								<div className="synopsisText">
									We will send order details to this email address or mobile
									number
								</div>
							</div>
						)}
						{/*<ReadOnlyField name={text.email} value={initialValues.email} />*/}

						{this.props.state.isLoggedIn == 2 && (
							<div className="checkout-button-wrap">
								<button
									type="button"
									onClick={onEdit}
									className={editButtonClassName}
								>
									{text.edit}
								</button>
							</div>
						)}
					</div>
				);
			}
		}
		return (
			<div className="checkout-step newPadding">
				<div className="step-title">
					<h2 className="not-log-in-checkout-label">
						Enter Mobile Number or Email Address :
					</h2>
				</div>
				<div className="input-box">
					<label>
						We will use your Mobile Number or Email Address to send you order
						confirmation details
					</label>
				</div>
				<div className="checkoutFormContactDetailsPadding">
					<div className="checkout-field input-fields-2">
						<input name="userName" placeholder="" type="tel" id="userName" />
					</div>

					<div className="variation-checkout variation-login-message">
						<span>Example: example@example.com or 9999000099</span>
					</div>

					<div
						className="checkout-button-wrap"
						onClick={e => this.handleSubmit(e)}
					>
						<button
							type="submit"
							className={buttonClassName + ' checkoutLoginBtn'}
						>
							CONTINUE CHECKOUT{' '}
							<i className="material-icons">keyboard_arrow_right</i>
						</button>
					</div>

					<div className="tab-content-ruler">
						<OrDiv />
					</div>

					<div id="gSignInWrapper">
						<SocialLogin
							isLoggedIn={isLoggedIn}
							statsCookieId={statsCookieId}
							customerDetails={customerDetails}
							loginPost={loginPost}
							createUserPost={createUserPost}
						/>
					</div>

					<div className="login-input-link-div facebook-login-div" />
				</div>
			</div>
		);
	}
}

export default CheckoutStepContacts;
