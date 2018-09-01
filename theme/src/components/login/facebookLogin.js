import React from 'react';
import PropTypes from 'prop-types';

export default class FacebookLogin extends React.Component {
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
				<p className="login-input-link-div facebook-login-div">
					<span className="fb-icon" />
					<input
						className="facebookloginbutton left"
						type="button"
						value="Sign-in with Facebook"
						name="send"
					/>
				</p>
			</div>
		);
	}
}
