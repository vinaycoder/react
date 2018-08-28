import React from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../../lib/settings';

export default class FormLogin extends React.Component {
	static propTypes = {
		settings: PropTypes.shape({}).isRequired
	};

	componentDidMount() {
		console.log('componentDidMount viewed');
		// const { product } = this.props;
		// const viewedProducts = this.getArrayFromLocalStorage();
		// this.setState({ viewedProducts });
		//
		// if (product && product.id) {
		// 	this.addProductIdToLocalStorage(product.id);
		// }
	}

	componentWillReceiveProps(nextProps) {
		// if (
		// 	this.props.product !== nextProps.product &&
		// 	nextProps.product &&
		// 	nextProps.product.id
		// ) {
		// 	this.addProductIdToLocalStorage(nextProps.product.id);
		// }
	}

	shouldComponentUpdate(nextProps, nextState) {
		// return this.state.viewedProducts !== nextState.viewedProducts;
	}

	// getArrayFromLocalStorage = () => {
	// 	let values = [];
	// 	const viewedProducts = localStorage.getItem('viewedProducts');
	// 	console.log('getArrayFromLocalStorage');
	// 	try {
	// 		if (viewedProducts && viewedProducts.length > 0) {
	// 			const viewedProductsParsed = JSON.parse(viewedProducts);
	// 			if (Array.isArray(viewedProductsParsed)) {
	// 				values = viewedProductsParsed;
	// 			}
	// 		}
	// 	} catch (e) {
	// 		//
	// 	}
	//
	// 	return values;
	// };

	// addProductIdToLocalStorage = productId => {
	// 	console.log('addProductIdToLocalStorage');
	// 	if (productId && productId.length > 0) {
	// 		const viewedProducts = this.getArrayFromLocalStorage();
	//
	// 		if (viewedProducts.includes(productId)) {
	// 			const index = viewedProducts.indexOf(productId);
	// 			viewedProducts.splice(index, 1);
	// 			viewedProducts.push(productId);
	// 		} else {
	// 			viewedProducts.push(productId);
	// 		}
	//
	// 		localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
	// 		this.setState({ viewedProducts });
	// 	}
	// };

	render() {
		const { settings } = this.props;

		// const ids = viewedProducts.reverse().slice(0, limit);
		return (
			<div>
				<form action="" method="post" id="login-form">
					<label>Mobile number or Email Address</label>

					<div className="login-input-div">
						<span className="login-email-image" />
						<input
							className="input-field input-field-login  required-entry validate-email"
							type="text"
							placeholder="Enter Mobile number or email address"
							title="Email Address"
							name="username"
							value=""
							id="email"
						/>
					</div>

					<label>Password</label>

					<div className="login-input-div">
						<span className="login-password-image" />
						<input
							className="input-field input-field-login required-entry validate-password login-password-showhide"
							type="password"
							placeholder="Password"
							name="password"
							id="loginPassword"
							title="Password"
						/>
						<span
							className="sprites showHidePwd hidePwd"
							title="Show Password"
						/>
					</div>

					<div className="login-input-link-div">
						<div className="login-submit-div" onClick="loginButtonLoader();">
							<input
								id="loginAccountButton"
								className="orange-button gtmUserInfo"
								type="submit"
								value="Sign in"
								name="send"
							/>
						</div>
					</div>

					<div className="login-input-link-div">
						<div id="forgotpass">
							<a href="#" onClick="forgotpwd();">
								Forgot your password?
							</a>
						</div>
					</div>
				</form>

				<form
					action="/customer/account/forgotpasswordpost/' ?>"
					method="post"
					id="form-validate-forgot"
				>
					<div className="no-display" id="forgotpassform">
						<div className="login-input-div">
							<span className="login-email-image" />
							<input
								type="text"
								placeholder="Enter Mobile number or Email Address"
								name="forget_email"
								id="forgotbutton"
								title="Email Address"
							/>
						</div>

						<div className="login-input-link-div">
							<div className="right login-submit-div">
								<input
									id="forgetButton"
									className="forgotpassbutton orange-button left gtmUserInfo "
									type="submit"
									value="Get Your Password"
									name="send"
								/>
								<span className="arrow" />
							</div>
						</div>
					</div>
				</form>
			</div>
		);

		// return null;
	}
}
