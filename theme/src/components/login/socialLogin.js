import React from 'react';
import PropTypes from 'prop-types';
import api from '../../lib/api';
import { themeSettings, text } from '../../lib/settings';
import GoogleLoginWrapper from './googleLoginWrapper';
import FacebookLoginWrapper from './facebookLoginWrapper';

export default class SocialLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// customerDetails: [],
			// statsCookieId: null,
			// isLoggedIn: null
		};
		// this.onOptionChange = this.onOptionChange.bind(this);
		// this.findVariantBySelectedOptions = this.findVariantBySelectedOptions.bind(
		// 	this
		// );
		// this.addToCart = this.addToCart.bind(this);
		// this.checkSelectedOptions = this.checkSelectedOptions.bind(this);
	}

	// static propTypes = {
	// 	settings: PropTypes.shape({}).isRequired
	// };

	// state = {
	// 	// products: []
	// };

	componentDidMount() {
		// this.isCancelled = false;
		// this.fetchProducts(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// this.fetchProducts(nextProps);
	}

	componentWillUnmount() {
		// this.isCancelled = true;
	}

	render() {
		// console.log('in SocialLogin js render');

		const { loginPost } = this.props;
		const { isLoggedIn, statsCookieId, customerDetails } = this.state;

		return (
			<div className="account-login">
				<GoogleLoginWrapper
					isLoggedIn={isLoggedIn}
					statsCookieId={statsCookieId}
					customerDetails={customerDetails}
				/>
				<FacebookLoginWrapper
					isLoggedIn={isLoggedIn}
					statsCookieId={statsCookieId}
					customerDetails={customerDetails}
				/>
				<p className="tab-content-ruler fb-gplus-separator">
					<span className="loginORDividerText"> OR </span>
				</p>
			</div>
		);
	}
}
