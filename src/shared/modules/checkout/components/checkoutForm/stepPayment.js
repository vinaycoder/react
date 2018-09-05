import React from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { themeSettings, text } from '../../../../lib/settings';
import PaymentForm from './paymentForm';

const CheckoutStepPayment = props => {
	const {
		cart,
		settings,
		processingCheckout,
		handleSuccessPayment,
		inputClassName,
		buttonClassName,
		show,
		title,
		onCreateToken,
		showPaymentMethod
	} = props;


	const { payment_method_gateway, grand_total } = cart;

	if (!show) {
		return (
			<div className="checkout-step">
				<h1>
					<span>3</span>
					{title}
				</h1>
			</div>
		);
	}
	return (
		<div className="checkout-step">
			<h1>
				<span>3</span>
				{title}
			</h1>
			<div className="checkout-button-wrap">
				<div className="payment-form">

			<div style={{display:'flex'}}>

						<div className="tab">
							<button className="tablinks active" onClick={e => showPaymentMethod(e, 'London')} id="defaultOpen">Cod</button>
							<button className="tablinks" onClick={e => showPaymentMethod(e, 'Paris')}>Net Banking</button>
							<button className="tablinks" onClick={e => showPaymentMethod(e, 'Tokyo')}>Credit Card</button>
						</div>

					 <div id="London" className="tabcontent displayBlock">
						<h3>Cod</h3>
						</div>

						<div id="Paris" className="tabcontent displayNone">
						<h3>Net Banking</h3>
						</div>

						<div id="Tokyo" className="tabcontent displayNone">
						<h3>Credit Card</h3>
						</div>

					</div>




				</div>
			</div>
		</div>
	);
};

export default CheckoutStepPayment;
