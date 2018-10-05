import React, { Component } from 'react';
import { themeSettings, text } from '../../../../../lib/settings';
import * as helper from '../../../../../lib/helper';
class netBankingPaymentForm extends Component{
	constructor(props) {
	super(props);
	this.selectNetCheckUncheck = this.selectNetCheckUncheck.bind(this);
	this.radioNetCheckUncheck = this.radioNetCheckUncheck.bind(this);
	this.validateNetBanking = this.validateNetBanking.bind(this);
}
componentDidMount()
{

}
validateNetBanking(e,type)
{
		var codeValue=document.getElementById('netBankingCards').value;
		if(codeValue!='' || codeValue!='null' || codeValue!='undefined')
		{
			this.props.createOrder('irpayment');
		}
		else {
			console.log('Please select net banking bank');
		}


}
selectNetCheckUncheck(e,val)
{
	var totalSection=document.getElementsByClassName('rmBorder');
	for (var i = 0; i < totalSection.length; i++) {
		totalSection[i].style.borderColor='#d9dfe9';
	}
  document.getElementById('netBankingCards').value=val;
  document.getElementById(''+val).style.borderColor = '#f56602';
}
radioNetCheckUncheck()
{
	var totalSection=document.getElementsByClassName('rmBorder');
	var radio=document.getElementsByClassName('radio');
	for (var i = 0; i < totalSection.length; i++) {
		totalSection[i].style.borderColor='#d9dfe9';
		radio[i].checked=false;
	}

}

	render(){
    const {showPaymentMethod , cart, settings}=this.props;
		return(
	     <div>
       <dt className="checkout-page-radio checkout-page-hover" onClick={e => showPaymentMethod(e,'labelIdNetBanking','iconIdNetBanking', 'irNetBanking','p_method_irpayment')}>
         <input id="p_method_irpayment" defaultValue="irpayment" type="radio" name="payment[method]" className="radio" defaultChecked />
               <span className="checkoutPayIcons irpaymentPayImage" id="iconIdNetBanking"></span>
               <label htmlFor="p_method_irpayment" className="payMethodsLabel" id="labelIdNetBanking">
                   <span className="payMethods payMethodsText">Net Banking</span>
               </label>
       </dt>
       <div className="clear"></div>


       <dd className="checkout-payment-methods" id="irNetBanking">
       <fieldset className="form-list">
       <ul id="payment_form_irpayment">
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
          <div className="checkout-card-list" id="topNetBanking">
                 <div className="checkout-address-radio rmBorder" id="SBIB" onClick={e=>this.selectNetCheckUncheck(e,'SBIB')}>
                       <input type="radio" className="radio" name="netBankingCards" id="sbib" value="SBIB" />
                       <label name="checkout-address-label" htmlFor="sbib">
                           <div>
                               <span className="sbi-netbanking" alt="sbi-netbanking" title="sbi-netbanking">
                               </span>
                           </div>

                       </label>
                       <div className="clear"></div>
                 </div>

                 <div className="checkout-address-radio rmBorder" id="ICIB" onClick={e=>this.selectNetCheckUncheck(e,'ICIB')}>
                     <input type="radio" className="radio" name="netBankingCards" id="icib" value="ICIB" autoComplete="off" />
                     <label name="checkout-address-label" htmlFor="icib">

                         <div>
                             <span className="icici-netbanking" alt="icici-netbanking" title="icici-netbanking">
                             </span>
                         </div>

                     </label>
                     <div className="clear"></div>
               </div>

               <div className="checkout-address-radio rmBorder" id="HDFC" onClick={e=>this.selectNetCheckUncheck(e,'HDFC')}>
                     <input type="radio" className="radio" name="netBankingCards" id="hdfc" value="HDFC" autoComplete="off" />
                     <label name="checkout-address-label" htmlFor="hdfc">

                         <div>
                             <span className="hdfc-netbanking" alt="hdfc-netbanking" title="hdfc-netbanking">
                             </span>
                         </div>

                     </label>
                     <div className="clear"></div>
                 </div>

                 <div className="checkout-address-radio rmBorder" id="AXIB" onClick={e=>this.selectNetCheckUncheck(e,'AXIB')}>
                     <input type="radio" className="radio" name="netBankingCards" id="axib" value="AXIB" autoComplete="off" />
                     <label name="checkout-address-label" htmlFor="axib">

                         <div>
                             <span className="axis-netbanking" alt="axis-netbanking" title="axis-netbanking">
                             </span>
                         </div>

                     </label>
                     <div className="clear"></div>
                 </div>

                 <div className="checkout-address-radio rmBorder" id="PNBB" onClick={e=>this.selectNetCheckUncheck(e,'PNBB')}>
                     <input type="radio" className="radio" name="netBankingCards" id="pnbb" value="PNBB" autoComplete="off" />
                     <label name="checkout-address-label" htmlFor="pnbb">

                         <div>
                             <span className="pnb-netbanking" alt="pnb-netbanking" title="pnb-netbanking">
                             </span>
                         </div>

                     </label>
                     <div className="clear"></div>
                 </div>

                 <div className="checkout-address-radio rmBorder" id="YESB" onClick={e=>this.selectNetCheckUncheck(e,'YESB')}>
                     <input type="radio" className="radio" name="netBankingCards" id="yesb" value="YESB" autoComplete="off" />
                     <label name="checkout-address-label" htmlFor="yesb">

                         <div>
                             <span className="yes-netbanking" alt="yes-netbanking" title="yes-netbanking">
                             </span>
                         </div>

                     </label>
                     <div className="clear"></div>
                 </div>
           </div>
         </li>

         <li>
           <select size="1" id="netBankingCards" name="netBankingCards_select" className="netBankingCards_select select2-hidden-accessible" onChange={e=>this.radioNetCheckUncheck()} autoComplete="off" tabIndex="-1" aria-hidden="true">
               <optgroup label="Popular banks">
                   <option value="SBIB" id="SBIB">State Bank of India</option>
                   <option value="ICIB" id="ICIB">ICICI Bank</option>
                   <option value="HDFC" id="HDFC">HDFC Bank</option>
                   <option value="AXIB" id="AXIB">AXIS Bank</option>
                   <option value="PNBB" id="PNBB">Punjab National Bank</option>
                   <option value="YESB" id="YESB">YES Bank</option>
               </optgroup>
               <optgroup label="All Banks Alphabetically">
                   <option value="ADBB">Andhra Bank</option>
                   <option value="AIRNB">Airtel Payments Bank</option>
                   <option value="AXIB">AXIS Bank </option>
                   <option value="BOIB">Bank of India</option>
                   <option value="BOMB">Bank Of Maharashatra</option>
                   <option value="CABB">Canara Bank</option>
                   <option value="CSBN">Catholic Syrian Bank</option>
                   <option value="CBIB">Central Bank of India</option>
                   <option value="CUBB">City Union Bank</option>
                   <option value="CRPB">Corporation Bank</option>
                   <option value="CSMSNB">Cosmos Bank</option>
                   <option value="DCBCORP">DCB Bank - Corporate Netbanking </option>
                   <option value="DENN">Dena Bank</option>
                   <option value="DSHB">Deutsche Bank</option>
                   <option value="DCBB">Development Credit Bank</option>
                   <option value="DLSB">Dhanlaxmi Bank</option>
                   <option value="FEDB">Federal Bank</option>
                   <option value="HDFC">HDFC Bank</option>
                   <option value="ICIB">ICICI Bank</option>
                   <option value="IDFCNB">IDFC Netbanking</option>
                   <option value="INDB">Indian Bank</option>
                   <option value="INOB">Indian Overseas Bank</option>
                   <option value="INIB">IndusInd Bank</option>
                   <option value="IDBB">Industrial Development Bank of India</option>
                   <option value="JSBNB">Janata Sahakari Bank Pune</option>
                   <option value="LVRB">Lakshmi Vilas Bank - Retail Netbanking</option>
                   <option value="LVCB">Lakshmi Vilas Bank - Corporate Netbanking</option>
                   <option value="OBCB">Oriental Bank of Commerce</option>
                   <option value="CPNB">Punjab National Bank - Corporate Banking</option>
                   <option value="PNBB">Punjab National Bank - Retail Banking</option>
                   <option value="PSBNB">Punjab And Sind Bank</option>
                   <option value="PMNB">Punjab And Maharashtra Co-operative Bank Limited</option>
                   <option value="SRSWT">Saraswat Bank</option>
                   <option value="INGB">ING Vysya</option>
                   <option value="JAKB">Jammu &amp; Kashmir Bank</option>
                   <option value="KRKB">Karnataka Bank</option>
                   <option value="KRVB">Karur Vysya Bank</option>
                   <option value="162B">Kotak Mahindra Bank</option>
                   <option value="SVCNB">Shamrao Vithal Co-operative Bank Ltd.</option>
                   <option value="SOIB">South Indian Bank</option>
                   <option value="SBBJB">State Bank of Bikaner and Jaipur</option>
                   <option value="SBHB">State Bank of Hyderabad</option>
                   <option value="SBIB">State Bank of India</option>
                   <option value="SBPB">State Bank of Patiala</option>
                   <option value="SBMB">State Bank of Mysore</option>
                   <option value="SBTB">State Bank of Travencore</option>
                   <option value="SYNDB">Syndicate Bank</option>
                   <option value="TMBB">Tamilnadu Mercantile Bank</option>
                   <option value="TBON">The Nainital Bank</option>
                   <option value="BHNB">The Bharat Co-op. Bank Ltd</option>
                   <option value="UCOB">UCO Bank</option>
                   <option value="UBIB">Union Bank of India</option>
                   <option value="UNIB">United Bank of India</option>
                   <option value="VJYB">Vijaya Bank</option>
                   <option value="YESB">YES Bank</option>
               </optgroup>
           </select>
           <span className="select2 select2-container select2-container--default" dir="ltr">
             <span className="selection">
               <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-labelledby="select2-netBankingCards-container">

                 <span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>

               </li>
               <li>
                   <div>
                       You will be securely redirected to Bank site to enter your password and complete your purchase.
                   </div>
               </li>
               <li className="variation-checkout">

               </li>
       				<li className="variation-checkout"> </li>
       					<li>
       						 <div className="checkout-button-wrap"><button type="submit" onClick={e=>this.validateNetBanking(e,'irpayment')} className="checkout-button button is-primary checkoutLoginBtn">PLACE ORDER <i className="material-icons">keyboard_arrow_right</i></button></div>
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
