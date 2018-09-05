import React from 'react';
import { themeSettings, text } from '../../../../lib/settings';
import PaymentForm from './paymentForm';

const CheckoutStepPayment = props => {
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
	} = props;


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

			<div className="checkout-button-wrap">
				<div className="payment-form sp-methods">


				<dt className="checkout-page-radio checkout-page-hover checkout-radio-selected">
			            <input id="p_method_cashondelivery" defaultValue="cashondelivery" type="radio" name="payment[method]" className="radio" defaultChecked autoComplete="off" />
			        <span className="checkoutPayIcons cashondeliveryPayImageSel"></span>
			    <label htmlFor="p_method_cashondelivery" className="payMethodCashondelivery payMethodsSel">
			        <span className="payMethods payMethodsText">Cash On Delivery</span>
			    </label>
			</dt>

<dd className="checkout-payment-methods">
    <fieldset className="form-list">
<ul id="payment_form_cashondelivery">
  <li>
    <div className="checkout-page-summary-block-mobile-tab">
      <h3>Order Summary</h3>
      <table className="order-summary-table">
			<tbody>
			<tr>
			<td className="CheckoutTitle">Subtotal</td>
			<td className="CheckoutValue"><span className="price">Rs. 6,270</span></td>
			</tr><tr><td className="CheckoutValue">Discount (IRFLAT100)</td>
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

<li>
    <div>
        Note: Additional Rs. 50 will be charged as Cash On Delivery
    </div>
</li>
  <li className="variation-checkout"> </li>
    <li>
      <div className="buttons-set block " id="payment-buttons-container">
          <button type="button" title="Place Order" className="block orange-button checkoutContinueBtn btn-checkout checkout_buttons">

              <div>
                <span id="paymentText">
                    <strong>place order&nbsp;</strong>
                </span>
                <span id="paymentArrow" className="checkoutArrow">
                  <img src="https://indiarush.com/skin/frontend/default/theme202/images/checkout-page-arrow-icon-13x21px.png?i=1" />
                </span>
              </div>
          </button>
      </div>
    </li>
</ul>
</fieldset>
</dd>









				</div>
			</div>
		</div>
	);
};

export default CheckoutStepPayment;
