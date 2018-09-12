import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import GoogleLoginWrapper from './googleLoginWrapper';
import FacebookLoginWrapper from './facebookLoginWrapper';

export default class SocialLogin extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log('in SocialLogin js render');

		const {
			loginPost,
			createUserPost,
			isLoggedIn,
			statsCookieId,
			customerDetails
		} = this.props;
		// const { isLoggedIn, statsCookieId, customerDetails } = this.state;

		return (
			<div className="account-login">
				<GoogleLoginWrapper
					isLoggedIn={this.props.isLoggedIn}
					statsCookieId={this.props.statsCookieId}
					customerDetails={this.props.customerDetails}
					createUserPost={this.props.createUserPost}
				/>
				<FacebookLoginWrapper
					isLoggedIn={this.props.isLoggedIn}
					statsCookieId={this.props.statsCookieId}
					customerDetails={this.props.customerDetails}
					createUserPost={this.props.createUserPost}
				/>
			</div>
		);
	}
}
