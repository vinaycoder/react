import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

class Pincode extends React.Component{

	render(){
		return(
	<div>
		<div class="product-free-shipping-mob-qual-box">
      <span class="product-free-shipping-mob-qual-subbox product-free-shipping-mob-qual-subbox-main" data-content="bar">CONGRATULATIONS! You qualify for free shipping!</span>
    </div>

		<div class="product-pincode-checker font-medium">
				<div class="product-pincode-checker-box">
					<label for="product-pincode-checker">Enter your Pincode to check shipping time</label>
					<input maxlength="6" id="product-pincode-checker" class="product-pincode-checker-input" type="tel"/>
					<input type="hidden" id="product-pincode-checker-productId" value="831464" />
					<input type="hidden" id="product-pincode-checker-rowItemTotal" value="1392" />
					<a class="productPincodeAction" id="product-pincode-checker-button" title="Check Your Pincode">Check</a>
				</div>
    </div>


	</div>
		);
	}

}
export default Pincode;
