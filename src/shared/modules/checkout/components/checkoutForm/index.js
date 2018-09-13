import React from 'react';
import { themeSettings, text } from '../../../../lib/settings';
import CheckoutStepContacts from './stepContacts';
import CheckoutStepShipping from './stepShipping';
import CheckoutStepPayment from './stepPayment';

export default class CheckoutForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1
		};
		this.showPaymentMethod = this.showPaymentMethod.bind(this);
		this.getCityByPincode = this.getCityByPincode.bind(this);
		this.submitShipping = this.submitShipping.bind(this);
	}
	submitShipping(event)
	{
		event.preventDefault();
			var myForm = document.getElementById('submit');
			var formData = new FormData(myForm);
			if(formData.get('entity_id')=='new')
			{
				var url='https://indiarush.com/irapi/customer/postUserAddress/?customer_id=1280427'+'&firstname='+formData.get('name')+'&city='+formData.get('city')+'&street='+formData.get('address')+'&postcode='+formData.get('postal_code')+'&telephone='+formData.get('phone')+'&region='+formData.get('state')+'&version=3.99';
			}
			else {
				var url='https://indiarush.com/irapi/customer/postUserAddress/?customer_id=1280427'+'&entity_id='+formData.get('entity_id')+'&firstname='+formData.get('name')+'&city='+formData.get('city')+'&street='+formData.get('address')+'&postcode='+formData.get('postal_code')+'&telephone='+formData.get('phone')+'&region='+formData.get('state')+'&version=3.99';
			}
			fetch(url)
				.then(result => {
					return result.json();
				})
				.then(jsonResult => {
					console.log('vinay in update address');
					console.log(jsonResult);
					this.handleShippingSave();
				 this.props.loadShippingMethods();
				});

	}
	showPaymentMethod(evt,labelId,IconId,id,radiaId)
	{
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("checkout-payment-methods");
		for (i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("payMethodsLabel");
		var icons = document.getElementsByClassName("checkoutPayIcons");
		for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" payMethodsSel", "");
				icons[i].className = icons[i].className.replace(" sel", "");
		}
		document.getElementById(""+IconId).classList.add("sel");
		document.getElementById(""+labelId).classList.add("payMethodsSel");
		document.getElementById(""+radiaId).checked = true;
		document.getElementById(id).style.display = "block";
		// evt.currentTarget.className += " active";
  }
getCityByPincode(e)
{
	if (e.target.value.length == 6 &&	Number.isInteger(Number(e.target.value)))
	{
		fetch('https://indiarush.com/irapi/customer/getCityStateByPincode/?pincode='+e.target.value+'&version=3.87')
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				document.getElementById('city').value=jsonResult.data.city;
				document.getElementById('state').value=jsonResult.data.state;
			});
	}

}

	componentDidMount() {
		this.props.loadShippingMethods();
		this.props.loadPaymentMethods();
	}

	changeStep = step => {
		this.setState({ step: step });
	};

	handleContactsSave = () => {
		this.changeStep(2);
	};

	handleContactsEdit = () => {
		this.changeStep(1);
	};

	handleShippingSave = () => {
		this.changeStep(3);
	};

	handleShippingEdit = () => {
		this.changeStep(2);
	};

	handleContactsSubmit = values => {
		this.props.updateCart({
			email: values.email,
			mobile: values.mobile
		});
		this.handleContactsSave();
	};

	handleLocationSave = shippingLocation => {
		this.props.updateCart(
			{
				shipping_address: shippingLocation,
				billing_address: shippingLocation,
				payment_method_id: null,
				shipping_method_id: null
			},
			cart => {
				this.props.loadShippingMethods();
				this.props.loadPaymentMethods();
			}
		);
	};

	handleShippingMethodSave = shippingMethodId => {
		this.props.updateCart(
			{
				payment_method_id: null,
				shipping_methoCheckoutStepContactsd_id: shippingMethodId
			},
			cart => {
				this.props.loadPaymentMethods();
			}
		);
	};

	handlePaymentMethodSave = paymentMethodId => {
		this.props.updateCart({
			payment_method_id: paymentMethodId
		});
	};

	isShowPaymentForm = () => {
		const { payment_method_gateway } = this.props.state.cart;
		const paymentGatewayExists =
			payment_method_gateway && payment_method_gateway !== '';
		return paymentGatewayExists;
	};

	handleShippingSubmit = values => {
		if (this.isShowPaymentForm()) {
			const { shipping_address, billing_address, comments } = values;
			this.props.updateCart({
				shipping_address,
				billing_address,
				comments
			});
			this.handleShippingSave();
		} else {
			this.props.checkout(values);
		}

		this.handleShippingSave();
	};



	handleSuccessPayment = () => {
		this.props.checkout(null);
	};

	handleCheckoutWithToken = tokenId => {
		this.props.updateCart(
			{
				payment_token: tokenId
			},
			cart => {
				this.props.checkout(null);
			}
		);
	};

	render() {
		const { step } = this.state;

		const {
			settings,
			cart,
			paymentMethods,
			shippingMethods,
			loadingShippingMethods,
			loadingPaymentMethods,
			checkoutFields,
			processingCheckout
		} = this.props.state;
		console.log('vinay in checkout ');
		console.log(this.props.state);
		const {
			checkoutInputClass = 'checkout-field',
			checkoutButtonClass = 'checkout-button',
			checkoutEditButtonClass = 'checkout-button-edit'
		} = themeSettings;

		// for shipping initialValues
		let shippingAddressSel = null;
		if (shippingMethods && 	shippingMethods.length > 0) {
			let shippingAddress=[];
			shippingAddress.push(shippingMethods[0]);
		  shippingAddressSel=	shippingAddress.map((field, index) => {
				return {name:field.firstname,address:field.street,postal_code:field.postcode,city:field.city,state:field.region,phone:field.telephone,entity_id:field.entity_id
       };
				});
		}
		if(shippingAddressSel)
		{
			var shippignSelectAddress=shippingAddressSel[0];
		}
		else {
			var shippignSelectAddress={name:null,address:null,postal_code:null,city:null,state:null,phone:null,entity_id:null};
		}

		if (cart && cart.items.length > 0) {
			const showPaymentForm = this.isShowPaymentForm();

			let shippingMethod = null;
			const { shipping_method_id } = cart;
			return (
				<div className="checkout-form">
					<CheckoutStepContacts
						isReadOnly={step > 1}
						title={text.customerDetails}
						inputClassName={checkoutInputClass}
						buttonClassName={checkoutButtonClass}
						editButtonClassName={checkoutEditButtonClass}
						initialValues={cart}
						settings={settings}
						paymentMethods={paymentMethods}
						shippingMethods={shippingMethods}
						loadingShippingMethods={loadingShippingMethods}
						loadingPaymentMethods={loadingPaymentMethods}
						checkoutFields={checkoutFields}
						onEdit={this.handleContactsEdit}
						onSubmit={this.handleContactsSubmit}
						saveShippingLocation={this.handleLocationSave}
						saveShippingMethod={this.handleShippingMethodSave}
						savePaymentMethod={this.handlePaymentMethodSave}
						{...this.props}
						onSave={this.handleContactsSave}
					/>

					<CheckoutStepShipping
						show={step >= 2}
						isReadOnly={step > 2}
						title={text.checkoutSaveAddressTitle}
						inputClassName={checkoutInputClass}
						buttonClassName={checkoutButtonClass}
						editButtonClassName={checkoutEditButtonClass}
						initialValues={shippignSelectAddress}
						settings={settings}
						processingCheckout={processingCheckout}
						shippingMethod={this.props.state.shippingMethods}
						userSelectedAddress={this.props.state.userSelectedAddress}
						userSelectedAddressFun={this.props.setUserSelectedAddress}
						checkoutFields={checkoutFields}
						showPaymentForm={showPaymentForm}
						onSave={this.handleShippingSave}
						onEdit={this.handleShippingEdit}
						handleSubmit={this.submitShipping}
						getCityByPincode={this.getCityByPincode}
					/>

					{/*{showPaymentForm && (*/}
						<CheckoutStepPayment
							show={step === 3}
							title={text.payment}
							inputClassName={checkoutInputClass}
							buttonClassName={checkoutButtonClass}
							cart={cart}
							settings={settings}
							processingCheckout={processingCheckout}
							handleSuccessPayment={this.handleSuccessPayment}
							onCreateToken={this.handleCheckoutWithToken}
							showPaymentMethod={this.showPaymentMethod}
						/>
				{/*	)}*/}
				</div>
			);
		} else {
			return <p>
			{text.emptyCheckout}
			</p>;
		}
	}
}
