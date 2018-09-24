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
			creditCardList:[],
			debitCardList:[],
		};
		this.saveCard = this.saveCard.bind(this);
		this.getCardList = this.getCardList.bind(this);
	}


	componentDidMount()
	{

		this.getCardList();
	}

	getCardList()
	{
		if (
			this.props.state.isLoggedIn === 1 ||
			this.props.state.isLoggedIn === 2
		) {
				fetch(`https://indiarush.com/irapi/customer/getCardList/?customerId=${this.props.state.customerDetails.customer_id}&version=3.79`)
					.then(result => {
						return result.json();
					})
					.then(jsonResult => {
						this.setState({creditCardList:jsonResult.data.creditCardList});
						this.setState({debitCardList:jsonResult.data.debitCardList});
					});
     }

	}

	saveCard(event,paymentType)
	{
		event.preventDefault();
		if(paymentType=='creditCard')
		{
			const myForm = document.getElementById('submitCredit');
			const formData = new FormData(myForm);
			var url =`https://indiarush.com/irapi/customer/addNewCard/?customerId=1271489&paymentType=${paymentType}&expirationMonth=${formData.get('newccexpmon')}&expirationYear=${formData.get('newccexpyr')}&version=3.81&cardType=${formData.get('newcreditCards')}&cardNumber=${formData.get('newccnum')}&name=${formData.get('newccname')}`;

		}
		if(paymentType=='debitCard')
		{
			const myForm = document.getElementById('submitDebit');
			const formData = new FormData(myForm);
			var url =`https://indiarush.com/irapi/customer/addNewCard/?customerId=1271489&paymentType=${paymentType}&expirationMonth=${formData.get('newccexpmonDebit')}&expirationYear=${formData.get('newccexpyrDebit')}&version=3.81&cardType=${formData.get('newdebitCards')}&cardNumber=${formData.get('newccnumDebit')}&name=${formData.get('newccnameDebit')}`;
		}


//this.props.state.customerDetails.customer_id
    fetch(url)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				if(jsonResult.metadata.message == 'success')
				{
					 if(paymentType=='creditCard' && jsonResult.data.creditCardList.length > 0)
					 {
						 console.log('Credit card saved');
		 				console.log(jsonResult);

					 }
					 if(paymentType=='debitCard' && jsonResult.data.debitCardList.length > 0)
					 {
						 console.log('Debit card saved');
		 				console.log(jsonResult);
					 }

				}

			});
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

	if (
		this.props.state.isLoggedIn === 1 ||
		this.props.state.isLoggedIn === 2
	) {
	return (
		<div className="checkout-step newPadding">
		<div className="step-title">
			<h2 className="not-log-in-checkout-label">3. {title}</h2>
		</div>

{(this.props.state.isLoggedIn == 1 || this.props.state.isLoggedIn == 2) && (
			<div className="checkout-button-wrap">
				<div className="payment-form sp-methods" id="checkout-step-payment">
			   {this.props.state.paymentMethods.map(fields => (
					 	<div key={fields.code}>
						{fields.code=='irdebit' && (
							<DebitPaymentForm showPaymentMethod={showPaymentMethod} cart={cart} settings={settings} saveCard={this.saveCard}  debitCardList={this.state.debitCardList}/>
							)}
							{fields.code=='ircredit' && (
								<CreditPaymentForm showPaymentMethod={showPaymentMethod} cart={cart} settings={settings} saveCard={this.saveCard} creditCardList={this.state.creditCardList} />
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
	return (
		<div className="checkout-step">
			<h1>
				<span>3</span>
				{title}
			</h1>
		</div>
	);
	}

}

export default CheckoutStepPayment;
