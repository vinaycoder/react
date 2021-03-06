import queryString from 'query-string';
import { getJSONLD } from './lib/jsonld';
import {
	addCartItem,
	deleteCartItem,
	updateCartItemQuantiry,
	fetchMoreProducts,
	setSort,
	fetchShippingMethods,
	fetchPaymentMethods,
	updateCart,
	fetchCart,
	checkout,
	couponCode,
	loginPost,
	logoutPost,
	createUserPost,
	setUserSelectedAddress,
	setUserSelectedCard,
	currentOrder
} from './actions';

const setQuery = (history, query) => {
	if (history && history.location) {
		const newLocation =
			history.location.pathname + '?' + queryString.stringify(query);
		history.push(newLocation);
	}
};

export const mapStateToProps = (state, ownProps) => {
	return {
		state: state.app
	};
};

export const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addCartItem: item => {
			dispatch(addCartItem(item, ownProps.history));
		},
		deleteCartItem: item_id => {
			dispatch(deleteCartItem(item_id));
		},
		updateCartItemQuantiry: (item_id, quantity) => {
			dispatch(updateCartItemQuantiry(item_id, quantity));
		},
		updateCart: (data, callback) => {
			dispatch(updateCart(data, callback));
		},
		fetchCart: () => {
			dispatch(fetchCart());
		},
		couponCode: (type, coupon) => {
			dispatch(couponCode(type, coupon));
		},
		checkout: data => {
			dispatch(checkout(data, ownProps.history));
		},
		loadMoreProducts: () => {
			dispatch(fetchMoreProducts());
		},
		loadShippingMethods: () => {
			dispatch(fetchShippingMethods());
		},
		loadPaymentMethods: () => {
			dispatch(fetchPaymentMethods());
		},
		setSearch: search => {
			const query = queryString.parse(ownProps.history.location.search);
			query.search = search;
			setQuery(ownProps.history, query);
		},
		setSort: sort => {
			dispatch(setSort(sort));
		},
		setPriceFromAndTo: (priceFrom, priceTo) => {
			const query = queryString.parse(ownProps.history.location.search);
			query.price_from = priceFrom;
			query.price_to = priceTo;
			setQuery(ownProps.history, query);
		},
		setPriceFrom: priceFrom => {
			const query = queryString.parse(ownProps.history.location.search);
			query.price_from = priceFrom;
			setQuery(ownProps.history, query);
		},
		setPriceTo: priceTo => {
			const query = queryString.parse(ownProps.history.location.search);
			query.price_to = priceTo;
			setQuery(ownProps.history, query);
		},
		setFilterAttribute: (name, value) => {
			let query = queryString.parse(ownProps.history.location.search);
			const queryKey = name;
			if (query[queryKey] && queryKey !== 'price') {
				query[queryKey] = `${query[queryKey]}_${value}`;
			} else {
				query[queryKey] = [value];
			}
			setQuery(ownProps.history, query);
		},
		unsetFilterAttribute: (name, value) => {
			let query = queryString.parse(ownProps.history.location.search);
			const queryKey = name;
			const values = query[queryKey];
			if (values) {
				if (Array.isArray(values)) {
					query[queryKey] = values.filter(v => v !== value);
				} else if (values.indexOf('_') > 0 && queryKey !== 'price') {
					query[queryKey] = query[queryKey].replace(`${value}_`, '');
					query[queryKey] = query[queryKey].replace(`_${value}`, '');
				} else {
					query[queryKey] = undefined;
				}
			}

			setQuery(ownProps.history, query);
		},
		setLocation: path => {
			ownProps.history.push(path);
		},
		goBack: () => {
			if (ownProps.history.length > 0) {
				ownProps.history.goBack();
			}
		},
		getJSONLD: state => {
			return getJSONLD(state);
		},
		loginPost: data => {
			dispatch(loginPost(data, ownProps.history));
		},
		logoutPost: data => {
			dispatch(logoutPost(data, ownProps.history));
		},
		createUserPost: data => {
			dispatch(createUserPost(data, ownProps.history));
		},
		setUserSelectedAddress: data => {
			dispatch(setUserSelectedAddress(data));
		},
		setUserSelectedCard: data => {
			dispatch(setUserSelectedCard(data));
		},
		currentOrder: orderId => {
			dispatch(currentOrder(orderId));
		}
	};
};
