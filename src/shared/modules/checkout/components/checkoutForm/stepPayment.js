import React from 'react';
import { themeSettings, text } from '../../../../lib/settings';
import PaymentForm from './paymentForm';
import CodPaymentForm from './paymentForm/codPaymentForm';
import CreditPaymentForm from './paymentForm/creditPaymentForm';

import DebitPaymentForm from './paymentForm/debitPaymentForm';
import NetBankingPaymentForm from './paymentForm/netBankingPaymentForm';
import WalletPaymentForm from './paymentForm/walletPaymentForm';

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
		<div className="checkout-step newPadding">
		<div className="step-title">
			<h2 className="not-log-in-checkout-label">3. {title}</h2>
		</div>

			<div className="checkout-button-wrap">
				<div className="payment-form sp-methods" id="checkout-step-payment">

					<CodPaymentForm showPaymentMethod={showPaymentMethod} />

					<CreditPaymentForm showPaymentMethod={showPaymentMethod} />

					<DebitPaymentForm showPaymentMethod={showPaymentMethod} />

					<NetBankingPaymentForm showPaymentMethod={showPaymentMethod} />

					<WalletPaymentForm showPaymentMethod={showPaymentMethod} />

				</div>
			</div>
		</div>
	);
};

export default CheckoutStepPayment;
