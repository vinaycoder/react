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
import Dashboard from './components/myAccount/dashboard';

const LoginContainer = props => {
	const {
		loginPost,
		logoutPost,
		createUserPost,
		state: { isLoggedIn, statsCookieId, customerDetails }
	} = props;

	// console.log('Logged in js props	');
	// console.log(props.state);
	// console.log(Object.keys(this.props.customerDetails).length);
	// if(props.customerDetails != null)
	if (props.state.customerDetails != null) {
		if (Object.keys(props.state.customerDetails).length > 0) {
			return (
				<Fragment>
					<section className="hero is-light">
						<div className="login-strip font-large">
							<h4 className="login-strip-content">Sign In</h4>
						</div>
						<div className="hero-body columns">
							<div className="container column is-5">
								<Dashboard
									isLoggedIn={isLoggedIn}
									statsCookieId={statsCookieId}
									customerDetails={customerDetails}
									loginPost={loginPost}
									createUserPost={createUserPost}
								/>
							</div>
						</div>
					</section>
				</Fragment>
			);
		}
	}

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
							createUserPost={createUserPost}
						/>

						<OrDiv />

						<FormLogin
							isLoggedIn={isLoggedIn}
							statsCookieId={statsCookieId}
							customerDetails={customerDetails}
							loginPost={loginPost}
							createUserPost={createUserPost}
						/>
					</div>
					<div className="container column is-6 loginExtraContent">
						<LogincontentWrapper
							isLoggedIn={isLoggedIn}
							statsCookieId={statsCookieId}
							customerDetails={customerDetails}
							loginPost={loginPost}
							createUserPost={createUserPost}
						/>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

LoginContainer.propTypes = {
	loginPost: PropTypes.func,
	logoutPost: PropTypes.func,
	createUserPost: PropTypes.func,
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
