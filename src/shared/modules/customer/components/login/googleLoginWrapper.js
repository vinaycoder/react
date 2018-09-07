import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// import { GoogleLogout } from 'react-google-login';

export default class GoogleLoginWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginError: false,
			redirect: false
			// customerDetails: [],
			// statsCookieId: undefined,
			// isLoggedIn: false
		};
		this.signup = this.signup.bind(this);
	}

	// static propTypes = {
	// 	settings: PropTypes.shape({}).isRequired
	// };

	signup(res, type) {
		let postData;
		// if (res.w3.U3) {
		// 	postData = {
		// 		name: res.w3.ig,
		// 		provider: type,
		// 		email: res.w3.U3,
		// 		provider_id: res.El,
		// 		token: res.Zi.access_token,
		// 		provider_pic: res.w3.Paa
		// 	};
		// }

		if (postData) {
			// PostData('signup', postData).then(result => {
			// 	const responseJson = result;
			// 	// sessionStorage.setItem('userData', JSON.stringify(responseJson));
			// 	this.setState({ redirect: true });
			// });

			this.setState({ redirect: true });
		} else {
		}
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
		// console.log('in Google Login js render');

		const { loginPost } = this.props;
		const { isLoggedIn, statsCookieId, customerDetails } = this.state;

		if (this.state.redirect) {
			return <Redirect to="/home" />;
		}

		const responseGoogle = response => {
			console.log(response);
			this.signup(response, 'google');
		};

		// const logout = response => {
		// 	console.log(response);
		// 	// this.signup(response);
		// };

		return (
			<div>
				<GoogleLogin
					clientId="244528057342-jr5lrknvmuetso2r992rl64o9pk4scvq.apps.googleusercontent.com"
					buttonText="Sign in with Google"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					className="googleloginbuttonmain"
				/>
			</div>
		);
	}
}
