import React from 'react';
import PropTypes from 'prop-types';
import api from '../../lib/api';
import { themeSettings, text } from '../../lib/settings';

export default class GoogleLogin extends React.Component {
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
		console.log('in Google Login js render');
		const { settings } = this.props;

		return (
			<div className="account-login">
				<span id="gSignInWrapper" className="account-login-content">
					<p id="customBtn" className="customGPlusSignIn">
						<span className="icon" />
						<span className="buttonText">Sign in with Google</span>
					</p>
				</span>
			</div>
		);
	}
}
