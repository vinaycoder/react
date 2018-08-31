import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import { formatCurrency } from '../../lib/helper';
import InputField from './inputField';

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
			title
		} = this.props;

		if (isReadOnly) {
			return (
				<div className="checkout-step">
				<div className="step-title">
						<h2 className="not-log-in-checkout-label">
							Enter Mobile Number or Email Address :
						</h2>
					</div>

					{!this.isFieldHidden('email') && (
						<ReadOnlyField name={text.email} value={initialValues.email} />
					)}
					{!this.isFieldHidden('mobile') && (
						<ReadOnlyField name={text.mobile} value={initialValues.mobile} />
					)}
					{!this.isFieldHidden('country') && (
						<ReadOnlyField
							name={text.country}
							value={initialValues.shipping_address.country}
						/>
					)}
					{!this.isFieldHidden('state') && (
						<ReadOnlyField
							name={text.state}
							value={initialValues.shipping_address.state}
						/>
					)}
					{!this.isFieldHidden('city') && (
						<ReadOnlyField
							name={text.city}
							value={initialValues.shipping_address.city}
						/>
					)}
					<ReadOnlyField
						name={text.shippingMethod}
						value={initialValues.shipping_method}
					/>
					<ReadOnlyField
						name={text.paymentMethod}
						value={initialValues.payment_method}
					/>

					<div className="checkout-button-wrap">
						<button
							type="button"
							onClick={onEdit}
							className={editButtonClassName}
						>
							{text.edit}
						</button>
					</div>
				</div>
			);
		}
			return (
				<div className="checkout-step newPadding">
						<div className="step-title">
								<h2 className="not-log-in-checkout-label">
									Enter Mobile Number or Email Address :
								</h2>
							</div>
							<div className="input-box">
								<label>We will use your Mobile Number or Email Address to send you order confirmation details
								</label>
							</div>
					<form onSubmit={handleSubmit} className="checkoutFormContactDetailsPadding">

						{!this.isFieldHidden('mobile') && (
						<Field
							className={inputClassName + ' input-fields-2'}
							name="mobile"
							id="customer.mobile"
							component={InputField}
							type="tel"
							validate={this.getFieldValidators('mobile')}
							placeholder={this.getFieldPlaceholder('mobile')}
						/>
						)}
						<div className="variation-checkout variation-login-message">
              <span >Example: example@example.com or 9999000099</span>
            </div>

						<div className="checkout-button-wrap">
							<button
								type="submit"
								disabled={invalid}
								className={buttonClassName}
							>
								{text.next}
							</button>
						</div>
					</form>
				</div>
			);

	}
}

export default reduxForm({
	form: 'CheckoutStepContacts',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(CheckoutStepContacts);
