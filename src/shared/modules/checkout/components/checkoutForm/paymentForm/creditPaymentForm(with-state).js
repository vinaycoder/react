import React, { Component } from 'react';
import { themeSettings, text } from '../../../../../lib/settings';
import * as helper from '../../../../../lib/helper';

class creditPaymentForm extends Component{
	constructor(props) {
	super(props);
		this.state = {
			newCard:false,
			cardId:null,
			cardDetails:{cardType:null,cardNu:null,name:null,exMon:null,exYr:null,cvv:null,methods:'ircredit'}
		};
	this.hideNewDebitCard=this.hideNewDebitCard.bind(this);
	this.selectDebitCard=this.selectDebitCard.bind(this);
	this.validateCard=this.validateCard.bind(this);

}
componentDidMount()
{

}



validateCard(e,type)
{
	e.preventDefault();
	if(document.getElementById('new-debit-card-default').checked)
	{
		console.log('checked in new');
		var cardType=document.getElementById('creditCards').value;
		var ccnumDebit=document.getElementById('ccnum-credit').value;
		var newccnameDebit=document.getElementById('newccname').value;
		var newccexpmonDebit=document.getElementById('newccexpmon').value;
		var newccexpyrDebit=document.getElementById('newccexpyr').value;
		var checkoutDebitCVVNew=document.getElementById('newccvv').value;

     // check the validation
		if(cardType!='' && ccnumDebit!='' && newccnameDebit!='' && newccexpmonDebit!='' && newccexpyrDebit!='' && checkoutDebitCVVNew!='')
		{
			// for saved the card
			let cardDetails ={}; cardDetails={cardType:cardType,cardNu:ccnumDebit,name:newccnameDebit,exMon:newccexpmonDebit,exYr:newccexpyrDebit,cvv:checkoutDebitCVVNew,methods:'ircredit'};
			localStorage.setItem('PaymentCardDetails', JSON.stringify(cardDetails));



			if(document.getElementById('new-credit-card').checked)
			{
			//	this.props.saveCard('creditCard');
				this.props.createOrder('ircredit');

			}
			else {
				this.props.createOrder('ircredit');
			}
		}
		else {
			console.log('please enter all valid fields');
		}
	}
	else {
		var off_payment_method = document.getElementsByName('storeCreditCard');
    var ischecked_method = false;
    var cardValue = '';
				for ( var i = 0; i < off_payment_method.length; i++)
				{
				    if(off_payment_method[i].checked) {
				        ischecked_method = true;
								cardValue=off_payment_method[i].value;
				        break;
				    }
		    }

			if(!ischecked_method)   { //payment method button is not checked
			    console.log('please select a payment methods');
			}
			else {
				console.log('saved card');
				var cvvNumber = document.getElementById('checkoutCreditCVV'+this.state.cardId).value;
				if(cvvNumber!='')
				{
					let cardDetails = this.state.cardDetails;
					cardDetails['cvv']=cvvNumber;
					localStorage.setItem('PaymentCardDetails', JSON.stringify(cardDetails));

					this.props.createOrder('ircredit');
				}
				else {
					console.log('please enter cvv number');
				}



			}
	}
}

hideNewDebitCard()
{
	this.setState({newCard:true});
}
selectDebitCard(cardData)
{
	// set selected card in state
	let cardDetails = this.state.cardDetails;
	cardDetails['cardType']=cardData.cardType;
	cardDetails['cardNu']=cardData.cardNumber;
	cardDetails['name']=cardData.name;
	cardDetails['exMon']=cardData.expirationMonth;
	cardDetails['exYr']=cardData.expirationYear;
	this.setState({cardDetails})
// end setting the cards
	this.props.setCardProps(cardData);
	this.setState({cardId:cardData.cardId});
	this.setState({newCard:false});
}

	render(){
    const {showPaymentMethod , cart, settings,saveCard, debitcardtype}=this.props;
		return(
	     <div>
       <dt className="checkout-page-radio" onClick={e => showPaymentMethod(e,'labelIdCredit','iconIdCredit', 'irCredit','p_method_ircredit')}>
           <input id="p_method_ircredit" defaultValue="ircredit" type="radio" name="payment[method]" className="radio" autoComplete="off" />
               <span className="checkoutPayIcons ircreditPayImage" id="iconIdCredit"></span>
               <label htmlFor="p_method_ircredit" className="payMethodsLabel" id="labelIdCredit">
                   <span className="payMethodCreditDebit payMethods">Credit Card</span><br />
                   <span className="payMethodCreditDebit cardTypeFont">(Visa / MasterCard) </span>
               </label>
       </dt>
       <div className="clear"></div>
       <dd className="checkout-payment-methods" id="irCredit">
       <fieldset className="form-list">

			 <form className="checkoutFormContactDetailsPadding" id="submitCredit" name="submit">

       <ul id="payment_form_ircredit">
         <li>
				 <div className="checkout-page-summary-block-mobile-tab">
					 <h3 className="checkoutMethodTitle">Order Summary</h3>
					 <table className="order-summary-table">
					 <tbody>
					 <tr>
					 <td className="CheckoutTitle">Subtotal</td>
					 <td className="CheckoutValue"><span className="price">{helper.formatCurrency(cart.subtotal, settings)}</span></td>

					 </tr>
				 <tr>
				 {cart.discount > 0 && (
					 <td className="CheckoutTitle">	{text.discount}</td>
				 )}
				 {cart.discount > 0 && (
					 <td className="CheckoutValue"><span className="price">-{helper.formatCurrency(cart.discount, settings)}</span></td>
				 )}
					 </tr>
					 <tr>

				 <td className="CheckoutTitle">	Shipping</td>
				 {cart.shippingAmount > 0 && (
					 <td className="CheckoutValue"><span className="price">-{helper.formatCurrency(cart.shippingAmount, settings)}</span></td>
				 )}
				 {cart.shippingAmount <= 0 && (
					 <td className="CheckoutValue"><span className="price">Free</span></td>
				 )}
					 </tr>
					 <tr>
				 {cart.codFee > 0 && (
					 <td className="CheckoutTitle">Cash On Delivery</td>
					 )}
					 {cart.codFee > 0 && (
						 <td className="CheckoutValue"><span className="price">{helper.formatCurrency(cart.codFee, settings)}</span></td>
					 )}


					 </tr>
					 <tr className="grand-total">
					 <td className="CheckoutTitle">Grand Total</td>
					 <td className="CheckoutValue"><span className="price">{helper.formatCurrency(cart.grandtotal, settings)}</span></td>
					 </tr>
					 </tbody>
					 </table>
				 </div>
             <div className="input-box-new">
                       <div className="checkout-card-list">
                         <div className="checkout-address-radio noBorder" id="new-card">
												 {this.props.creditCardList.length > 0  && (
													 <div>
													 {this.props.creditCardList.map(fields => (

														 <div className="checkout-card-list" key={fields.cardId}>
														 <input type="hidden" name="debitCardId" defaultValue={fields.cardId} />
															 <div className="checkout-address-radio cardList active_old" id="22773" >
																		 <input type="radio" className="radio" name="storeCreditCard" id={"storecard-id-"+fields.cardId} defaultValue={fields.cardId}  onClick={e=>this.selectDebitCard({cardId:fields.cardId,cardNumber:fields.cardNumber,cardType:fields.cardType,expirationMonth:fields.expirationMonth,expirationYear:fields.expirationYear,name:fields.name})} autoComplete="off" />
																					 <label name="checkout-address-label newLabelForCardList" htmlFor={"storecard-id-"+fields.cardId} >
																							 <div className="left">
																									 <div>
																										 <span className="font-large">{fields.cardNumber.substring(0,4)}  </span>
																																	 <span className="font-large">**** ****</span>
																																	 <span className="font-large">{fields.cardNumber.substring(fields.cardNumber.length -4)}  </span>
																									 </div>
																													 <div className="font-medium">
																																	 <span> {fields.cardType} </span>
																													 </div>
																							 </div>
																							 <div className="checkout-card-input right">
																									 <div>
																											 <span>CVV</span>
																											 <input id={"checkoutCreditCVV"+fields.cardId} type="password" name={"checkoutCreditCVV"+fields.cardId} maxLength="3" size="5" className="input-field credit-cvv cardListCvv" placeholder="CVV" onChange={e=>this.props.setCardPropsCvv(e.target.value)} />
																									 </div>

																							 </div>
																					 </label>
																 <div className="clear"></div>
															 </div>
														 </div>

												))}

												{/* for new card if list exists*/}

												<div className="input-box-old">
													 <div className="checkout-card-list">
														 <div className="checkout-address-radio cardList" id="newDebitCard" >
																	 <input type="radio" className="radio" name="storeCreditCard" id="new-debit-card-default" onClick={e=>this.hideNewDebitCard()} autoComplete="off" />
																				 <label name="checkout-address-label newLabelForCardList" htmlFor="new-debit-card-default" onClick={e=>this.hideNewDebitCard()}>
																						 <div className="left">
																								 <div>
																									 <span className="font-large">New Credit Card {this.state.newCard} </span>
																								 </div>

																						 </div>

																				 </label>
															 <div className="clear"></div>
														 </div>
													 </div>
												 </div>

												 {/* end new card if list*/}

													 </div>

												 )}

												 {(this.props.creditCardList.length < 1 || this.state.newCard)   && (
															<div>
                             <div className="checkoutNewCard">
       													<input type="radio" className="new-radio" name="storecard" defaultChecked="checked" id="newcard" defaultChecked autoComplete="off" />
       													<label name="checkout-address-label" htmlFor="newcard" >
       															New Credit Card
       													</label>
       											</div>
                               <div className="clear"></div>
                               <div className="show-new-card" id="show-new-credit-card">
                                   <div className="checkout-card-title width100">
                                       <span>Enter Card Details</span>
                                   </div>

                                   <ul>
                                       <li className="checkout-card-container">
                                           <div className="checkout-card-block card-select">
                                               <div className="checkout-card-title">
                                                   <span>Card Type</span>
                                               </div>
                                               <div className="checkout-card-select">
                                                   <select size="1" id="creditCards" name="newdebitCards" onChange={e=>this.props.handleChange(e)} className="validate-select" autoComplete="off">
                                                       <option value="">Select Card Type</option>
                                                       <option value="CC"> Visa/Master Card </option>
                                                       <option value="AMEX"> AMEX Cards</option>
                                                       <option value="DINR">   Diners </option>
                                                   </select>
                                               </div>
                                           </div>
                                           <div className="checkout-card-block card-num">
                                               <div className="checkout-card-title">
                                                   <span>Card Number</span>
                                               </div>
                                               <div className="checkout-card-input">
                                                   <input type="tel" name="newccnumDebit" className="input-field required-entry" id="ccnum-credit"  maxLength="19" onChange={e=>debitcardtype(e)} placeholder="Card Number" autoComplete="off" />
                                               </div>
                                           </div>
                                           <div className="checkout-card-block card-name">
                                               <div className="checkout-card-title">
                                                   <span>Name on card</span>
                                               </div>
                                               <div className="checkout-card-input">
                                                   <input type="text" name="newccnameDebit" id="newccname" className="input-field required-entry" placeholder="Name on card" onChange={e=>this.props.handleChange(e)} autoComplete="off" />
                                               </div>
                                           </div>
                                           <div className="checkout-card-block card-date">
                                               <div className="checkout-card-title ">
                                                   <span>Expire Date</span>
                                               </div>
                                               <div className="checkout-card-input checkoutExpireDate" >
                                                   <select size="1" name="newccexpmonDebit" id="newccexpmon" className="validate-select checkoutExpireDateSelect" autoComplete="off" onChange={e=>this.props.handleChange(e)}>
																									     <option value="">M</option>
                                                       <option value="01">01</option>
                                                       <option value="02">02</option>
                                                       <option value="03">03</option>
                                                       <option value="04">04</option>
                                                       <option value="05">05</option>
                                                       <option value="06">06</option>
                                                       <option value="07">07</option>
                                                       <option value="08">08</option>
                                                       <option value="09">09</option>
                                                       <option value="10">10</option>
                                                       <option value="11">11</option>
                                                       <option value="12">12</option>
                                                   </select>
                                               </div>
                                               <div className="checkout-card-input">
                                                   <select size="1" name="newccexpyrDebit" id="newccexpyr" onChange={e=>this.props.handleChange(e)} className="validate-select" autoComplete="off">
																									     <option value="">Year</option>
                                                       <option value="2018">2018</option>
                                                       <option value="2019">2019</option>
                                                       <option value="2020">2020</option>
                                                       <option value="2021">2021</option>
                                                       <option value="2022">2022</option>
                                                       <option value="2023">2023</option>
                                                       <option value="2024">2024</option>
                                                       <option value="2025">2025</option>
                                                       <option value="2026">2026</option>
                                                       <option value="2027">2027</option>
                                                       <option value="2028">2028</option>
                                                       <option value="2029">2029</option>
                                                       <option value="2030">2030</option>
                                                       <option value="2031">2031</option>
                                                       <option value="2032">2032</option>
                                                       <option value="2033">2033</option>
                                                       <option value="2034">2034</option>
                                                       <option value="2035">2035</option>
                                                       <option value="2036">2036</option>
                                                       <option value="2037">2037</option>
                                                       <option value="2038">2038</option>
                                                       <option value="2039">2039</option>
                                                       <option value="2040">2040</option>
                                                       <option value="2041">2041</option>
                                                       <option value="2042">2042</option>
                                                       <option value="2043">2043</option>
                                                       <option value="2044">2044</option>
                                                       <option value="2045">2045</option>
                                                       <option value="2046">2046</option>
                                                       <option value="2047">2047</option>
                                                       <option value="2048">2048</option>
                                                       <option value="2049">2049</option>
                                                       <option value="2050">2050</option>
                                                   </select>
                                               </div>
                                           </div>
                                           <div className="checkout-card-block card-cvv">
                                               <div className="checkout-card-title">
                                                   <span>CVV</span>
                                               </div>
                                               <div className="checkout-card-input">
                                                   <input id="checkoutCreditCVVNew" onChange={e=>this.props.setCardPropsCvv(e.target.value)} type="password" name="newccvvDebit" id="newccvv" maxLength="3" size="5" className="input-field required-entry credit-new-cvv" placeholder="CVV" autoComplete="off" />
                                                   <span className="cvv-logo">
                                                       <img src="https://indiarush.com/skin/frontend/default/theme202/images/Checkout-cvv.png" />
                                                   </span>
                                               </div>
                                           </div>
                                           <div className="checkout-card-block card-cvv-text">
                                               <div className="checkout-card-title">
                                                   <span></span>
                                               </div>
                                               <div className="checkout-card-input CheckoutTitle">
                                                   (The last 3 digits displayed on the back of your card)
                                               </div>
                                           </div>
                                           <div className="has-text-left">
                                               <div>
                                                   <span>
                                                       <input type="checkbox" name="allow-storecard" id="new-credit-card" defaultChecked autoComplete="off" />
                                                   </span>
                                                   <span>Save Card</span>
                                               </div>
                                           </div>
                                       </li>
                                   </ul>
																	 </div>
                               </div>

															 )}
                           </div>
                       </div>
                   </div>

         </li>

               <li>
                  <div className="has-text-left">
                       <span>Note: </span> International credit cards are accepted
                  </div>

       					  <div className="checkout-button-wrap"><button type="submit" onClick={e=>this.validateCard(e,'creditCard')} className="checkout-button button is-primary checkoutLoginBtn">PLACE ORDER <i className="material-icons">keyboard_arrow_right</i></button></div>


               </li>
       </ul>
			 </form>
       </fieldset>
       </dd>
       <div className="clear"></div>
     <div className="clear"></div>

       </div>
		);
	}

}
export default creditPaymentForm;
