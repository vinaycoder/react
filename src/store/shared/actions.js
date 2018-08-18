import * as t from './actionTypes';
import { PAGE, PRODUCT_CATEGORY, PRODUCT, RESERVED, SEARCH } from './pageTypes';
import queryString from 'query-string';
import { animateScroll } from 'react-scroll';
import api from '../client/api';
import * as analytics from './analytics';
import cookie from 'react-cookies';

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

	//TODO - On changing sorting only the product list should change not filter list.

	const products = await fetch(
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

	if (products.products_count > 48) {
		products.has_more = true;
	}

	products.productsPage = 0;

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

	dispatch(receiveProducts(null));
	dispatch(receiveProducts(products));
};

export const getProductFilterForCategory = (locationSearch, sortBy) => {
	const queryFilter = queryString.parse(locationSearch);
	let attributesList = {};
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

	const products = await fetch(
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
	const response = await api.ajax.cart.retrieve();
	const cart = response.json;
	dispatch(receiveCart(cart));
};

const requestCart = () => ({ type: t.CART_REQUEST });

const receiveCart = cart => ({ type: t.CART_RECEIVE, cart });

export const addCartItem = item => async (dispatch, getState) => {
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
	const getCartDetails = await fetch(
		'https://indiarush.com/irapi/cart/getShoppingCartInfo?quote_id=' +
			quoteId +
			'&pincode=""' +
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
	// const cart = response.json;
	// dispatch(receiveCart(cart));
	analytics.addCartItem({
		item: item,
		cart: cart
	});
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

	if (alreadyData === 0) {
		console.log('loading using api');
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

	console.log(product);
	dispatch(receiveProduct(null));
	dispatch(receiveProduct(product));
};

const requestAddCartItem = () => ({ type: t.CART_ITEM_ADD_REQUEST });

export const updateCartItemQuantiry = (item_id, quantity) => async (
	dispatch,
	getState
) => {
	dispatch(requestUpdateCartItemQuantiry());
	const response = await api.ajax.cart.updateItem(item_id, {
		quantity: quantity
	});
	dispatch(receiveCart(response.json));
	dispatch(fetchShippingMethods());
};

const requestUpdateCartItemQuantiry = () => ({
	type: t.CART_ITEM_UPDATE_REQUEST
});

export const deleteCartItem = item_id => async (dispatch, getState) => {
	dispatch(requestDeleteCartItem());
	const { app } = getState();
	const response = await api.ajax.cart.deleteItem(item_id);
	dispatch(receiveCart(response.json));
	dispatch(fetchShippingMethods());
	analytics.deleteCartItem({
		itemId: item_id,
		cart: app.cart
	});
};

const requestDeleteCartItem = () => ({ type: t.CART_ITEM_DELETE_REQUEST });

export const fetchPaymentMethods = () => async (dispatch, getState) => {
	dispatch(requestPaymentMethods());
	const response = await api.ajax.paymentMethods.list();
	dispatch(receivePaymentMethods(response.json));
};

const requestPaymentMethods = () => ({ type: t.PAYMENT_METHODS_REQUEST });

const receivePaymentMethods = methods => ({
	type: t.PAYMENT_METHODS_RECEIVE,
	methods
});

export const fetchShippingMethods = () => async (dispatch, getState) => {
	dispatch(requestShippingMethods());
	const response = await api.ajax.shippingMethods.list();
	dispatch(receiveShippingMethods(response.json));
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
					return {
						type: jsonResult.type,
						path: locationPathname,
						resource: jsonResult.id
					};
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
			productFilter = getProductFilterForSearch(app.location.search);
			dispatch(setProductsFilter(productFilter));
			dispatch(fetchProducts());
			analytics.search({ searchText: productFilter.search });
			break;
		case PRODUCT:
			dispatch(getProductDetails(currentPage));
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
