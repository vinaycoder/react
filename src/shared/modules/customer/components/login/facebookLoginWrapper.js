import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { Redirect } from 'react-router-dom';
import { PostData } from '../../../../lib/helper';

export default class FacebookLoginWrapper extends React.Component {
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
	//
	// static propTypes = {
	// 	settings: PropTypes.shape({}).isRequired
	// };

	signup(res, type) {
		let postData;

		if (res.email) {
			postData = {
				name: res.name,
				provider: type,
				email: res.email,
				provider_id: res.id,
				token: res.accessToken,
				provider_pic: res.picture.data.url
			};
		}

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
		// console.log('in Facebook Login js render');

		const { loginPost } = this.props;
		const { isLoggedIn, statsCookieId, customerDetails } = this.state;

		if (this.state.redirect) {
			return <Redirect to="/home" />;
		}

		const responseFacebook = response => {
			console.log(response);
		};

		const componentClicked = response => {
			console.log(response);
		};

		return (
			<div className="login-facebook-wrapper">
				{/*<span className="fb-icon"></span>*/}
				<FacebookLogin
					appId="229678163736140"
					autoLoad
					fields="name,email,picture"
					onClick={componentClicked}
					callback={responseFacebook}
					cssClass="facebookloginbutton left"
				/>
			</div>
		);
	}
}
