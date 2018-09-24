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
			billingAsShipping: true,
			name:null,
			address:null,
			postal_code:null,
			city:null,
			state:null,
			phone:null,
			entity_id:null,
			newAddress:false,
			showShippingReadonly:false
		};
		this.addActiveClass=this.addActiveClass.bind(this);
		this.setShippingAddress=this.setShippingAddress.bind(this);
		this.editAddress=this.editAddress.bind(this);
		this.newAddress=this.newAddress.bind(this);
		this.cancelEditAddress=this.cancelEditAddress.bind(this);
	}

	componentDidMount() {
		if(this.props.state.isLoggedIn == 0)
		{
			this.setState({newAddress:true});
		}	

		this.setShippingAddress(this.props.initialValues);
	}

	setShippingAddress(data)
	{
		this.props.userSelectedAddressFun(data);
		this.setState({name: data.name});
		this.setState({address: data.address});
		this.setState({postal_code: data.postal_code});
		this.setState({city: data.city});
		this.setState({state: data.state});
		this.setState({phone: data.phone});
		this.setState({entity_id: data.entity_id});

	}

	addActiveClass(e,id,shippingD,addressId)
	{
		var i, tabcontent, tablinks;
		tablinks = document.getElementsByClassName("checkoutAddresses");
		for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" address-active", "");
		}
		document.getElementById("div"+id).classList.add("address-active");
		document.getElementById("div-new-address").className = document.getElementById("div-new-address").className.replace(" address-active", "");
    this.setShippingAddress(shippingD);
		this.setState({newAddress:false});
		document.getElementById('divUpdateAddress').style.display='none';
  }



	editAddress(e,id,shippingD,addressId)
	{
		var i, tabcontent, tablinks;
		tablinks = document.getElementsByClassName("checkoutAddresses");
		for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" address-active", "");
		}
		document.getElementById("div"+id).classList.add("address-active");
		document.getElementById("div-new-address").className = document.getElementById("div-new-address").className.replace(" address-active", "");
		document.getElementById(""+id).checked=true;
	 this.setShippingAddress(shippingD);
	 this.props.onEdit();
	 this.setState({newAddress:false});
	 this.setState({showShippingReadonly:true});
	 document.getElementById('divSavedAddressList').style.display='none';
	 document.getElementById('divUpdateAddress').style.display='block';
	}

	newAddress()
	{
		var i, tabcontent, tablinks;
		tablinks = document.getElementsByClassName("checkoutAddresses");
		for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" address-active", "");
		}
		document.getElementById("div-new-address").classList.add("address-active");
		document.getElementById("new-address").checked=true;
		this.setState({newAddress:true});
		this.setState({showShippingReadonly:false});
		this.props.onEdit();
	}

	cancelEditAddress()
	{
		 document.getElementById('divSavedAddressList').style.display='block';
		 	 document.getElementById('divUpdateAddress').style.display='none';
		// this.props.onSave();
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
			onSubmit,
			userSelectedAddress
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
				? commentsField.statusshippingMethod.length-1===index
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

			return (
				<div className="checkout-step" >
					<h1>
						<span>1. </span>
						{title}
					</h1>

							<div className="ShippingReadOnly1" style={{display:'block'}}>
							<label name="checkout-address-label" style={{float:'left'}} >
									{userSelectedAddress.name} , {userSelectedAddress.address} , {userSelectedAddress.city}, {userSelectedAddress.state} {userSelectedAddress.postal_code}, India
							</label>
							</div>
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
							shippingMethod.length > 0 && (this.props.state.isLoggedIn == 1 || this.props.state.isLoggedIn == 2)
						) {
							let shippingAddress=[];
							shippingAddress.push(shippingMethod[0]);
							shippingFields = shippingMethod.map((field, index) => {
								var checked="";
								var ActiveClas="";
								//if(userSelectedAddress.entity_id == field.entity_id )
								if(index === 0 )
								{
									 checked="checked";
									 ActiveClas="address-active";
								}
								var shippingD= {name:field.firstname,address:field.street,postal_code:field.postcode,city:field.city,state:field.region,phone:field.telephone,entity_id:field.entity_id
							 };
								return (
									<div key={index} className="checkout-field-preview--old">

									<div className={"checkoutAddresses " +ActiveClas} id={"div"+index} >
								    <div className="checkout-address-radio billing-checkout-address-wrapper" id={field.entity_id}>
								        <div style={{fontWeight:'bold'}}>
								            <input type="radio" defaultChecked={checked} name="checkout-address" id={index} defaultValue={field.entity_id} />&nbsp; Address&nbsp;{index+1}
								         </div>
								    <label name="checkout-address-label" htmlFor={index} style={{float:'left'}} onClick={e=>this.addActiveClass(e,index,shippingD,field.entity_id)}>
								        {field.firstname} , {field.street} , {field.city}, {field.region} {field.postcode}, India
								    </label>

								        <div className="clear"></div>

								    </div>
								    <div className="editAddressCheckout">
								        <span id="checkoutEditAddress948949" className="checkoutEditAddress" onClick={e=>this.editAddress(e,index,shippingD,field.entity_id)} style={{display: 'inline'}}>Edit Address</span>
								        <span id="checkoutCancelEditAddress948949" className="checkoutCancelEditAddress" onClick={e=>billing.cancelEditAddress(948949)} style={{display: 'none'}}>Cancel</span>
								    </div>
								</div>

									</div>
								);

							});
						}

			return (
			<div className="checkout-step newPadding">
				<div className="step-title">
					<h2 className="not-log-in-checkout-label">1. {title}</h2>
				</div>

				<div className="checkoutFormContactDetailsPadding" id="divSavedAddressList">
									{shippingFields}

									<div className="checkout-button-wrap">
									{(this.props.state.isLoggedIn == 1 || this.props.state.isLoggedIn == 2) && (

									<div className="checkoutAddresses" onClick={e=>this.newAddress()}>
											<div className="checkout-address-radio billing-checkout-address-wrapper has-text-left" id="div-new-address">
													<div>
															<input type="radio" name="checkout-address" id="new-address" value="new-address" />&nbsp; New Address
													</div>
													<label name="checkout-address-label" htmlFor="new-address"></label>
													<div className="clear"></div>
											</div>
									</div>
									)}
									</div>
				</div>

				<form onSubmit={e=>handleSubmit(e)} className="checkoutFormContactDetailsPadding" id="submit" name="submit">

				{this.state.newAddress ? (
						<div>

						<input type="hidden" id="entity_id" name="entity_id" defaultValue="new"/>
						<div className="checkout-field billing-fullname">
						<label htmlFor="name">Name ( Required )</label>
						<input name="name" type="text" id="name" className="" />
						</div>
						<div className="checkout-field billing-address1">
						<label htmlFor="address">Address ( Required )</label>
						<textarea name="address" rows="3" id="address" className="">
						</textarea>
						</div>
						<div className="checkout-field billing-postalcode">
						<label htmlFor="postal_code">Pin Code  ( Required )</label>
						<input name="postal_code" type="text" id="postal_code" onChange={e=>getCityByPincode(e)} className=""/>
						</div>
						<div className="checkout-field billing-city">
						<label htmlFor="city">City ( Required )</label>
						<input name="city" type="text" id="city" readOnly className="" />
						</div>
						<div className="checkout-field billing-state">
						<label htmlFor="state">State ( Required )</label>
						<input name="state" type="text" id="state" readOnly className="" />
						</div>
						<div className="checkout-field billing-phone">
						<label htmlFor="phone">Mobile Number (10 digits only) ( Required )</label>
						<input name="phone" type="text" id="phone" className="" />
						</div>
						</div>
						) : (

							<div>
							{this.state.showShippingReadonly && (
								<div id="divUpdateAddress">

							<div className={"checkoutAddresses address-active"} >
								<div className="checkout-address-radio billing-checkout-address-wrapper">
										<div style={{fontWeight:'bold'}}>
												<input type="radio" defaultChecked="checked" name="checkout-address"  defaultValue={this.state.entity_id} />&nbsp; Address&nbsp;
										 </div>
								<label name="checkout-address-label" style={{float:'left'}} >
										{this.state.name} , {this.state.address} , {this.state.city}, {this.state.state} {this.state.postal_code}, India
								</label>
										<div className="clear"></div>
								</div>
								<div className="editAddressCheckout">
								<span id="checkoutCancelEditAddress948949" className="checkoutCancelEditAddress" onClick={e=>this.cancelEditAddress()} >Cancel</span>
								</div>
						</div>



							<input type="hidden" id="entity_id" name="entity_id" defaultValue={this.state.entity_id} />
							<div className="checkout-field billing-fullname">
							<label htmlFor="name">Name ( Required )</label>
							<input name="name" type="text" id="name" className="" defaultValue={this.state.name} />
							</div>
							<div className="checkout-field billing-address1">
							<label htmlFor="address">Address ( Required )</label>
							<textarea name="address" rows="3" id="address" className="" defaultValue={this.state.address}>
							</textarea>
							</div>
							<div className="checkout-field billing-postalcode">
							<label htmlFor="postal_code">Pin Code  ( Required )</label>
							<input name="postal_code" type="text" id="postal_code" defaultValue={this.state.postal_code} onChange={e=>getCityByPincode(e)} className=""/>
							</div>
							<div className="checkout-field billing-city">
							<label htmlFor="city">City ( Required )</label>
							<input name="city" type="text" id="city" readOnly className="" defaultValue={this.state.city} />
							</div>
							<div className="checkout-field billing-state">
							<label htmlFor="state">State ( Required )</label>
							<input name="state" type="text" id="state" readOnly className="" defaultValue={this.state.state} />
							</div>
							<div className="checkout-field billing-phone">
							<label htmlFor="phone">Mobile Number (10 digits only) ( Required )</label>
							<input name="phone" type="text" id="phone" className="" defaultValue={this.state.phone} />
							</div>

							</div>

								)}
							</div>


						)}

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

export default CheckoutStepShipping
