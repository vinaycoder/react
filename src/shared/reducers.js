import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as t from './actionTypes';

const initialState = {};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case t.PRODUCT_RECEIVE:
			console.log('inside the product reducer');
			return Object.assign({}, state, {
				productDetails: action.product,
				recommendationProducts: []
			});

		case t.PRODUCTS_REQUEST:
			return Object.assign({}, state, { loadingProducts: true });

		case t.PRODUCTS_RECEIVE:
			console.log('inside category reducer');
			if (action.products) {
				return Object.assign({}, state, {
					loadingProducts: false,
					products: action.products.product,
					productsTotalCount: action.products.products_count,
					productsPage: action.products.productsPage,
					productsHasMore: action.products.has_more,
					productsAttributes: action.products.attributes
					// productsMinPrice: action.products.price.min || 0,
					// productsMaxPrice: action.products.price.max || 0
				});
			} else {
				return Object.assign({}, state, {
					products: []
				});
			}

		case t.MORE_PRODUCTS_REQUEST:
			return Object.assign({}, state, { loadingMoreProducts: true });

		case t.MORE_PRODUCTS_RECEIVE:
			return Object.assign({}, state, {
				loadingMoreProducts: false,
				products: [...state.products, ...action.products.product],
				productsTotalCount: action.products.products_count,
				productsPage: action.products.productsPage,
				productsHasMore: action.products.has_more
			});

		case t.PAGE_RECEIVE:
			return Object.assign({}, state, { pageDetails: action.pageDetails });

		case t.CART_RECEIVE:
			return Object.assign({}, state, { cart: action.cart });

		case t.SHIPPING_METHODS_REQUEST:
			return Object.assign({}, state, { loadingShippingMethods: true });

		case t.SHIPPING_METHODS_RECEIVE:
			return Object.assign({}, state, {
				shippingMethods: action.methods,
				loadingShippingMethods: false
			});

		case t.PAYMENT_METHODS_REQUEST:
			return Object.assign({}, state, { loadingPaymentMethods: true });

		case t.PAYMENT_METHODS_RECEIVE:
			return Object.assign({}, state, {
				paymentMethods: action.methods,
				loadingPaymentMethods: false
			});

		case t.CHECKOUT_REQUEST:
			return Object.assign({}, state, { processingCheckout: true });

		case t.CHECKOUT_RECEIVE:
			return Object.assign({}, state, {
				cart: null,
				order: action.order,
				processingCheckout: false
			});

		case t.SITEMAP_RECEIVE:
			return Object.assign({}, state, { currentPage: action.currentPage });

		case t.SET_CURRENT_CATEGORY:
			return Object.assign({}, state, { categoryDetails: action.category });

		case t.SET_PRODUCTS_FILTER:
			return Object.assign({}, state, {
				productFilter: Object.assign({}, state.productFilter, action.filter)
			});

		case t.LOCATION_CHANGED:
			return Object.assign({}, state, { location: action.location });

		case t.PRODUCT_REQUEST:
		case t.PAGE_REQUEST:
		case t.CART_REQUEST:
		case t.CART_ITEM_ADD_REQUEST:
		case t.CART_ITEM_DELETE_REQUEST:
		case t.CART_ITEM_UPDATE_REQUEST:
		case t.SITEMAP_REQUEST:
		case t.LOGIN_REQUEST:
			// return Object.assign({}, state, { location: action.location });
			// console.log('inside LOGIN_REQUEST reducer');
			// console.log(action);
			// console.log(state);

			if (action.data) {
				if (action.data.customer_id !== null) {
					return Object.assign({}, state, {
						isLoggedIn: true,
						statsCookieId: action.data.customer_id,
						customerDetails: action.data
					});
				} else {
					return Object.assign({}, state, {
						isLoggedIn: null,
						statsCookieId: null,
						customerDetails: []
					});
				}
			}
		case t.LOGIN_RECEIVE:
			console.log('inside the login receive reducer');
			console.log(action.data);

			if (action.data) {
				if (action.data.customer_id !== null) {
					console.log('inside the login receive reducer setting state');

					return Object.assign({}, state, {
						isLoggedIn: 1,
						statsCookieId: action.data.customer_id,
						customerDetails: action.data
					});
				} else {
					return Object.assign({}, state, {
						isLoggedIn: null,
						statsCookieId: null,
						customerDetails: []
					});
				}
			}
		case t.COUPON_CODE_REQUEST:
			return Object.assign({}, state, { location: action.location });
		default:
			return state;
	}
};

export default combineReducers({ app: appReducer, form: formReducer });
