import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { text } from '../../../../lib/settings';
import InputField from './inputField';
import TextareaField from './textareaField';

const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;

const getFieldLabelByKey = key => {
	switch (key) {
		case 'full_name':
			return text.fullName;
		case 'address1':
			return text.address1;
		case 'address2':
			return text.address2;
		case 'postal_code':
			return text.postal_code;
		case 'phone':
			return text.phone;
		case 'company':
			return text.company;
		default:
			return '';
	}
};

const getFieldLabel = field => {
	const label =
		field.label && field.label.length > 0
			? field.label
			: getFieldLabelByKey(field.key);
	return field.required === true ? label : `${label} (${text.optional})`;
};

class CheckoutStepShipping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			billingAsShipping: true
		};
		this.addActiveClass=this.addActiveClass.bind(this);
	}
	addActiveClass(e,id)
	{
		var i, tabcontent, tablinks;
		tablinks = document.getElementsByClassName("checkoutAddresses");
		for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" address-active", "");
		}
		document.getElementById("div"+id).classList.add("address-active");

  }
	onChangeBillingAsShipping = event => {
		this.setState({
			billingAsShipping: event.target.checked
		});
	};

	render() {
		const {
			handleSubmit,
			pristine,
			invalid,
			valid,
			reset,
			submitting,
			processingCheckout,
			initialValues,
			shippingMethod,
			checkoutFields,
			settings,
			inputClassName,
			buttonClassName,
			editButtonClassName,
			title,
			show,
			isReadOnly,
			showPaymentForm,
			onEdit,
			getCityByPincode,
			onSubmit
		} = this.props;

		const hideBillingAddress = settings.hide_billing_address === true;
		const commentsField = checkoutFields.find(f => f.name === 'comments');
		const commentsFieldPlaceholder =
			commentsField &&
			commentsField.placeholder &&
			commentsField.placeholder.length > 0
				? commentsField.placeholder
				: '';
		const commentsFieldLabel =
			commentsField && commentsField.label && commentsField.label.length > 0
				? commentsField.label
				: text.comments;
		const commentsFieldStatus =
			commentsField && commentsField.status.length > 0
				? commentsField.status
				: null;
		const commentsValidate =
			commentsFieldStatus === 'required' ? validateRequired : null;
		const hideCommentsField = commentsFieldStatus === 'hidden';

		if (!show) {
			return (
				<div className="checkout-step">
					<h1>
						<span>2</span>
						{title}
					</h1>
				</div>
			);
		} else if (isReadOnly) {
			console.log('readonly');
			console.log(initialValues);
			console.log(shippingMethod);
			let shippingFields = null;
			if (
				shippingMethod &&
				shippingMethod.length > 0
			) {
				let shippingAddress=[];
				shippingAddress.push(shippingMethod[shippingMethod.length-1]);
				shippingFields = shippingMethod.map((field, index) => {
					return (
						<div key={index} className="checkout-field-preview--old">

						<div className="checkoutAddresses checkoutAddress948949" id={"div"+index} >
					    <div className="checkout-address-radio billing-checkout-address-wrapper" id={field.entity_id}>
					        <div style={{fontWeight:'bold'}}>
					            <input type="radio" name="checkout-address" id={index} defaultValue={field.entity_id} />&nbsp; Address&nbsp;{index+1}
					         </div>
					    <label name="checkout-address-label" htmlFor={index} style={{float:'left'}} onClick={e=>this.addActiveClass(e,index)}>
					        {field.firstname} , {field.street} , {field.city}, {field.region} {field.postcode}, India
					    </label>

					        <div className="clear"></div>

					    </div>
					    <div className="editAddressCheckout">
					        <span id="checkoutEditAddress948949" className="checkoutEditAddress" onClick={e=>editAddress(948949)} style={{display: 'inline'}}>Edit Address</span>
					        <span id="checkoutCancelEditAddress948949" className="checkoutCancelEditAddress" onClick={e=>billing.cancelEditAddress(948949)} style={{display: 'none'}}>Cancel</span>
					    </div>
					</div>
						{/*
						<div className="checkout-field-preview">
							<div className="name">Name</div>
							<div className="value">{field.firstname}</div>
						</div>
						<div className="checkout-field-preview">
							<div className="name">Address</div>
							<div className="value">{field.street}</div>
						</div>

							<div className="checkout-field-preview">
								<div className="name">Pincode</div>
								<div className="value">{field.postcode}</div>
							</div>
							<div className="checkout-field-preview">
								<div className="name">City</div>
								<div className="value">{field.city}</div>
							</div>
							<div className="checkout-field-preview">
								<div className="name">State</div>
								<div className="value">{field.region}</div>
							</div>

							<div className="checkout-field-preview">
							<div className="name">Mobile</div>
							<div className="value">{field.telephone}</div>
							</div>
							*/}


						</div>
					);

				});
			}



			return (
				<div className="checkout-step">
					<h1>
						<span>1. </span>
						{title}
					</h1>
					{shippingFields}


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
		} else {
			let shippingFields = null;
			if (
				shippingMethod &&
				shippingMethod.fields &&
				shippingMethod.fields.length > 0
			) {
				shippingFields = shippingMethod.fields.map((field, index) => {
					const fieldLabel = getFieldLabel(field);
					const fieldId = `shipping_address.${field.key}`;
					const fieldClassName = `${inputClassName} shipping-${field.key}`;
					const validate = field.required === true ? validateRequired : null;

					return (
						<Field
							key={index}
							className={fieldClassName}
							name={fieldId}
							id={fieldId}
							component={InputField}
							type="text"
							label={fieldLabel}
							validate={validate}
						/>
					);
				});
			}

			return (
			<div className="checkout-step newPadding">
				<div className="step-title">
					<h2 className="not-log-in-checkout-label">1. {title}</h2>
				</div>

				<form onSubmit={handleSubmit} className="checkoutFormContactDetailsPadding">
					{shippingFields}

					<div>
					<Field
						className={inputClassName + ' billing-fullname'}
						name="billing_address.name"
						id="billing_address.name"
						component={InputField}
						type="text"
						label={text.fullName}
						validate={[validateRequired]}
					/>
						<Field
							className={inputClassName + ' billing-address1'}
							name="billing_address.address"
							id="billing_address.address"
							component={TextareaField}
							type="text"
							label={text.address1 + ` (${text.required2})`}
							placeholder={commentsFieldPlaceholder}
							validate={validateRequired}
							rows="3"
						/>

						<Field
							className={inputClassName + ' billing-postalcode'}
							name="billing_address.postal_code"
							id="billing_address.postal_code"
							component={InputField}
							type="text"
							label={text.postal_code + ` (${text.required2})`}
							validate={[validateRequired]}
							onChange={e=>getCityByPincode(e)}
						/>
						<Field
							className={inputClassName + ' billing-city'}
							name="billing_address.city"
							id="billing_address.city"
							component={InputField}
							type="text"
							label={text.city + ` (${text.required2})`}
							validate={[validateRequired]}
							readOnly={'readOnly'}
						/>
						<Field
							className={inputClassName + ' billing-state'}
							name="billing_address.state"
							id="billing_address.state"
							component={InputField}
							type="text"
							label={text.state + ` (${text.required2})`}
							validate={[validateRequired]}
							readOnly={'readOnly'}
						/>

						<Field
							className={inputClassName + ' billing-phone'}
							name="billing_address.phone"
							id="billing_address.phone"
							component={InputField}
							type="text"
							label={text.phone + ` (${text.required2})`}
							validate={[validateRequired]}
						/>
					</div>

					{/* )} */}
					{/*)}*/}

					<div className="checkout-button-wrap">
						<button
							type="submit"
							className={
								`${buttonClassName}${
									processingCheckout ? ' is-loading' : ''
								}` + ' checkoutLoginBtn'
							}
						>
							{showPaymentForm ? text.next : text.saveAddress}{' '}
							<i className="material-icons">keyboard_arrow_right</i>
						</button>
					</div>
				</form>
			</div>
		);
		}
	}
}

export default reduxForm({
	form: 'CheckoutStepShipping',
	enableReinitialize: true,
	keepDirtyOnReinitialize: false
})(CheckoutStepShipping);
