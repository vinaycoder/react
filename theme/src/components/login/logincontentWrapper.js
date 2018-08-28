import React from 'react';
import PropTypes from 'prop-types';
import api from '../../lib/api';
import { themeSettings, text } from '../../lib/settings';

export default class LogincontentWrapper extends React.Component {
	static propTypes = {
		settings: PropTypes.shape({}).isRequired
	};

	state = {
		products: []
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

		// const { products } = this.state;

		// return <IRSlickSlider products={products} />;

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
