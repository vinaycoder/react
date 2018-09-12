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
	dispatch(requestsetUserSelectedAddress(data));

};
const requestsetUserSelectedAddress = data => ({ type: t.SET_SELECTED_USER_ADDRESS , data });

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

	fetch(
		'https://indiarush.com/irapi/customer/getUserAddress/?customer_id=1280427&version=3.99'
	)
		.then(result => {
			return result.json();
		})
		.then(jsonResult => {
			dispatch(receiveShippingMethods(jsonResult.data));
		});
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
		'https://indiarush.com/irapi/checkout/getpaymentmethodslist/?quoteId=14717071&version=3.90'
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
	} else {
		dispatch(
			setCurrentLocation({
				hasHistory: true,
				pathname: locationPathname,
				search: locationSearch,
				hash: locationHash
			})
		);

		//Instead of category page we can get data from all categories list
		//const category = app.categories.find(c => c.path === locationPathname);
		// if (category) {
		// const newCurrentPage = {
		// 	type: 'product-category',
		// 	path: category.path,
		// 	resource: category.id
		// };
		// dispatch(receiveSitemap(newCurrentPage)); // remove .data
		// dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
		// } else {
		const newCurrentPage = await fetch(
			`https://indiarush.com/irapi/promotion/getProductCategoryUrl/?url=https://indiarush.com/${locationPathname}&version=3.64`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				if (jsonResult == 'null') {
					return {
						type: 404,
						path: locationPathname,
						resource: null
					};
				} else {
					if (locationPathname == '/checkout') {
						return {
							type: 'page',
							path: '/checkout',
							resource: '5b6984d45452db221b4044f2'
						};
					} else if (locationPathname == '/search') {
						return {
							type: 'search',
							path: '/search',
							resource: ''
						};
					} else if (locationPathname == '/customer/account/login') {
						return {
							type: 'login',
							path: '/customer/account/login',
							resource: ''
						};
					} else {
						return {
							type: jsonResult.type,
							path: locationPathname,
							resource: jsonResult.id
						};
					}
				}
			});
		console.log('returning new page type');
		console.log(newCurrentPage);
		dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
		dispatch(receiveSitemap(newCurrentPage));

		// const sitemapResponse = await api.ajax.sitemap.retrieve({
		// 	path: locationPathname
		// });
		// if (sitemapResponse.status === 404) {
		// 	dispatch(
		// 		receiveSitemap({
		// 			type: 404,
		// 			path: locationPathname,
		// 			resource: null
		// 		})
		// 	);
		// } else {
		// 	const newCurrentPage = sitemapResponse.json;
		// 	dispatch(receiveSitemap(newCurrentPage));
		// 	dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
		// }
		//}
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
	console.log('in loginPost action');
	dispatch(requestLoginPost());
	const version = 3.81;
	const isOtp = 0;
	// const { app } = getState();
	// const loginDetails = getloginDetails(app.customerDetails);

	fetch(
		`https://indiarush.com/irapi/customer/customerLoginReact/?email=${
			data[0]
		}&password=${data[1]}&isOtp=${isOtp}&version=${version}`
	)
		.then(result => result.json())
		.then(jsonResult => {
			console.log('in loginPost action');
			console.log(jsonResult);

			if (jsonResult.customer_id !== '') {
				console.log('in loginPost action cookie before length');
				if (cookie.load('statsCookieId').length >= 10) {
					console.log('in loginPost action cookie update');
					cookie.save('statsCookieId', jsonResult.customer_id, { path: '/' });
					cookie.save('isLoggedIn', 1, { path: '/' });
				}
				dispatch(receiveLoginPost(jsonResult));
			}

			return jsonResult;
		});
};

// const requestLogoutPost = data => ({ type: t.LOGOUT_REQUEST, data });

export const logoutPost = data => ({
	type: t.LOGOUT_REQUEST,
	data
});

// export const createUserPost = data => ({
// 	type: t.CREATE_USER_REQUEST,
// 	data
// });

const receiveCreateUserPost = data => ({ type: t.CREATE_USER_REQUEST, data });

export const createUserPost = data => async (dispatch, getState) => {
	console.log('in createUserPost action');
	// dispatch(receiveCreateUserPost());
	console.log('data');
	console.log(data);
	const version = 3.83;
	const type = `${data[0]}`;

	// console.log('version');
	// console.log("firstname");
	// console.log(`${data[0]}`);
	// const password =

	if (type == 'Form') {
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
	} else if (type == 'Facebook') {
		console.log('in Facebook login');
	} else if (type == 'google') {
		console.log('in Google login');

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
				console.log('in createUserPost action');
				console.log(jsonResult);

				if (jsonResult.customer_id !== '') {
					console.log('in createUserPost action');
					console.log(jsonResult);
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
	}
};
