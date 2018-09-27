import React from 'react';
import { themeSettings, text } from '../../../../lib/settings';
import PaymentForm from './paymentForm';
import cookie from 'react-cookies';
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
			currentOrderId:null
		};
		this.saveCard = this.saveCard.bind(this);
		this.getCardList = this.getCardList.bind(this);
		this.codOrder = this.codOrder.bind(this);
		this.createOrder = this.createOrder.bind(this);
		this.goTo = this.goTo.bind(this);
	}


	componentDidMount()
	{
		this.getCardList();
	}
goTo()
{
	this.props.history.push('/checkout-success');

}

	createOrder(methodId)
	{
		const quoteId = cookie.load('userQuoteId');
	fetch(`https://indiarush.com/irapi/checkout/setPaymentMethod/?quoteId=${quoteId}&method=${methodId}&version=3.79`)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				console.log('set address fffffffffffffff');
				if(jsonResult.status=='true')
				{

				}
			});

			fetch(`https://indiarush.com/irapi/checkout/createOrder/?quoteId=${quoteId}&version=3.79`)
					.then(result => {
						return result.json();
					})
					.then(jsonResult => {
						if(jsonResult)
						{
							console.log('in create order ppppppppppppppppp');
							console.log(jsonResult);
							this.setState({currentOrderId:jsonResult});
							if(methodId=='cashondelivery')
							{
								this.codOrder();
							}

						}
					});
	}

	codOrder()
	{
		if(this.state.currentOrderId!=null || this.state.currentOrderId!='')
		{
			this.props.currentOrder(this.state.currentOrderId);
			this.props.history.push('/checkout-success');

		}
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
			var cardType=formData.get('newcreditCards');
			var sentCardType='';
			if(cardType=='CC')
			{
				sentCardType='Visa/Master Card';
			}
			else if(cardType=='AMEX')
			{
				sentCardType='AMEX Cards';
			}else if(cardType=='DINR')
			{
				sentCardType='Diners';
			}
			var url =`https://indiarush.com/irapi/customer/addNewCard/?customerId=${this.props.state.customerDetails.customer_id}&paymentType=${paymentType}&expirationMonth=${formData.get('newccexpmon')}&expirationYear=${formData.get('newccexpyr')}&version=3.81&cardType=${sentCardType}&cardNumber=${formData.get('newccnum')}&name=${formData.get('newccname')}`;

		}
		if(paymentType=='debitCard')
		{
			const myForm = document.getElementById('submitDebit');
			const formData = new FormData(myForm);
			var sentCardType='';
			var cardType=formData.get('newdebitCards');
			if(cardType=='VISA')
			{
				sentCardType='Visa Cards';
			}
			else if(cardType=='MAST')
			{
				sentCardType='Master Card';
			}else if(cardType=='SMAE')
			{
				sentCardType='SBI Maestro';
			}
			else if(cardType=='MAES')
			{
				sentCardType='Other Maestro';
			}
			else if(cardType=='RUPAY')
			{
				sentCardType='Rupay';
			}
			else {
				sentCardType='';
			}
			var url =`https://indiarush.com/irapi/customer/addNewCard/?customerId=${this.props.state.customerDetails.customer_id}&paymentType=${paymentType}&expirationMonth=${formData.get('newccexpmonDebit')}&expirationYear=${formData.get('newccexpyrDebit')}&version=3.81&cardType=${sentCardType}&cardNumber=${formData.get('newccnumDebit')}&name=${formData.get('newccnameDebit')}`;
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
										<CodPaymentForm showPaymentMethod={showPaymentMethod} cart={cart} settings={settings} createOrder={this.createOrder}/>
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
