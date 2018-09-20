import React, { Component } from 'react';
import { themeSettings, text } from '../../../../../lib/settings';
import * as helper from '../../../../../lib/helper';

class creditPaymentForm extends Component{
	constructor(props) {
	super(props);

}
componentDidMount()
{

}

	render(){
    const {showPaymentMethod , cart, settings}=this.props;
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
                             <div className="checkoutNewCard">
       													<input type="radio" className="new-radio" name="storecard[id]" id="newcard" defaultChecked autoComplete="off" />
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
                                                   <select size="1" id="creditCards" name="newcreditCards" className="validate-select" autoComplete="off">
                                                       <option value="">Select Card Type</option>
                                                       <option value="CC">
                                                           Visa/Master Card
                                                       </option>
                                                       <option value="AMEX">
                                                           AMEX Cards
                                                       </option>
                                                       <option value="DINR">
                                                           Diners
                                                       </option>
                                                   </select>
                                               </div>
                                           </div>
                                           <div className="checkout-card-block card-num">
                                               <div className="checkout-card-title">
                                                   <span>Card Number</span>
                                               </div>
                                               <div className="checkout-card-input">
                                                   <input type="tel" name="newccnum" defaultValue="" className="input-field required-entry" id="ccnum-credit"  maxLength="19" placeholder="Card Number" autoComplete="off" />
                                               </div>
                                           </div>
                                           <div className="checkout-card-block card-name">
                                               <div className="checkout-card-title">
                                                   <span>Name on card</span>
                                               </div>
                                               <div className="checkout-card-input">
                                                   <input type="text" name="newccname" value="" className="input-field required-entry" placeholder="Name on card" autoComplete="off" />
                                               </div>
                                           </div>
                                           <div className="checkout-card-block card-date">
                                               <div className="checkout-card-title ">
                                                   <span>Expire Date</span>
                                               </div>
                                               <div className="checkout-card-input checkoutExpireDate" >
                                                   <select size="1" name="newccexpmon" className="validate-select checkoutExpireDateSelect" autoComplete="off">
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
                                                   <select size="1" name="newccexpyr" className="validate-select" autoComplete="off">
                                                       <option value="2017">2017</option>
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
                                                   <input id="checkoutCreditCVVNew" type="password" name="newccvv" value="" maxLength="3" size="5" className="input-field required-entry credit-new-cvv" placeholder="CVV" autoComplete="off" />
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
                                                       <input type="checkbox" name="allow-storecard" defaultChecked autoComplete="off" />
                                                   </span>
                                                   <span>Save Card</span>
                                               </div>
                                           </div>
                                       </li>
                                   </ul>
                               </div>
                           </div>
                       </div>
                   </div>

         </li>

               <li>
                  <div className="has-text-left">
                       <span>Note: </span> International credit cards are accepted
                  </div>

       					  <div className="checkout-button-wrap"><button type="submit" className="checkout-button button is-primary checkoutLoginBtn">PLACE ORDER <i className="material-icons">keyboard_arrow_right</i></button></div>


               </li>
       </ul>
       </fieldset>
       </dd>
       <div className="clear"></div>
     <div className="clear"></div>

       </div>
		);
	}

}
export default creditPaymentForm;