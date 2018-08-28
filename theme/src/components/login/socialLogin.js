import React from 'react';
import PropTypes from 'prop-types';
import api from '../../lib/api';
import { themeSettings, text } from '../../lib/settings';
import GoogleLogin from './googleLogin';
import FacebookLogin from './facebookLogin';

export default class SocialLogin extends React.Component {
	static propTypes = {
		settings: PropTypes.shape({}).isRequired
	};

	state = {
		// products: []
	};

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
		console.log('in SocialLogin js render');
		const { settings } = this.props;

		return (
			<div className="account-login">
				<GoogleLogin />
				<FacebookLogin />
				<p className="tab-content-ruler fb-gplus-separator">
					<span className="loginORDividerText"> OR</span>
				</p>
			</div>
		);
	}
}
