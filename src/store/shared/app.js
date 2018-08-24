import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { animateScroll } from 'react-scroll';
import Time from 'react-time';

import IndexContainer from './containers/index';
import SharedContainer from './containers/shared';
import CategoryContainer from './containers/category';
import ProductContainer from './containers/product';
import PageContainer from './containers/page';
import CheckoutContainer from './containers/checkout';
import CheckoutSuccessContainer from './containers/checkoutSuccess';
import NotFoundContainer from './containers/notfound';
import SearchContainer from './containers/search';
// import LoginContainer from './containers/login';

import { setCurrentPage } from './actions';
import {
	PAGE,
	PRODUCT_CATEGORY,
	PRODUCT,
	RESERVED,
	SEARCH,
	LOGIN
} from './pageTypes';
import cookie from 'react-cookies';

class SwitchContainers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: undefined,
			statsCookieId: undefined
		};
	}

	componentWillReceiveProps(nextProps) {
		this.props.setCurrentPage(nextProps.location);
		console.log(nextProps.location);
		console.log('inside the next props');

		if (nextProps.location && this.props.location) {
			const pathnameChanged =
				nextProps.location.pathname !== this.props.location.pathname;
			const queryChanged =
				nextProps.location.search !== this.props.location.search;
			const isSearchPage = nextProps.location.pathname === '/search';

			if (pathnameChanged || (queryChanged && isSearchPage)) {
				animateScroll.scrollToTop({
					duration: 500,
					delay: 100,
					smooth: true
				});
			}
		}
	}

	componentDidMount() {
		// console.log("currentPage mine");
		// console.log(currentPage);
		// console.log("currentPage.type mine");
		// console.log(currentPage.type);

		if (!cookie.load('statsCookieId')) {
			let timeStamp = Math.floor(Date.now());
			// let now = new Date();
			console.log('Date');
			console.log(timeStamp);
			cookie.save('statsCookieId', timeStamp, { path: '/' });
			this.setState({ statsCookieId: timeStamp });
		}

		if (!cookie.load('isLoggedIn')) {
			let isLoggedIn = 0;

			if (this.state.isLoggedIn) {
				console.log('state set for isLoggedIn');
				isLoggedIn = this.state.isLoggedIn;
			}
			cookie.save('isLoggedIn', isLoggedIn, { path: '/' });
			this.setState({ isLoggedIn: isLoggedIn });
		}

		if (!cookie.load('userQuoteId')) {
			fetch(
				'https://indiarush.com/irapi/customer/getGuestCurrentQuoteId/?version=99.99'
			)
				.then(result => {
					return result.json();
				})
				.then(jsonResult => {
					//	return jsonResult;
					cookie.save('userQuoteId', jsonResult.data.quoteId, { path: '/' });
					this.setState({ quoteId: jsonResult.data.quoteId });
				});
		}
	}

	render() {
		console.log(this.state);
		console.log('inside client side render');
		const { history, location, currentPage } = this.props;
		const locationPathname =
			location && location.pathname ? location.pathname : '/';
		console.log(currentPage);
		console.log(currentPage.type);
		switch (currentPage.type) {
			case PRODUCT:
				console.log('inside the product container');
				return <ProductContainer />;
			case PRODUCT_CATEGORY:
				console.log('inside the category container');
				return <CategoryContainer />;
			case SEARCH:
				return <SearchContainer />;
			// case LOGIN:
			// 		return <LoginContainer />;
			case PAGE:
				if (locationPathname === '/') {
					return <IndexContainer />;
				} else if (locationPathname === '/checkout') {
					return <CheckoutContainer />;
				}
				if (locationPathname === '/checkout-success') {
					return <CheckoutSuccessContainer />;
				} else {
					return <PageContainer />;
				}
			default:
				return <NotFoundContainer />;
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentPage: state.app.currentPage
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setCurrentPage: location => {
			dispatch(setCurrentPage(location));
		}
	};
};

const SwitchContainersConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(SwitchContainers);

const App = () => (
	<SharedContainer>
		<Route component={SwitchContainersConnected} />
	</SharedContainer>
);

export default App;
