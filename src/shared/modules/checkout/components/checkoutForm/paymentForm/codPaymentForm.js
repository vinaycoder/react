import React, { Component } from 'react';
import { themeSettings, text } from '../../../../../lib/settings';
import * as helper from '../../../../../lib/helper';
class codPaymentForm extends Component{
	constructor(props) {
	super(props);

}
componentDidMount()
{

}

	render(){
    const {showPaymentMethod, cart, settings ,createOrder}=this.props;
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

     					<li className="CheckoutTitle">
     					    <div>
     					        Note: Additional Rs. 50 will be charged as Cash On Delivery
     					    </div>
     					</li>
     					  <li className="variation-checkout"> </li>
     					    <li>
     					       <div className="checkout-button-wrap"><button type="submit" onClick={e=>createOrder('cashondelivery')} className="checkout-button button is-primary checkoutLoginBtn">PLACE ORDER <i className="material-icons">keyboard_arrow_right</i></button></div>
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
