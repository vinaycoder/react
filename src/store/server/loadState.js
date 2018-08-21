import api from './api';
import queryString from 'query-string';
import {
	getParsedProductFilter,
	getProductFilterForCategory,
	getProductFilterForSearch
} from '../shared/actions';
import * as themeLocales from './themeLocales';
import {
	PAGE,
	PRODUCT_CATEGORY,
	PRODUCT,
	RESERVED,
	SEARCH
} from '../shared/pageTypes';
import cookie from 'react-cookies';
const PRODUCT_FIELDS =
	'path,id,name,category_id,category_ids,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags,position';
const CATEGORIES_FIELDS =
	'image,name,description,meta_description,meta_title,sort,parent_id,position,slug,id';

const getCurrentPage = path => {
	console.log('in current page');
	return fetch(
		`https://indiarush.com/irapi/promotion/getProductCategoryUrl/?url=https://indiarush.com/${path}&version=3.64`
	)
		.then(result => {
			return result.json();
		})
		.then(jsonResult => {
			if (jsonResult == 'null') {
				return {
					type: 404,
					path: path,
					resource: null
				};
			} else {
				if (path == '/checkout') {
					return {
						type: 'page',
						path: '/checkout',
						resource: '5b6984d45452db221b4044f2'
					};
				} else {
					return {
						type: jsonResult.type,
						path: path,
						resource: jsonResult.id
					};
				}
			}
		});

	// return api.sitemap
	// 	.retrieve({ path: path, enabled: true })
	// 	.then(sitemapResponse => {
	// 		if (sitemapResponse.status === 200) {
	// 			return sitemapResponse.json;
	// 		} else if (sitemapResponse.status === 404) {
	// 			return {
	// 				type: 404,
	// 				path: path,
	// 				resource: null
	// 			};
	// 		} else {
	// 			return Promise.reject(`Page response code = ${sitemapResponse.status}`);
	// 		}
	// 	});
};

const getProducts = (currentPage, productFilter) => {
	let filter = getParsedProductFilter(productFilter);
	filter.enabled = true;
	console.log('list of filter');
	console.log(filter);

	if (currentPage.type === PRODUCT_CATEGORY || currentPage.type === SEARCH) {
		//Default Filter Flow
		let filterListURL = '';
		for (const queryFilter in filter.filters) {
			filterListURL = `${filterListURL}&filters[${queryFilter}]=${
				filter.filters[queryFilter]
			}`;
		}

		//Default sort
		let sortListURl = 'best_seller';
		if (filter.sort) {
			sortListURl = filter.sort;
		}
		console.log('in search of category page');

		return fetch(
			`https://indiarush.com/irapi/category/getCategoryResult/?category_id=${
				currentPage.resource
			}&sort=${sortListURl}&page=0&item_count=48&version=3.81${filterListURL}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				console.log('logging category products data');
				return jsonResult.data;
			});

		// return api.products.list(filter).then(({ status, json }) => json);
	}
	return null;
};

const getProductsAttributes = (currentPage, productFilter) => {
	if (currentPage.type === PRODUCT_CATEGORY || currentPage.type === SEARCH) {
		console.log('in search of category page');

		return fetch(
			`https://indiarush.com/irapi/category/getCategoryFilters/?category_id=${
				currentPage.resource
			}&version=3.81`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				return jsonResult.data.filters;
			});

		// let filter = getParsedProductFilter(productFilter);
		// filter.enabled = true;
		// return api.products.list(filter).then(({ status, json }) => json);
	} else {
		return null;
	}
};

const getProduct = currentPage => {
	if (currentPage.type === PRODUCT) {
		return fetch(
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

		// api.products
		// 		.retrieve(currentPage.resource)
		// 		.then((jsonResult) => {
		// 		console.log("jsonResult");
		// 		console.log(jsonResult);
		// 		});
		//
		//
		// 	return api.products
		// 		.retrieve(currentPage.resource)
		// 		.then(({ status, json }) => json);
	} else {
		return {};
	}
};

const getPage = currentPage => {
	if (currentPage.type === PAGE) {
		return api.pages
			.retrieve(currentPage.resource)
			.then(({ status, json }) => json);
	} else {
		return {};
	}
};

const getThemeSettings = () => {
	return api.theme.settings
		.retrieve()
		.then(({ status, json }) => json)
		.catch(err => ({}));
};

const getAllData = (currentPage, productFilter, cookie) => {
	var list = {};
	cookie &&
		cookie.split(';').forEach(function(cookie) {
			var parts = cookie.split('=');
			list[parts.shift().trim()] = decodeURI(parts.join('='));
		});
	console.log('get all data function in load state');
	return Promise.all([
		api.checkoutFields.list().then(({ status, json }) => json),
		fetch(`https://indiarush.com/irapi/category/getallShopByCategories/`)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				return jsonResult.data;
			}),

		// api.productCategories
		// 	.list({ enabled: true, fields: CATEGORIES_FIELDS })
		// 	.then(({ status, json }) => json),

		fetch(
			'https://indiarush.com/irapi/cart/getShoppingCartInfo?quote_id=' +
				list.userQuoteId +
				'&pincode=""' +
				'&reset_payment=1' +
				'&version=' +
				'99.99'
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				return jsonResult.data;
			}),
		// api.ajax.cart.retrieve(cookie).then(({ status, json }) => json),
		getProducts(currentPage, productFilter),
		getProductsAttributes(currentPage, productFilter),
		getProduct(currentPage),
		getPage(currentPage),
		getThemeSettings()
	]).then(
		([
			checkoutFields,
			categories,
			cart,
			products,
			productsAttributes,
			product,
			page,
			themeSettings
		]) => {
			let categoryDetails = null;
			if (currentPage.type === PRODUCT_CATEGORY) {
				categoryDetails = categories.find(c => c.id === currentPage.resource);
			}
			return {
				checkoutFields,
				categories,
				cart,
				products,
				productsAttributes,
				product,
				page,
				categoryDetails,
				themeSettings
			};
		}
	);
};

const getState = (
	currentPage,
	settings,
	allData,
	location,
	productFilter,
	recommendationProducts
) => {
	const {
		checkoutFields,
		categories,
		cart,
		products,
		productsAttributes,
		product,
		page,
		categoryDetails,
		themeSettings
	} = allData;

	let productsTotalCount = 0;
	let productsHasMore = false;
	let productsMinPrice = 0;
	let productsMaxPrice = 0;
	let productsPage = 0;
	let productsList = null;

	if (products) {
		productsTotalCount = products.products_count;
		if (productsTotalCount > 48) {
			productsHasMore = true;
		}
		if (products.price) {
			productsMinPrice = products.price.min;
			productsMaxPrice = products.price.max;
		}
		productsList = products.product;
	}

	const state = {
		app: {
			settings: settings,
			location: location,
			currentPage: currentPage,
			pageDetails: page,
			categoryDetails: categoryDetails,
			productDetails: product,
			categories: categories, // For Category Page
			products: productsList, // && products.data ? products.data : [],
			productsTotalCount: productsTotalCount,
			productsHasMore: productsHasMore,
			productsPage: productsPage,
			productsMinPrice: productsMinPrice,
			productsMaxPrice: productsMaxPrice,
			productsAttributes: productsAttributes,
			paymentMethods: [],
			shippingMethods: [],
			loadingProducts: false,
			loadingMoreProducts: false,
			loadingShippingMethods: false,
			loadingPaymentMethods: false,
			processingCheckout: false,
			productFilter: {
				onSale: null,
				search: productFilter.search || '',
				categoryId: productFilter.categoryId,
				priceFrom: productFilter.priceFrom || 0,
				priceTo: productFilter.priceTo || 0,
				attributes: productFilter.attributes,
				sort: settings.default_product_sorting,
				fields:
					settings.product_fields && settings.product_fields !== ''
						? settings.product_fields
						: PRODUCT_FIELDS,
				limit:
					settings.products_limit && settings.products_limit !== 0
						? settings.products_limit
						: 30
			},
			cart: cart,
			order: null,
			checkoutFields: checkoutFields,
			themeSettings: themeSettings,
			recommendationProducts: recommendationProducts
		}
	};

	return state;
};

const getFilter = (currentPage, urlQuery, settings) => {
	let productFilter = {};

	if (currentPage.type === PRODUCT_CATEGORY) {
		productFilter = getProductFilterForCategory(
			urlQuery,
			settings.default_product_sorting
		);
		productFilter.categoryId = currentPage.resource;
	} else if (currentPage.type === SEARCH) {
		productFilter = getProductFilterForSearch(urlQuery);
	}

	productFilter.fields =
		settings.product_fields && settings.product_fields !== ''
			? settings.product_fields
			: PRODUCT_FIELDS;
	productFilter.limit =
		settings.products_limit && settings.products_limit !== 0
			? settings.products_limit
			: 30;

	return productFilter;
};

export const loadState = (req, language) => {
	const cookie = req.get('cookie');
	const urlPath = req.path;
	const urlQuery = req.url.includes('?')
		? req.url.substring(req.url.indexOf('?'))
		: '';
	console.log(urlPath);
	console.log(urlQuery);
	const location = {
		hasHistory: false,
		pathname: urlPath,
		search: urlQuery,
		hash: ''
	};
	console.log('inside load state');
	return Promise.all([
		getCurrentPage(req.path),
		api.settings.retrieve().then(({ status, json }) => json),
		themeLocales.getText(language),
		api.theme.placeholders.list()
	]).then(([currentPage, settings, themeText, placeholdersResponse]) => {
		const productFilter = getFilter(currentPage, urlQuery, settings);

		return getAllData(currentPage, productFilter, cookie).then(allData => {
			const state = getState(
				currentPage,
				settings,
				allData,
				location,
				productFilter
			);
			console.log('Final Return Data');
			console.log(state);
			return {
				state: state,
				themeText: themeText,
				placeholders: placeholdersResponse.json
			};
		});
	});
};
