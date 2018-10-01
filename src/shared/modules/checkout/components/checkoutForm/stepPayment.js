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
			currentOrderId:null,
			cvv:null,
			formValuesDebit: {}
		};
		this.saveCard = this.saveCard.bind(this);
		this.getCardList = this.getCardList.bind(this);
		this.codOrder = this.codOrder.bind(this);
		this.PayUAction = this.PayUAction.bind(this);
		this.createOrder = this.createOrder.bind(this);
		this.debitcardtype = this.debitcardtype.bind(this);
		this.setCardProps = this.setCardProps.bind(this);
		this.setCardPropsCvv = this.setCardPropsCvv.bind(this);

		this.handleChange = this.handleChange.bind(this);


	}

	handleChange(event)
	{
		event.preventDefault();
		let formValuesDebit = this.state.formValuesDebit;
		let name = event.target.name;
		let value = event.target.value;
		formValuesDebit[name] = value;
		this.setState({formValuesDebit})
	}


	componentDidMount()
	{
		this.getCardList();
	}
	// this function is called for set the state of card details from debit or credit componentDidMount
	setCardProps(cardData)
	{
   let formValuesDebit = this.state.formValuesDebit;
		formValuesDebit['newccexpmonDebit'] =cardData.expirationMonth;
		formValuesDebit['newccexpyrDebit'] = cardData.expirationYear;
		formValuesDebit['newccnameDebit'] = cardData.name;
		formValuesDebit['newccnumDebit'] = cardData.cardNumber;
		formValuesDebit['newdebitCards'] = cardData.cardType;
        this.setState({formValuesDebit})
	}
	setCardPropsCvv(cvv)
	{
		this.setState({cvv:cvv});
	}

// this function is called for put gapping after 4 digits
	debitcardtype(e)
	{
			var val = e.target.value;
			var newval = '';
			val = val.replace(/\s/g, '');
			for(var i=0; i < val.length; i++) {
					if(i%4 == 0 && i > 0) newval = newval.concat(' ');
					newval = newval.concat(val[i]);
			}
			e.target.value=newval;
			this.handleChange(e);  // for changing the value and set the props
	}


	createOrder(methodId)
	{
this.PayUAction(methodId);
		/*
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

							*/
	}

	PayUAction(methodId)
	{
		console.log('in payU Actionsssssssssssssssssssssssssssss');
		/*test credentials */
		const payUMerchantKey = "gtKFFx";
		const payUSalt = "eCwWELxi";
		const payUBaseUrl = "https://test.payu.in/_payment";
		const payUResponseUrl = "https://indiarush.org/payment/response/payU";

		const surl='http://dev.indiarush.com/fail.php';
		const furl='http://dev.indiarush.com/fail.php';
		// const surl='http://dev.indiarush.com/fail.php';
		// const furl='http://dev.indiarush.com/fail.php';
		const taxId=101040643;

		// for PG
		var netBankingId='';
		if(methodId=='irdebit')
		{
			netBankingId='DC';
		}
		else if(methodId=='ircredit')
		{
				netBankingId='CC';
		}

		const PaymentCardDetails = localStorage.getItem('PaymentCardDetails');

   if (PaymentCardDetails && PaymentCardDetails.length > 0)
	 {
		 const PaymentCardDetailsParsed = JSON.parse(PaymentCardDetails);

		var fieldsList=
		{
			key:payUMerchantKey,
			txnid:101040643, // order id
			amount:this.props.state.cart.grandtotal,
			productinfo:'Dosaya Bagru Textiles Jacqueline Fernandez Poly Cotton Red Printed Bollywood Designer Saree - DBT11',
			firstname:this.props.state.customerDetails.firstname,
			email:this.props.state.customerDetails.email,
			phone:this.props.state.customerDetails.phone_number,
			surl:surl,
			furl:furl,
			lastname:'',
			pg:netBankingId,
			bankcode:PaymentCardDetailsParsed.cardType,
			ccnum:PaymentCardDetailsParsed.cardNu,
			ccname:PaymentCardDetailsParsed.name,
			ccvv:PaymentCardDetailsParsed.cvv,
			ccexpmon:PaymentCardDetailsParsed.exMon,
			ccexpyr:PaymentCardDetailsParsed.exYr,
			user_credentials:payUMerchantKey+':'+this.props.state.customerDetails.email,
			store_card:0,
			one_click_checkout:1,
			hash:null
		};
	}else {
		console.log('Your card details is not found');
		return false;
	}
/*
		const hashSequence = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10";
		const hashVarsSeq = hashSequence.split('|');

			var keys='';
			var hash = '';
			var hash_string = '';
		for (var i = 0; i < hashVarsSeq.length; i++) {
			  keys=hashVarsSeq[i];
				if(fieldsList[keys]!='')
				{
					hash_string += fieldsList[keys];
				}
				else {
						hash_string += '';
				}
				hash_string += '|';
		}

		hash_string += payUSalt;
		*/
		fetch(
			`https://indiarush.com/irapi/checkout/getPayUHash?version=3.90&key=${payUMerchantKey}&txnid=${taxId}&amount=${this.props.state.cart.grandtotal}&productinfo=${fieldsList.productinfo}&firstname=${fieldsList.firstname}&email=${fieldsList.email}&salt=${payUSalt}`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				console.log('logging category products data');
				fieldsList.hash=jsonResult.hash;
				console.log(jsonResult.hash);
			});




var		hash ='24d5a758386abfba26094dcfb6b24237c3f9950695141cbe3d24ce807989b68e947fc174010a06fda2164a19fb7acb520d931a0aba7fe4a1471c31a7cdf6ea50';//sha512(
		fieldsList.hash=hash;

console.log('viiiiiiiiiiiiiiiiiiiiiiiiii');
// console.log(hashVarsSeq);
console.log(fieldsList);





console.log(fieldsList);
		var form = document.createElement("form");

		form.method = "POST";
		form.action = payUBaseUrl;

		for (var key in fieldsList) {
			 var element1 = document.createElement("input");
			 element1.value=fieldsList[key];
			 element1.type="input";
			 element1.name=key;
			 form.appendChild(element1);
		   // console.log("User " + fieldsList[key] + " is #" + key); // "User john is #234"
		}


		document.body.appendChild(form);

		form.submit();

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

	saveCard(paymentType)
	{
		//event.preventDefault();
		console.log(paymentType);
		if(paymentType=='creditCard')
		{
			const myForm = document.getElementById('submitCredit');
			const formData = new FormData(myForm);
			var cardType=formData.get('newdebitCards');
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
			var url =`https://indiarush.com/irapi/customer/addNewCard/?customerId=${this.props.state.customerDetails.customer_id}&paymentType=${paymentType}&expirationMonth=${formData.get('newccexpmonDebit')}&expirationYear=${formData.get('newccexpyrDebit')}&version=3.81&cardType=${sentCardType}&cardNumber=${formData.get('newccnumDebit')}&name=${formData.get('newccnameDebit')}`;

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
			var cardNumber=formData.get('newccnumDebit');
			cardNumber=cardNumber.trim();
			console.log(cardNumber);
			console.log('remvoe space in card type');
			var url =`https://indiarush.com/irapi/customer/addNewCard/?customerId=${this.props.state.customerDetails.customer_id}&paymentType=${paymentType}&expirationMonth=${formData.get('newccexpmonDebit')}&expirationYear=${formData.get('newccexpyrDebit')}&version=3.81&cardType=${sentCardType}&cardNumber=${cardNumber}&name=${formData.get('newccnameDebit')}`;
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
							<DebitPaymentForm showPaymentMethod={showPaymentMethod} cart={cart} settings={settings} saveCard={this.saveCard}  debitCardList={this.state.debitCardList} debitcardtype={this.debitcardtype} setCardProps={this.setCardProps} setCardPropsCvv={this.setCardPropsCvv} createOrder={this.createOrder} handleChange={this.handleChange}/>
							)}
							{fields.code=='ircredit' && (
								<CreditPaymentForm showPaymentMethod={showPaymentMethod} cart={cart} settings={settings} saveCard={this.saveCard} creditCardList={this.state.creditCardList} debitcardtype={this.debitcardtype}  setCardProps={this.setCardProps} setCardPropsCvv={this.setCardPropsCvv} createOrder={this.createOrder} handleChange={this.handleChange} />
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
