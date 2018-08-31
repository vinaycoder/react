import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import FormLogin from '../components/login/formLogin';
import SocialLogin from '../components/login/socialLogin';
import LogincontentWrapper from '../components/login/logincontentWrapper';
import * as helper from '../lib/helper';

const LoginContainer = props => {
	const {
		loginPost,
		state: { isLoggedIn, statsCookieId, customerDetails }
	} = props;

	console.log('Logged in js props	');
	console.log(props);

	return (
		<Fragment>
			<section className="hero is-light">
				<div className="login-strip font-large">
					<h4 className="login-strip-content">Sign In</h4>
				</div>
				<div className="hero-body columns">
					<div className="container column is-6">
						<SocialLogin
							isLoggedIn={isLoggedIn}
							statsCookieId={statsCookieId}
							customerDetails={customerDetails}
							loginPost={loginPost}
						/>
						<FormLogin
							isLoggedIn={isLoggedIn}
							statsCookieId={statsCookieId}
							customerDetails={customerDetails}
							loginPost={loginPost}
						/>
					</div>
					<div className="category-offers-main-wrapper column is-6">
						<LogincontentWrapper
							isLoggedIn={isLoggedIn}
							statsCookieId={statsCookieId}
							customerDetails={customerDetails}
							loginPost={loginPost}
						/>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

LoginContainer.propTypes = {
	loginPost: PropTypes.func,
	state: PropTypes.shape({
		isLoggedIn: PropTypes.shape({}),
		statsCookieId: PropTypes.shape({}),
		customerDetails: PropTypes.shape({})
	}).isRequired
};

export default LoginContainer;
