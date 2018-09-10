import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { Redirect } from 'react-router-dom';
import { PostData } from '../../../../lib/helper';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginError: false,
			redirect: false
		};
		// this.signup = this.signup.bind(this);
	}

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
		// console.log('in Facebook Login js render');

		const { loginPost } = this.props;
		const { isLoggedIn, statsCookieId, customerDetails } = this.state;

		return <div className="login-facebook-wrapper">Dashboard</div>;
	}
}
