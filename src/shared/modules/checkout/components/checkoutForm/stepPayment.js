import React from 'react';
import { themeSettings, text } from '../../../../lib/settings';
import PaymentForm from './paymentForm';
import CodPaymentForm from './paymentForm/codPaymentForm';
import CreditPaymentForm from './paymentForm/creditPaymentForm';
import DebitPaymentForm from './paymentForm/debitPaymentForm';
import NetBankingPaymentForm from './paymentForm/netBankingPaymentForm';
import WalletPaymentForm from './paymentForm/walletPaymentForm';
class CheckoutStepPayment extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			irDabit: false,
			irCredit: false,
			irPayment: false,
			cod: false
		};
		this.someFunction=this.someFunction.bind(this);
	}
	componentDidMount()
	{

	}

	someFunction()
	{

	}
	render()
	{

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
		} = this.props;

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

{this.props.state.isLoggedIn == 1 && (
			<div className="checkout-button-wrap">
				<div className="payment-form sp-methods" id="checkout-step-payment">
			   {this.props.state.paymentMethods.map(fields => (
					 	<div key={fields.code}>
						{fields.code=='irdebit' && (
							<DebitPaymentForm showPaymentMethod={showPaymentMethod} cart={cart} settings={settings}  />
							)}
							{fields.code=='ircredit' && (
								<CreditPaymentForm showPaymentMethod={showPaymentMethod} cart={cart} settings={settings} />
								)}
								{fields.code=='irpayment' && (
									<NetBankingPaymentForm showPaymentMethod={showPaymentMethod} cart={cart} settings={settings}  />
									)}
									{fields.code=='cashondelivery' && (
										<CodPaymentForm showPaymentMethod={showPaymentMethod} cart={cart} settings={settings} />
										)}
						</div>

					 ))}
				<WalletPaymentForm showPaymentMethod={showPaymentMethod} cart={cart} settings={settings} />


				</div>
			</div>
)}
		</div>
	);
	}

}

export default CheckoutStepPayment;
