import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';

import LoginWrapper from '../components/login/formLogin';
import SocialLogin from '../components/login/socialLogin';
import LogincontentWrapper from '../components/login/logincontentWrapper';

const LoginContainer = props => (
	<Fragment>
		<section className="hero is-light">
			<div className="login-strip font-large">
				<h4 className="login-strip-content">Sign In</h4>
			</div>
			<div className="hero-body columns">
				<div className="container column is-6">
					<SocialLogin />
					<LoginWrapper />
				</div>
				<div className="category-offers-main-wrapper column is-6">
					<LogincontentWrapper />
				</div>
			</div>
		</section>
	</Fragment>
);

LoginContainer.propTypes = {
	state: PropTypes.shape({
		currentPage: PropTypes.shape({}),
		settings: PropTypes.shape({})
	}).isRequired
};

export default LoginContainer;
