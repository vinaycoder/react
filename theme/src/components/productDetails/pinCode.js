import React, { Component } from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

class Pincode extends Component {
	constructor(props) {
		super(props);
		this.checkPincode = this.checkPincode.bind(this);
		this.showPincode = this.showPincode.bind(this);
		this.state = {
			pincodeShow: true,
			deliveryDetails: [],
			pincode: undefined,
			message: undefined,
			cod: undefined,
			deldate: undefined
		};
	}
	componentDidMount() {}
	showPincode() {
		this.setState({ pincodeShow: true });
	}
	checkPincode(e, productId) {
		console.log('vinay tkkkk');
		console.log(Number.isInteger(Number(e.target.value)));
		if (
			e.target.value.length == 6 &&
			Number.isInteger(Number(e.target.value))
		) {
			var pincode = e.target.value;
			const pinddddd = fetch(
				'https://indiarush.com/irapi/product/getPincodeCheck?product_id=' +
					this.props.product.product_id +
					'&pincode=' +
					e.target.value +
					'&version=' +
					'3.99'
			)
				.then(result => {
					return result.json();
				})
				.then(jsonResult => {
					if (jsonResult.data.postpaid) {
						var codmessage = 'Cash On Delivery Available.';
					} else {
						var codmessage = 'Cash On Not Delivery Available.';
					}
					if (jsonResult.data.deliveryDate) {
						this.setState({
							deliveryDetails: jsonResult.data,
							pincodeShow: false,
							pincode: pincode,
							message: 'Delivery Available.',
							cod: codmessage,
							deldate: jsonResult.data.deliveryDate
						});
					} else {
						this.setState({
							deliveryDetails: undefined,
							pincodeShow: false,
							pincode: pincode,
							message: 'Delivery Not Available.',
							cod: codmessage,
							deldate: undefined
						});
					}
				});
			// console.log(e.target.value);
			// console.log(this.props.product.product_id);
		}
	}

	render() {
		return (
			<div>
				{this.state.pincodeShow ? (
					<div className="defaultPin">
						<div className="product-free-shipping-mob-qual-box">
							<span
								className="product-free-shipping-mob-qual-subbox product-free-shipping-mob-qual-subbox-main"
								data-content="bar"
							>
								CONGRATULATIONS! You qualify for free shipping!
							</span>
						</div>
						<div className="product-pincode-checker font-medium">
							<div className="product-pincode-checker-box">
								<label for="product-pincode-checker">
									Enter your Pincode to check shipping time
								</label>
								<input
									maxlength="6"
									id="product-pincode-checker"
									onChange={e => this.checkPincode(e)}
									className="product-pincode-checker-input"
									type="tel"
								/>
								<input
									type="hidden"
									id="product-pincode-checker-productId"
									value="831464"
								/>
								<input
									type="hidden"
									id="product-pincode-checker-rowItemTotal"
									value="1392"
								/>
								<a
									className="productPincodeAction"
									id="product-pincode-checker-button"
									onClick={e => this.checkPincode(e)}
									title="Check Your Pincode"
								>
									Check
								</a>
							</div>
						</div>
					</div>
				) : (
					<div className="product-pincode-checker-bottom font-medium">
						<div className="product-pincode-checker-message">
							<div className="pincodeRight">
								For Pincode <b>{this.state.pincode}</b>
								<br />(
								<a
									className="product-pincode-checker-retry"
									onClick={() => this.showPincode()}
								>
									Change
								</a>
								)
							</div>
							<div className="pincodeLeft">
								<span className="pincodeLeft">{this.state.message}</span>
								<br />
								<span className="pincodeLeft">{this.state.cod}</span>
								<br />
								{this.state.deldate && (
									<span className="pincodeLeft">
										Get it By : <b>{this.state.deldate}</b>
									</span>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
export default Pincode;
