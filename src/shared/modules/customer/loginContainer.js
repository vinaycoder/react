import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';
import MetaTags from '../common/components/metaTags';
import FormLogin from './components/login/formLogin';
import SocialLogin from './components/login/socialLogin';
import LogincontentWrapper from './components/login/logincontentWrapper';
import * as helper from '../../lib/helper';
import OrDiv from './components/login/orDiv';

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
					<div className="container column is-5">
						<SocialLogin
							isLoggedIn={isLoggedIn}
							statsCookieId={statsCookieId}
							customerDetails={customerDetails}
							loginPost={loginPost}
						/>

						<OrDiv />

						<FormLogin
							isLoggedIn={isLoggedIn}
							statsCookieId={statsCookieId}
							customerDetails={customerDetails}
							loginPost={loginPost}
						/>
					</div>
					<div className="container column is-6 loginExtraContent">
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

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LoginContainer)
);
