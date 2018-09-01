import React from 'react';
import PropTypes from 'prop-types';

export default class LogincontentWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// customerDetails: [],
			// statsCookieId: undefined,
			// isLoggedIn: false
		};
	}

	// static propTypes = {
	// 	settings: PropTypes.shape({}).isRequired
	// };

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
		// console.log('in Login Content Wrapper js render');
		const { loginPost } = this.props;
		const { isLoggedIn, statsCookieId, customerDetails } = this.state;

		return (
			<div className="extra-content loginExtraContent right">
				<div className="login-content-container">
					<div className="login-sub-content-wrapper">
						<p className="login-heading">More options</p>
						<span>2500+ Store to choose from</span>
					</div>
					<div className="login-sub-content-wrapper">
						<p className="login-heading">Wide range of collection</p>
						<span>70,000+ Products to choose from</span>
					</div>
				</div>
			</div>
		);
	}
}
