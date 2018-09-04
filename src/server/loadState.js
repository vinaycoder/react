import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import api from './api';
import queryString from 'query-string';
import winston from 'winston';
import 'isomorphic-fetch';

import {
	getParsedProductFilter,
	getProductFilterForCategory,
	getProductFilterForSearch,
	loginPost
} from '../shared/actions';
import * as themeLocales from './themeLocales';
import {
	PAGE,
	PRODUCT_CATEGORY,
	PRODUCT,
	RESERVED,
	SEARCH,
	LOGIN,
	HOME
} from '../shared/pageTypes';
import cookie from 'react-cookies';
const PRODUCT_FIELDS =
	'path,id,name,category_id,category_ids,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags,position';
const CATEGORIES_FIELDS =
	'image,name,description,meta_description,meta_title,sort,parent_id,position,slug,id';

const getCurrentPage = path => {
	console.log('in current page');
	if (path == '/checkout') {
		return {
			type: 'page',
			path: '/checkout',
			resource: '5b6984d45452db221b4044f2'
		};
	} else if (path == '/') {
		return {
			type: 'home',
			path: '/',
			resource: ''
		};
	} else if (path == '/search') {
		return {
			type: 'search',
			path: '/search',
			resource: ''
		};
	} else if (path == '/customer/account/login') {
		return {
			type: 'login',
			path: '/customer/account/login',
			resource: ''
		};
	} else {
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
					return {
						type: jsonResult.type,
						path: path,
						resource: jsonResult.id
					};
				}
			});
	}
};

const getProducts = (currentPage, productFilter) => {
	let filter = getParsedProductFilter(productFilter);
	filter.enabled = true;

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

		if (currentPage.type === PRODUCT_CATEGORY) {
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
		}

		if (currentPage.type === SEARCH) {
			return fetch(
				`https://indiarush.com/irapi/search/getSearchResult/?query=${
					filter.search
				}&sort=${sortListURl}&page=0&item_count=48&version=3.83${filterListURL}`
			)
				.then(result => result.json())
				.then(jsonResult => {
					console.log('logging search products data');
					return jsonResult.data;
				});
		}
	}
	return null;
};

const getLoginDetails = (statsCookieId, isLoggedIn) => {
	return null;

	console.log('statsCookieId');
	console.log(statsCookieId);
	console.log('isLoggedIn');
	console.log(isLoggedIn);

	let username = 'abhinesh.yadav@indiarush.com';

	let data = [];
	data.push(statsCookieId);
	data.push(isLoggedIn);

	console.log('data');
	console.log(data);

	// const allloginDetails = loginPost(data);
	// console.log('allloginDetails');
	// console.log(allloginDetails);

	if (data) {
		const version = 3.81;
		const isOtp = 0;
		// const { app } = getState();
		// const loginDetails = getloginDetails(app.customerDetails);

		return fetch(
			`https://indiarush.com/irapi/customer/checkRegisteredUser/?username=${username}&version=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				console.log('server side json for login');
				console.log(jsonResult.data);

				return jsonResult.data;
			});
	}
	return null;
};

const getHomePageDetails = currentPage => {
	if (currentPage.type == 'home') {
		const version = 3.81;
		const id = 4;
		const p = 1;
		const image = 300;

		return fetch(
			`https://indiarush.com/irapi/promotion/getPromotionData/?id=${id}&p=${p}&image=${image}&version=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				return jsonResult;
			});
	}
	return {};
};

const getProductsAttributes = (currentPage, productFilter) => {
	let filter = getParsedProductFilter(productFilter);
	filter.enabled = true;

	if (currentPage.type === PRODUCT_CATEGORY || currentPage.type === SEARCH) {
		console.log('in search of category page');
		//Default Filter Flow
		let filterListURL = '';
		for (const queryFilter in filter.filters) {
			filterListURL = `${filterListURL}&filters[${queryFilter}]=${
				filter.filters[queryFilter]
			}`;
		}
		if (currentPage.type === PRODUCT_CATEGORY) {
			return fetch(
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
			return fetch(
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
	} else {
		return {};
	}
};

const getPage = currentPage => {
	if (currentPage.type === PAGE) {
		// 	return api.pages
		// 		.retrieve(currentPage.resource)
		// 		.then(({ status, json }) => json);
		// } else {
		return {};
	} else if (currentPage.type === HOME) {
		return getHomePageDetails(currentPage);
	}
};

const getSettings = () => {
	return {
		domain: '',
		logo_file: null,
		language: 'en',
		currency_code: 'INR',
		currency_symbol: 'Rs',
		currency_format: 'Rs {amount}',
		thousand_separator: ',',
		decimal_separator: '.',
		decimal_number: 2,
		timezone: 'Asia/Singapore',
		date_format: 'MMMM\nD, YYYY',
		time_format: 'h:mm\na',
		default_shipping_country: 'SG',
		default_shipping_state: '',
		default_shipping_city: '',
		default_product_sorting: 'best_seller',
		product_fields:
			'path,id,name,category_id,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags,position',
		products_limit: 48,
		weight_unit: 'kg',
		length_unit: 'cm',
		hide_billing_address: false,
		order_confirmation_copy_to: ''
	};
};

const getThemeSettings = () => {
	return {
		checkoutInputClass: 'checkout-field',
		checkoutButtonClass: 'checkout-button button is-primary',
		checkoutEditButtonClass: 'checkout-button button',
		cartThumbnailWidth: 100,
		footer_contacts: [
			{
				text: '104 N Stagecoach Rd'
			},
			{
				text: 'Dover Foxcroft, ME, 04426'
			},
			{
				text: '(207) 564-8482'
			},
			{
				text: 'sales@shop.com'
			}
		],
		footer_about:
			'Store - just to show you what it can. Some text go here. Some text go here. Some text go here. Some text go here. Some text go here. Some text go here. Some text go here.',
		footer_menu_2_title: 'Customer service',
		footer_menu_1_title: 'Company',
		footer_social: [
			{
				type: 'facebook',
				url: 'https://www.facebook.com/'
			},
			{
				type: 'twitter',
				url: 'https://twitter.com/'
			}
		],
		footer_menu_1_items: [
			{
				text: 'About',
				url: '/about'
			},
			{
				text: 'Blog',
				url: '/blog'
			},
			{
				text: 'Terms of Service',
				url: '/tos'
			},
			{
				text: 'Privacy Policy',
				url: '/privacy-policy'
			}
		],
		footer_menu_2_items: [
			{
				text: 'Shipping & returns',
				url: '/'
			},
			{
				text: 'Conditions of Use',
				url: '/'
			},
			{
				text: 'Sitemap',
				url: '/'
			}
		],
		search_placeholder: '',
		home_products_limit: 8,
		home_products_title: 'BEST SELLERS',
		home_products_sort: '-date_updated',
		home_slider: [
			{
				path: '/page-1',
				image: 'slide8.jpg',
				description: 'COMFORT. SPORT. STYLE.',
				title: 'THE FRESH FOAM CRUZ'
			},
			{
				path: '/page-2',
				image: 'slide9.jpg'
			},
			{
				image: 'slide7.jpg',
				path: '/page-3'
			}
		],
		home_slider_color: '#ffffff',
		button_addtocart_text: '',
		disqus_shortname: 'cezerin',
		maxCartItemQty: 100,
		product_thumbnail_position: 'left',
		bigThumbnailWidth: 800,
		previewThumbnailWidth: 100,
		list_image_max_height: 280,
		listThumbnailWidth: 340,
		show_product_filter: true,
		show_category_breadcrumbs: true,
		show_discount_countdown: true,
		show_product_breadcrumbs: true,
		new_arrivals: 'new_arrivals',
		price_asc: 'price_asc',
		top_rated: 'top_rated',
		price_desc: 'price_desc',
		footer_logo_url: 'logo.png',
		limit_viewed_products: 4,
		show_viewed_products: true,
		product_gallery_shownav: true,
		page_list_tag: 'blog'
	};
};

const getAllData = (currentPage, productFilter, cookie) => {
	var list = {};
	cookie &&
		cookie.split(';').forEach(function(cookie) {
			var parts = cookie.split('=');
			list[parts.shift().trim()] = decodeURI(parts.join('='));
		});
	console.log('get all data function in load state');

	console.log('cookie');
	console.log(cookie);

	console.log('currentPage');
	console.log(currentPage);

	return Promise.all([
		[], //api.checkoutFields.list().then(({ status, json }) => json),
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

		// currently removed loading cart inside server
		/*
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
			*/
		getProducts(currentPage, productFilter),
		getProductsAttributes(currentPage, productFilter),
		getProduct(currentPage),
		getPage(currentPage),
		getThemeSettings(),
		getLoginDetails(list.statsCookieId, list.isLoggedIn)
	]).then(
		([
			checkoutFields,
			categories, //cart,
			products,
			productsAttributes,
			product,
			page,
			themeSettings,
			customerDetails
		]) => {
			console.log('pageDataMine');
			console.log(page);

			let categoryDetails = null;
			if (currentPage.type === PRODUCT_CATEGORY) {
				categoryDetails = categories.find(c => c.id === currentPage.resource);
			}
			return {
				checkoutFields,
				categories,
				//		cart,
				products,
				productsAttributes,
				product,
				page,
				categoryDetails,
				themeSettings,
				customerDetails
			};
		}
	);
};

const getState = (currentPage, settings, allData, location, productFilter) => {
	const {
		checkoutFields,
		categories,
		//	cart,
		products,
		productsAttributes,
		product,
		page,
		categoryDetails,
		themeSettings,
		customerDetails
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
			recommendationProducts: [],
			isLoggedIn: null,
			statsCookieId: null,
			customerDetails: customerDetails,
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
			cart: null,
			saveForLater: [],
			order: null,
			checkoutFields: checkoutFields,
			themeSettings: themeSettings
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
	const location = {
		hasHistory: false,
		pathname: urlPath,
		search: urlQuery,
		hash: ''
	};
	console.log('inside load state');
	return Promise.all([
		getCurrentPage(req.path),
		getSettings(), // api.settings.retrieve().then(({ status, json }) => json),
		themeLocales.getText(language),
		[]
		//api.theme.placeholders.list()
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
			console.log('Final Return Daasdasdta');
			winston.info(`i am also here`);
			console.log(state);
			return {
				state: state,
				themeText: themeText,
				placeholders: placeholdersResponse.json
			};
		});
	});
};
