import queryString from 'query-string';
import { animateScroll } from 'react-scroll';
import cookie from 'react-cookies';
import * as t from './actionTypes';
import {
	PAGE,
	PRODUCT_CATEGORY,
	PRODUCT,
	RESERVED,
	SEARCH,
	LOGIN
} from './pageTypes';
import api from '../client/api';
import * as analytics from './analytics';

const requestProduct = () => ({ type: t.PRODUCT_REQUEST });

const receiveProduct = product => ({ type: t.PRODUCT_RECEIVE, product });

export const fetchProducts = currentPage => async (dispatch, getState) => {
	console.log(currentPage);
	console.log('inside current page');
	dispatch(requestProducts());
	const { app } = getState();
	const filter = getParsedProductFilter(app.productFilter);
	if (!currentPage) {
		currentPage = app.currentPage;
	}
	console.log(app);

	//Default Filter Flow
	let filterListURL = '';
	for (const queryFilter in filter.filters) {
		filterListURL = `${filterListURL}&filters[${queryFilter}]=${
			filter.filters[queryFilter]
		}`;
	}

	//Default sort
	let sortListURl = 'best_seller';
	if (app.productFilter.sort) {
		sortListURl = app.productFilter.sort;
	}
	let products = {};
	//TODO - On changing sorting only the product list should change not filter list.
	if (currentPage.type === PRODUCT_CATEGORY) {
		products = await fetch(
			`https://indiarush.com/irapi/category/getCategoryResult/?category_id=${
				currentPage.resource
			}&sort=${sortListURl}&page=0&item_count=48&version=3.81${filterListURL}`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				console.log('logging category products data');
				return jsonResult.data;
			});
	}
	if (currentPage.type === SEARCH) {
		products = await fetch(
			`https://indiarush.com/irapi/search/getSearchResult/?query=${
				filter.search
			}&sort=${sortListURl}&page=0&item_count=48&version=3.81${filterListURL}`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				console.log('logging search data');
				return jsonResult.data;
			});
	}

	if (products.products_count > 48) {
		products.has_more = true;
	}

	products.productsPage = 0;

	if (currentPage.type === PRODUCT_CATEGORY) {
		products.attributes = await fetch(
			`https://indiarush.com/irapi/category/getCategoryFilters/?category_id=${
				currentPage.resource
			}&version=3.81${filterListURL}`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				return jsonResult.data.filters;
			});
	}
	if (currentPage.type === SEARCH) {
		products.attributes = await fetch(
			`https://indiarush.com/irapi/category/getCategoryFilters/?query=${
				filter.search
			}&version=3.81${filterListURL}`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				return jsonResult.data.filters;
			});
	}

	dispatch(receiveProducts(null));
	dispatch(receiveProducts(products));
};

export const getProductFilterForCategory = (locationSearch, sortBy) => {
	const queryFilter = queryString.parse(locationSearch);
	const attributesList = {};
	for (const querykey in queryFilter) {
		attributesList[querykey] = queryFilter[querykey];
	}
	return {
		priceFrom: parseInt(queryFilter.price_from || 0),
		priceTo: parseInt(queryFilter.price_to || 0),
		attributes: { filters: attributesList },
		search: null,
		sort: sortBy
	};
};

export const getProductFilterForSearch = locationSearch => {
	const queryFilter = queryString.parse(locationSearch);

	return {
		categoryId: null,
		priceFrom: parseInt(queryFilter.price_from || 0),
		priceTo: parseInt(queryFilter.price_to || 0),
		search: queryFilter.search,
		sort: 'search'
	};
};

export const getParsedProductFilter = productFilter => {
	const filter = Object.assign(
		{},
		{
			on_sale: productFilter.onSale,
			search: productFilter.search,
			category_id: productFilter.categoryId,
			price_from: productFilter.priceFrom,
			price_to: productFilter.priceTo,
			sort: productFilter['sort'],
			fields: productFilter['fields'],
			limit: productFilter['limit'],
			offset: 0
		},
		productFilter.attributes
	);

	return filter;
};

const requestProducts = () => ({ type: t.PRODUCTS_REQUEST });

const receiveProducts = products => ({ type: t.PRODUCTS_RECEIVE, products });

export const fetchMoreProducts = () => async (dispatch, getState) => {
	const { app } = getState();
	console.log(app);
	if ((app.productsPage + 1) * 48 > app.productsTotalCount) {
		return;
	}

	const newProductsPage = app.productsPage + 1;

	dispatch(requestMoreProducts());
	const currentPage = app.currentPage;

	const filter = getParsedProductFilter(app.productFilter);

	//Default Filter Flow
	let filterListURL = '';
	for (const queryFilter in filter.filters) {
		filterListURL = `${filterListURL}&filters[${queryFilter}]=${
			filter.filters[queryFilter]
		}`;
	}

	//Default sort
	let sortListURl = 'best_seller';
	if (app.productFilter.sort) {
		sortListURl = app.productFilter.sort;
	}
	let products = {};
	if (currentPage.type === PRODUCT_CATEGORY) {
		products = await fetch(
			`https://indiarush.com/irapi/category/getCategoryResult/?category_id=${
				currentPage.resource
			}&sort=${sortListURl}&page=${newProductsPage}&item_count=48&version=3.81${filterListURL}`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				console.log('logging category products data');
				return jsonResult.data;
			});
	}
	if (currentPage.type === SEARCH) {
		products = await fetch(
			`https://indiarush.com/irapi/search/getSearchResult/?query=${
				filter.search
			}&sort=${sortListURl}&page=${newProductsPage}&item_count=48&version=3.81${filterListURL}`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				console.log('logging category products data');
				return jsonResult.data;
			});
	}

	products.productsPage = newProductsPage;
	if ((newProductsPage + 1) * 48 < products.products_count) {
		products.has_more = true;
	} else {
		products.has_more = false;
	}

	console.log('final dispatch after load more');
	console.log(products);

	dispatch(receiveMoreProducts(products));
	animateScroll.scrollMore(200);
};

const requestMoreProducts = () => ({ type: t.MORE_PRODUCTS_REQUEST });

const receiveMoreProducts = products => ({
	type: t.MORE_PRODUCTS_RECEIVE,
	products
});

const requestPage = () => ({ type: t.PAGE_REQUEST });

const receivePage = pageDetails => ({ type: t.PAGE_RECEIVE, pageDetails });

export const fetchCart = () => async (dispatch, getState) => {
	dispatch(requestCart());
	var pincode = '';
	if (localStorage.getItem('userPincode') !== null) {
		pincode = localStorage.getItem('userPincode');
	}
	const quoteId = cookie.load('userQuoteId');
	fetch(
		'https://indiarush.com/irapi/cart/getShoppingCartInfo?quote_id=' +
			quoteId +
			'&pincode=' +
			pincode +
			'&reset_payment=1' +
			'&version=' +
			'99.99'
	)
		.then(result => {
			return result.json();
		})
		.then(jsonResult => {
			dispatch(receiveCart(jsonResult.data));
			dispatch(fetchShippingMethods());
		});
};

const requestCart = () => ({ type: t.CART_REQUEST });

export const couponCode = (type, coupon) => async (dispatch, getState) => {
	dispatch(requestCouponCode());

	const quoteId = cookie.load('userQuoteId');
	if (type == 'apply') {
		var url =
			'https://indiarush.com/irapi/cart/applyCoupon?quoteId=' +
			quoteId +
			'&coupan=' +
			coupon;
	}
	if (type == 'remove') {
		var url =
			'https://indiarush.com/irapi/cart/applyCoupon?quoteId=' +
			quoteId +
			'&coupan=' +
			coupon +
			'&remove=1';
	}

	fetch(url)
		.then(result => {
			return result;
		})
		.then(jsonResult => {
			dispatch(fetchCart());
		});
};
const requestCouponCode = () => ({ type: t.COUPON_CODE_REQUEST });

export const setUserSelectedAddress = data => async (dispatch, getState) => {
	// map quote id to user address
	const quoteId = cookie.load('userQuoteId');
	fetch(`https://indiarush.com/irapi/checkout/mapQuoteAddress?quote_id=${quoteId}&address_id=${data.entity_id}&version=3.75`)
		.then(result => {
			return result.json();
		})
		.then(jsonResult => {
			dispatch(fetchCart());
		});

	dispatch(requestsetUserSelectedAddress(data));
};
const requestsetUserSelectedAddress = data => ({
	type: t.SET_SELECTED_USER_ADDRESS,
	data
});

export const setUserSelectedCard = data => async (dispatch, getState) => {
	dispatch(requestsetUserSelectedCard(data));
};

const requestsetUserSelectedCard = data => ({
	type: t.SET_SELECTED_USER_CARD_DETAILS,
	data
});

export const currentOrder = orderId => async (dispatch, getState) =>
{
	fetch(`https://indiarush.com/irapi/customer/getSalesOrderInfo/?order_id=${orderId}&version=3.95`)
		.then(result => {
			return result.json();
		})
		.then(jsonResult => {
		//	dispatch(fetchCart());
		dispatch(requestNewOrder(jsonResult));
		});
};

const requestNewOrder = data => ({ type: t.CURRENT_ORDER, data });

const receiveCart = cart => ({ type: t.CART_RECEIVE, cart });

export const addCartItem = (item, history) => async (dispatch, getState) => {
	dispatch(requestAddCartItem());
	// calling for the quote
	/*
	const NewQuoteId= await fetch('https://indiarush.com/irapi/customer/getGuestCurrentQuoteId/?version=99.99')
	.then((result) => {
		return result.json();
	}).then((jsonResult) => {
		return jsonResult;
	})
	*/

	if (item.variant_id) {
		item.product_id = item.variant_id;
	}

	console.log('item.product_id');
	console.log(item.product_id);

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
	const quoteId = cookie.load('userQuoteId');

	//const saveToCart= await fetch('https://indiarush.com/irapi/cart/productAddToCart?itemId=""&product='+item.product_id+'&quote_id=13880914'+'&isAjax='+"1"+'&current_p_id=""'+'&product_quantity='+item.quantity)
	const saveToCart = await fetch(
		'https://indiarush.com/irapi/cart/productAddToCart?itemId=""&product=' +
			item.product_id +
			'&quote_id=' +
			quoteId +
			'&isAjax=' +
			'1' +
			'&current_p_id=""' +
			'&product_quantity=' +
			item.quantity
	)
		.then(result => {
			return result.json();
		})
		.then(jsonResult => {
			return jsonResult;
		});

	// calling for get cart details
	var pincode = '';
	if (localStorage.getItem('userPincode') !== null) {
		pincode = localStorage.getItem('userPincode');
	}
	const getCartDetails = await fetch(
		'https://indiarush.com/irapi/cart/getShoppingCartInfo?quote_id=' +
			quoteId +
			'&pincode=' +
			pincode +
			'&reset_payment=1' +
			'&version=' +
			'99.99'
	)
		.then(result => {
			return result.json();
		})
		.then(jsonResult => {
			return jsonResult;
		});

	// console.log(getCartDetails);

	// console.log(NewQuoteId);

	const response = getCartDetails.data;
	const cart = getCartDetails.data;
	// const response = await api.ajax.cart.addItem(item);
	// const cart = response.json;
	dispatch(receiveCart(cart));
	if (item.type == 'buyNow') {
		history.push('/checkout');
	}
	// const cart = response.json;
	// dispatch(receiveCart(cart));
	analytics.addCartItem({
		item: item,
		cart: cart
	});
};

export const getLoginDetails = currentPage => async (dispatch, getState) => {
	// dispatch(requestProduct());
	// const { app } = getState();
	// console.log(app);
	// let product = {};
	// let alreadyData = 0;

	console.log('getLoginDetails');

	// dispatch(receiveProduct(null));
	// dispatch(receiveProduct(product));
};

export const getProductDetails = currentPage => async (dispatch, getState) => {
	dispatch(requestProduct());
	const { app } = getState();
	console.log(app);
	let product = {};
	let alreadyData = 0;
	if (app.products) {
		console.log('loading using category data node');
		for (const key in app.products) {
			if (app.products[key].product_id == currentPage.resource) {
				product = app.products[key];
				alreadyData = 1;
			}
		}
	}
	console.log('changes for same');
	/*
	if (this.state.recommendationProducts) {
		console.log('loading using category data node');
		for (const key in this.state.recommendationProducts) {
			console.log('this.state.recommendationProducts.product_id');
			console.log(this.state.recommendationProducts.product_id);

			console.log('currentPage.resource');
			console.log(currentPage.resource);

			if (
				this.state.recommendationProducts.product_id == currentPage.resource
			) {
				console.log('abhinesh');
				// product = app.products[key];
				alreadyData = 1;
			}
		}
	}
*/

	if (`${currentPage.resource}`) {
		const viewedProducts = getArrayFromLocalStorage();
		if (viewedProducts.includes(`${currentPage.resource}`)) {
			const index = viewedProducts.indexOf(`${currentPage.resource}`);
			viewedProducts.splice(index, 1);
			viewedProducts.push(`${currentPage.resource}`);
		} else {
			viewedProducts.push(`${currentPage.resource}`);
		}
		localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
	}

	if (alreadyData === 0) {
		product = await fetch(
			`https://indiarush.com/irapi/product/getProductDetail/?product_id=${
				currentPage.resource
			}&version=3.81`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				return jsonResult.data;
			});
	}

	dispatch(receiveProduct(null));
	dispatch(receiveProduct(product));
};

const requestAddCartItem = () => ({ type: t.CART_ITEM_ADD_REQUEST });

export const updateCartItemQuantiry = (item_id, quantity) => async (
	dispatch,
	getState
) => {
	dispatch(requestUpdateCartItemQuantiry());
	const quoteId = cookie.load('userQuoteId');
	const removeStatus = await fetch(
		'https://indiarush.com/irapi/cart/updateQuantityonCartUpdate?quote_id=' +
			quoteId +
			'&item_id=' +
			item_id +
			'&new_quantity=' +
			quantity +
			'&version=' +
			'99.99'
	)
		.then(result => {
			return result;
		})
		.then(jsonResult => {
			return jsonResult;
		});
	var pincode = '';
	if (localStorage.getItem('userPincode') !== null) {
		pincode = localStorage.getItem('userPincode');
	}
	if (removeStatus) {
		fetch(
			'https://indiarush.com/irapi/cart/getShoppingCartInfo?quote_id=' +
				quoteId +
				'&pincode=' +
				pincode +
				'&reset_payment=1' +
				'&version=' +
				'99.99'
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				dispatch(receiveCart(jsonResult.data));
				dispatch(fetchShippingMethods());
			});
	}
	////  for update quantity
	// const response = await api.ajax.cart.updateItem(item_id, {
	// 	quantity: quantity
	// });
};

const requestUpdateCartItemQuantiry = () => ({
	type: t.CART_ITEM_UPDATE_REQUEST
});

export const deleteCartItem = item_id => async (dispatch, getState) => {
	dispatch(requestDeleteCartItem());

	const { app } = getState();
	//  for deleting cart item
	const quoteId = cookie.load('userQuoteId');
	const removeStatus = await fetch(
		'https://indiarush.com/irapi/cart/remove?quote_id=' +
			quoteId +
			'&item_id=' +
			item_id +
			'&version=' +
			'99.99'
	)
		.then(result => {
			return result;
		})
		.then(jsonResult => {
			return jsonResult;
		});
	var pincode = '';
	if (localStorage.getItem('userPincode') !== null) {
		pincode = localStorage.getItem('userPincode');
	}
	if (removeStatus) {
		fetch(
			'https://indiarush.com/irapi/cart/getShoppingCartInfo?quote_id=' +
				quoteId +
				'&pincode=' +
				pincode +
				'&reset_payment=1' +
				'&version=' +
				'99.99'
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				dispatch(receiveCart(jsonResult.data));
				dispatch(fetchShippingMethods());
				// this.props.state.cart = jsonResult.data;
				// this.setState({
				//  cart: jsonResult.data
				// });
			});
	}

	//const response = await api.ajax.cart.deleteItem(item_id);

	// analytics.deleteCartItem({
	// 	itemId: item_id,
	// 	cart: app.cart
	// });
};

const requestDeleteCartItem = () => ({ type: t.CART_ITEM_DELETE_REQUEST });

export const fetchShippingMethods = () => async (dispatch, getState) => {
	dispatch(requestShippingMethods());
	const isLoggedIn = cookie.load('isLoggedIn');
	if (isLoggedIn == 1) {
		var customerId = cookie.load('statsCookieId');
		var version = 3.9;

		fetch(
			`https://indiarush.com/irapi/customer/getUserAddress/?customer_id=${customerId}&version=${version}`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				dispatch(receiveShippingMethods(jsonResult.data));
			});
	}
};

const requestPaymentMethods = () => ({ type: t.PAYMENT_METHODS_REQUEST });

const receivePaymentMethods = methods => ({
	type: t.PAYMENT_METHODS_RECEIVE,
	methods
});

export const fetchPaymentMethods = () => async (dispatch, getState) => {
	dispatch(requestPaymentMethods());
	const quoteId = cookie.load('userQuoteId');
	fetch(
		'https://indiarush.com/irapi/checkout/getpaymentmethodslist/?quoteId=' +
			quoteId +
			'&version=3.90'
	)
		.then(result => {
			return result.json();
		})
		.then(jsonResult => {
			dispatch(receivePaymentMethods(jsonResult));
		});
};

const requestShippingMethods = () => ({ type: t.SHIPPING_METHODS_REQUEST });

const receiveShippingMethods = methods => ({
	type: t.SHIPPING_METHODS_RECEIVE,
	methods
});

export const checkout = (cart, history) => async (dispatch, getState) => {
	dispatch(requestCheckout());
	if (cart) {
		await api.ajax.cart.update({
			shipping_address: cart.shipping_address,
			billing_address: cart.billing_address,
			email: cart.email,
			mobile: cart.mobile,
			payment_method_id: cart.payment_method_id,
			shipping_method_id: cart.shipping_method_id,
			comments: cart.comments
		});
	}

	const cartResponse = await api.ajax.cart.retrieve();
	const chargeNeeded = !!cartResponse.json.payment_token;

	if (chargeNeeded) {
		const chargeResponse = await api.ajax.cart.client.post('/cart/charge');
		const chargeSucceeded = chargeResponse.status === 200;
		if (!chargeSucceeded) {
			return;
		}
	}

	const response = await api.ajax.cart.checkout();
	const order = response.json;
	dispatch(receiveCheckout(order));
	history.push('/checkout-success');
	analytics.checkoutSuccess({ order: order });
};

const requestCheckout = () => ({ type: t.CHECKOUT_REQUEST });

const receiveCheckout = order => ({ type: t.CHECKOUT_RECEIVE, order });

export const receiveSitemap = currentPage => ({
	type: t.SITEMAP_RECEIVE,
	currentPage
});

export const setCurrentLocation = location => ({
	type: t.LOCATION_CHANGED,
	location
});

export const setCategory = categoryId => (dispatch, getState) => {
	const { app } = getState();
	const category = app.categories.find(c => c.id === categoryId);
	console.log(category);
	console.log('getting category from state categories filter');
	if (category) {
		dispatch(setCurrentCategory(category));
		dispatch(setProductsFilter({ categoryId: categoryId }));
		dispatch(receiveProduct(null));
	}
};

const setCurrentCategory = category => ({
	type: t.SET_CURRENT_CATEGORY,
	category
});

export const setSort = sort => (dispatch, getState) => {
	dispatch(setProductsFilter({ sort: sort }));
	dispatch(fetchProducts());
};

const setProductsFilter = filter => ({
	type: t.SET_PRODUCTS_FILTER,
	filter: filter
});

export const analyticsSetShippingMethod = method_id => (dispatch, getState) => {
	const { app } = getState();
	analytics.setShippingMethod({
		methodId: method_id,
		allMethods: app.shippingMethods
	});
};

export const analyticsSetPaymentMethod = method_id => (dispatch, getState) => {
	const { app } = getState();
	analytics.setPaymentMethod({
		methodId: method_id,
		allMethods: app.paymentMethods
	});
};

export const updateCart = (data, callback) => async (dispatch, getState) => {
	const response = await api.ajax.cart.update(data);
	const newCart = response.json;
	dispatch(receiveCart(newCart));
	if (typeof callback === 'function') {
		callback(newCart);
	}
};

export const setCurrentPage = location => async (dispatch, getState) => {
	console.log('calling set current opage');
	let locationPathname = '/404';
	let locationSearch = '';
	let locationHash = '';
	console.log(location);

	if (location) {
		locationPathname = location.pathname;
		locationSearch = location.search;
		locationHash = location.hash;
	}

	const { app } = getState();
	console.log(app);
	console.log('changes for app');
	let statePathname = '/404';
	let stateSearch = '';
	let stateHash = '';

	console.log(app.location);
	if (app.location) {
		statePathname = app.location.pathname;
		stateSearch = app.location.search;
		stateHash = app.location.hash;
	}

	const currentPageAlreadyInState =
		statePathname === locationPathname && stateSearch === locationSearch;

	console.log(currentPageAlreadyInState);

	if (currentPageAlreadyInState) {
		// same page
		console.log('i am in same page');
	} else {
		dispatch(
			setCurrentLocation({
				hasHistory: true,
				pathname: locationPathname,
				search: locationSearch,
				hash: locationHash
			})
		);

		let newCurrentPage = {};
		if (location.state) {
			newCurrentPage = {
				type: location.state.type,
				path: locationPathname,
				resource: location.state.id
			};
			console.log('inside the new page');
			console.log(newCurrentPage);
			dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
			dispatch(receiveSitemap(newCurrentPage));
		} else if (locationPathname == '/checkout') {
			newCurrentPage = {
				type: 'page',
				path: '/checkout',
				resource: ''
			};
			dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
			dispatch(receiveSitemap(newCurrentPage));
		}else if (locationPathname == '/checkout-success') {
			newCurrentPage = {
				type: 'page',
				path: '/checkout-success',
				resource: ''
			};
			dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
			dispatch(receiveSitemap(newCurrentPage));
		}
		 else if (locationPathname == '/search') {
			newCurrentPage = {
				type: 'search',
				path: '/search',
				resource: ''
			};
			dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
			dispatch(receiveSitemap(newCurrentPage));
		} else if (locationPathname == '/customer/account/login') {
			newCurrentPage = {
				type: 'login',
				path: '/customer/account/login',
				resource: ''
			};
			dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
			dispatch(receiveSitemap(newCurrentPage));
		} else {
			await fetch(
				`https://indiarush.com/irapi/promotion/getProductCategoryUrl/?url=https://indiarush.com/${locationPathname}&version=3.64`
			)
				.then(result => {
					return result.json();
				})
				.then(jsonResult => {
					if (jsonResult == 'null') {
						newCurrentPage = {
							type: 404,
							path: locationPathname,
							resource: null
						};
						dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
						dispatch(receiveSitemap(newCurrentPage));
					} else {
						newCurrentPage = {
							type: jsonResult.type,
							path: locationPathname,
							resource: jsonResult.id
						};
						dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
						dispatch(receiveSitemap(newCurrentPage));
					}
				});
		}
		console.log('returning new page type');
		console.log(newCurrentPage);
	}
};

const fetchDataOnCurrentPageChange = currentPage => (dispatch, getState) => {
	const { app } = getState();
	let productFilter = null;

	// clear product data
	dispatch(receiveProduct(null));

	console.log('app data on fetchDataOnCurrentPageChange');
	console.log(app);

	analytics.pageView({
		path: currentPage.path,
		title: '-'
	});
	console.log('inside fetch data');
	console.log(currentPage);
	switch (currentPage.type) {
		case PRODUCT_CATEGORY:
			productFilter = getProductFilterForCategory(
				app.location.search,
				app.productFilter.sort
			);
			console.log(productFilter);

			dispatch(setCategory(currentPage.resource));
			dispatch(setProductsFilter(productFilter));
			dispatch(fetchProducts(currentPage));
			break;
		case SEARCH:
			productFilter = getProductFilterForSearch(
				app.location.search,
				app.productFilter.sort
			);
			dispatch(setProductsFilter(productFilter));
			dispatch(fetchProducts(currentPage));
			analytics.search({ searchText: productFilter.search });
			break;
		case PRODUCT:
			dispatch(getProductDetails(currentPage));
			// const productData = currentPage.data;
			// dispatch(receiveProduct(productData));
			// analytics.productView({ product: productData });
			break;
		case LOGIN:
			dispatch(getLoginDetails(app));
			// const productData = currentPage.data;
			// dispatch(receiveProduct(productData));
			// analytics.productView({ product: productData });
			break;
		case PAGE:
			const pageData = currentPage.data;
			dispatch(receivePage(pageData));
			if (currentPage.path === '/checkout') {
				analytics.checkoutView({ order: app.cart });
			}
			break;
	}
};

export const getArrayFromLocalStorage = () => {
	let values = [];

	const viewedProducts = localStorage.getItem('viewedProducts');
	try {
		if (viewedProducts && viewedProducts.length > 0) {
			const viewedProductsParsed = JSON.parse(viewedProducts);
			if (Array.isArray(viewedProductsParsed)) {
				values = viewedProductsParsed;
			}
		}
	} catch (e) {
		//
	}
	return values;
};

const requestLoginPost = data => ({ type: t.LOGIN_REQUEST, data });

const receiveLoginPost = data => ({ type: t.LOGIN_RECEIVE, data });

export const loginPost = data => async (dispatch, getState) => {
	// console.log('in loginPost action');
	// dispatch(requestLoginPost());
	const version = 3.81;
	const isOtp = 0;
	// const { app } = getState();
	// const loginDetails = getloginDetails(app.customerDetails);

	if (data[0] === '' && data[1] === '') {
		return {};
	}

	fetch(
		`https://indiarush.com/irapi/customer/customerLoginReact/?email=${
			data[0]
		}&password=${data[1]}&isOtp=${isOtp}&version=${version}`
	)
		.then(result => result.json())
		.then(jsonResult => {
			console.log('in loginPost action');
			console.log(jsonResult);

			if (jsonResult.status !== 'fail') {
				if (jsonResult.customer_id !== '') {
					console.log('in loginPost action cookie before length');
					// if (cookie.load('statsCookieId').length >= 10) {
					// 	console.log('in loginPost action cookie update');
					// 	cookie.save('statsCookieId', jsonResult.customer_id, { path: '/' });
					// 	cookie.save('isLoggedIn', 1, { path: '/' });
					// }
					console.log('in login jsonResult');
					console.log(jsonResult);

					dispatch(receiveLoginPost(jsonResult));

					return fetch(
						`https://indiarush.com/irapi/customer/getCustomerQuoteId/?customerId=${
							jsonResult.customer_id
						}&version=${version}`
					)
						.then(result => result.json())
						.then(jsonResult => {
							const quoteId = jsonResult.data.quoteId;
							const tempQuoteId = cookie.load('userQuoteId');

							cookie.save('userQuoteId', jsonResult.data.quoteId, {
								path: '/'
							});

							return fetch(
								`https://indiarush.com/irapi/customer/getCustomertoCustomerMerge/?quoteId=${quoteId}&tempQuoteId=${tempQuoteId}&version=${version}`
							)
								.then(result => result.json())
								.then(jsonResult => {
									// return jsonResult.data.user;
									// history.push('/');
								});
						});
				}
			}

			return jsonResult;
		});
};

// const requestLogoutPost = data => ({ type: t.LOGOUT_REQUEST, data });

const dispatchlogoutPost = data => ({
	type: t.LOGOUT_REQUEST,
	data
});

export const logoutPost = (data, history) => async (dispatch, getState) => {
	dispatch(dispatchlogoutPost(data));
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
				// this.setState({ quoteId: jsonResult.data.quoteId });
			});
	}
};

// export const createUserPost = data => ({
// 	type: t.CREATE_USER_REQUEST,
// 	data
// });

const receiveCreateUserPost = data => ({ type: t.CREATE_USER_REQUEST, data });

export const createUserPost = (data, history) => async (dispatch, getState) => {
	const version = 3.83;
	const type = `${data[0]}`;

	// console.log(data);
	// return false;

	if (type === 'Form') {
		const name = `${data[1]}`;
		const email = `${data[2]}`;
		const telephone_number = `${data[3]}`;
		const gender = `${data[4]}`;
		const password = `${data[5]}`;

		fetch(
			`https://indiarush.com/irapi/customer/createCustomer/?firstname=${name}&password=${password}&gender=${gender}&telephone_number=${telephone_number}&email=${email}&version_name=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				console.log('in createUserPost action');
				console.log(jsonResult);

				if (jsonResult === 1) {
					// 	console.log('in loginPost action cookie before length');
					// 	if (cookie.load('statsCookieId').length >= 10) {
					// 		console.log('in loginPost action cookie update');
					// 		cookie.save('statsCookieId', jsonResult.customer_id, { path: '/' });
					// 		cookie.save('isLoggedIn', 1, { path: '/' });
					// 	}
					// 	dispatch(receiveLoginPost(jsonResult));
				}

				return jsonResult;
			});
	} else if (type === 'Facebook') {
		console.log('in Facebook login');
	} else if (type === 'google') {
		const name = `${data[1]}`;
		const email = `${data[2]}`;
		const fbid = `${data[3]}`;
		const accessToken = `${data[4]}`;
		const profilePicUrl = `${data[5]}`;
		const firstname = `${data[6]}`;
		const lastname = `${data[7]}`;

		fetch(
			`https://indiarush.com/irapi/customer/byFacebook/?firstname=${firstname}&lastname=${lastname}&email=${email}&fbid=${fbid}&profilePicUrl=${profilePicUrl}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				if (jsonResult.customer_id !== '') {
					const customerId = jsonResult.customer_id;
					return fetch(
						`https://indiarush.com/irapi/customer/initCustomerApi/?customer_id=${customerId}&version=${version}`
					)
						.then(result => result.json())
						.then(jsonResult => {
							dispatch(receiveCreateUserPost(jsonResult.data.user));
							console.log('after dispatch');
							return fetch(
								`https://indiarush.com/irapi/customer/getCustomerQuoteId/?customerId=${customerId}&version=${version}`
							)
								.then(result => result.json())
								.then(jsonResult => {
									const quoteId = jsonResult.data.quoteId;
									const tempQuoteId = cookie.load('userQuoteId');

									cookie.save('userQuoteId', jsonResult.data.quoteId, {
										path: '/'
									});

									return fetch(
										`https://indiarush.com/irapi/customer/getCustomertoCustomerMerge/?quoteId=${quoteId}&tempQuoteId=${tempQuoteId}&version=${version}`
									)
										.then(result => result.json())
										.then(jsonResult => {
											// return jsonResult.data.user;
											// history.push('/');
										});
								});

							return jsonResult.data.user;
						});
				}
			});
	} else if (type === 'checkout') {
		const username = `${data[1]}`;

		fetch(
			`https://indiarush.com/irapi/customer/checkRegisteredUser/?username=${username}&version=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				console.log('in checkout action');
				console.log(jsonResult);

				if (Object.keys(jsonResult.data).length > 0) {
					var customerId = jsonResult.data.customer_id;

					if (
						customerId == '' ||
						customerId == 'null' ||
						customerId == undefined
					) {
						return {};
					}

					return fetch(
						`https://indiarush.com/irapi/customer/initCustomerApi/?customer_id=${customerId}&version=${version}`
					)
						.then(result => result.json())
						.then(jsonResult => {
							dispatch(requestLoginPost(jsonResult.data.user));
							return fetch(
								`https://indiarush.com/irapi/customer/getCustomerQuoteId/?customerId=${customerId}&version=${version}`
							)
								.then(result => result.json())
								.then(jsonResult => {
									const quoteId = jsonResult.data.quoteId;
									const tempQuoteId = cookie.load('userQuoteId');

									cookie.save('userQuoteId', jsonResult.data.quoteId, {
										path: '/'
									});

									return fetch(
										`https://indiarush.com/irapi/customer/getCustomertoCustomerMerge/?quoteId=${quoteId}&tempQuoteId=${tempQuoteId}&version=${version}`
									)
										.then(result => result.json())
										.then(jsonResult => {
											// dispatch(receiveCreateUserPost(jsonResult.data.user));
											// return jsonResult.data.user;
											// history.push('/');
										});
								});

							return jsonResult.data.user;
						});
				} else {
					let jsonResult = {};
					if (!isNaN(username)) {
						jsonResult = { telephone_number: username };
					} else {
						jsonResult = { email: username };
					}
					dispatch(receiveGuestLoginUserPost(jsonResult));
					// return jsonResult;
				}
			});
	}
};

const receiveGuestLoginUserPost = data => ({
	type: t.CREATE__GUEST_USER_REQUEST,
	data
});
