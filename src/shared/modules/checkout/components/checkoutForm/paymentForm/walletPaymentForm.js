import React, { Component } from 'react';
import { themeSettings, text } from '../../../../../lib/settings';
import * as helper from '../../../../../lib/helper';
class netBankingPaymentForm extends Component{
	constructor(props) {
	super(props);
	this.radioCheckUncheck=this.radioCheckUncheck.bind(this);
	this.selectUncheck=this.selectUncheck.bind(this);

}
componentDidMount()
{

}
radioCheckUncheck()
{
	var radio=document.getElementsByClassName('walletRadio');
	for (var i = 0; i < radio.length; i++) {
		radio[i].checked=false;
	}

}
selectUncheck(val)
{
	 document.getElementById('irwallet').value=val;

}
	render(){
    const {showPaymentMethod , cart, settings}=this.props;
		return(
	     <div>
       <dt className="checkout-page-radio checkout-radio-selected" onClick={e => showPaymentMethod(e,'labelIdWallet','iconIdWallet', 'irWallet','p_method_irwallet')}>
         <input id="p_method_irwallet" value="irwallet" type="radio" name="payment[method]" title="Wallet" className="radio" autoComplete="off" defaultChecked />

               <span className="checkoutPayIcons irwalletPayImage" id="iconIdWallet"></span>

         <label htmlFor="p_method_irwallet" className="payMethodsLabel" id="labelIdWallet">
               <span className="payMethods payMethodsText">Wallet</span>
         </label>
       </dt>
       <div className="clear"></div>

       <dd className="checkout-payment-methods" id="irWallet">
       <fieldset className="htmlForm-list noBorder">

       <ul id="payment_htmlForm_irwallet">
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

         </li>

               <li>
                   <div className="checkout-card-list" id="topWalletList">
                       <div className="checkout-address-radio paytmDiv">
                         <input type="radio" className="radio walletRadio" name="irwallet" id="paytm" value="PAYTM" onClick={e=>this.selectUncheck(e.target.value)} autoComplete="off" />
                               <label name="checkout-address-label" htmlFor="paytm">

                                   <div>
                                       <span className="paytm-wallet" alt="paytm-wallet" title="paytm-wallet">
                                       </span>
                                       <span></span>
                                   </div>

                               </label>
                               <div className="clear"></div>
                           </div>
                           <div className="checkout-address-radio mobikwikDiv">
                               <input type="radio" className="radio walletRadio" name="irwallet" id="mobikwik" value="MOBIKWIK" onClick={e=>this.selectUncheck(e.target.value)} autoComplete="off" />
                               <label name="checkout-address-label" htmlFor="mobikwik">

                                   <div>
                                       <span className="mobikwik-wallet" alt="mobikwik-wallet" title="mobikwik-wallet">
                                       </span>
                                       <span></span>
                                   </div>

                               </label>
                               <div className="clear"></div>
                           </div>
                                   </div>
                   <select size="1" id="irwallet" name="irwallet_select" onChange={e=>this.radioCheckUncheck()} autoComplete="off">
                       <option defaultValue="">Select your Wallet</option>
                       <option value="MOBIKWIK">MobiKwik</option>
                       <option value="PAYTM">Paytm</option>

                       <option value="PAYZ">Pay Zap</option>
                       <option value="OLAM">Ola Money</option>
                       <option value="OXICASH">Oxigen Wallet</option>
                       <option value="YPAY">YPay Cash</option>
                   </select>
               </li>
               <li>
                   <div>
                           You ll be securely redirected to Wallet site to enter your password and complete your purchase.
                   </div>
               </li>
               <li className="variation-checkout">

               </li>
       				<li className="variation-checkout"> </li>
       					<li>
       						 <div className="checkout-button-wrap">
       								 <button type="submit" className="checkout-button button is-primary checkoutLoginBtn">PLACE ORDER
       								 <i className="material-icons">keyboard_arrow_right</i>
       								 </button>
       						 </div>
       					</li>
       </ul>
       </fieldset>
       </dd>

     <div className="clear"></div>

       </div>
		);
	}

}
export default netBankingPaymentForm;
