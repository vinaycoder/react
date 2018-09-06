import React, { Component } from 'react';

class codPaymentForm extends Component{
	constructor(props) {
	super(props);

}
componentDidMount()
{

}

	render(){
    const {showPaymentMethod}=this.props;
		return(
	     <div>
       <dt className="checkout-page-radio checkout-page-hover checkout-radio-selected" onClick={e => showPaymentMethod(e,'labelIdCod','iconIdCod', 'cod','p_method_cashondelivery')}>
                 <input id="p_method_cashondelivery" defaultValue="cashondelivery" type="radio" name="payment[method]" className="radio" defaultChecked autoComplete="off" />
             <span className="checkoutPayIcons cashondeliveryPayImage" id="iconIdCod"></span>
         <label htmlFor="p_method_cashondelivery" id="labelIdCod" className="payMethodsLabel">
             <span className="payMethods payMethodsText">Cash On Delivery</span>
         </label>
     </dt>
     <div className="clear"></div>
     <dd className="checkout-payment-methods" id="cod">
     <fieldset className="form-list">
     					<ul id="payment_form_cashondelivery">
     					  <li>
     					    <div className="checkout-page-summary-block-mobile-tab">
     					      <h3 className="checkoutMethodTitle">Order Summary</h3>
     					      <table className="order-summary-table">
     								<tbody>
     								<tr>
     								<td className="CheckoutTitle">Subtotal</td>
     								<td className="CheckoutValue"><span className="price">Rs. 6,270</span></td>
     								</tr><tr><td className="CheckoutTitle">Discount (IRFLAT100)</td>
     								<td className="CheckoutValue"><span className="price">-Rs. 100</span></td>
     								</tr>
     								<tr>
     								<td className="CheckoutTitle">Shipping</td>
     								<td className="CheckoutValue"><span className="price">Free</span></td>
     								</tr>
     								<tr>
     								<td className="CheckoutTitle">Cash On Delivery</td>
     								<td className="CheckoutValue"><span className="price">Rs. 50</span></td>
     								</tr>
     								<tr className="grand-total">
     								<td className="CheckoutTitle">Grand Total</td>
     								<td className="CheckoutValue"><span className="price">Rs. 6,220</span></td>
     								</tr>
     								</tbody>
     								</table>
     					    </div>
     					</li>

     					<li className="CheckoutTitle">
     					    <div>
     					        Note: Additional Rs. 50 will be charged as Cash On Delivery
     					    </div>
     					</li>
     					  <li className="variation-checkout"> </li>
     					    <li>
     					       <div className="checkout-button-wrap"><button type="submit" className="checkout-button button is-primary checkoutLoginBtn">PLACE ORDER <i className="material-icons">keyboard_arrow_right</i></button></div>
     					    </li>
     					</ul>
     </fieldset>
     </dd>
     <div className="clear"></div>

       </div>
		);
	}

}
export default codPaymentForm;
