export let themeSettings = {
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
export let text = {
	addToCart: 'Add to cart',
	cart: 'cart',
	cartEmpty: 'Your cart is empty',
	proceedToCheckout: 'Go to checkout',
	subtotal: 'Subtotal',
	shipping: 'Shipping',
	discount: 'Discount',
	total: 'Total',
	remove: 'Remove',
	qty: 'Qty',
	price: 'Price',
	checkoutPageTitle: 'Checkout',
	grandTotal: 'Grand total',
	orderSummary: 'Order Summary',
	checkoutSuccessTitle: 'Thanks for your order!',
	outOfStock: 'Out of stock',
	inStock: 'In Stock',
	discontinued: 'Discontinued',
	relatedProducts: 'You May Also Like',
	filterProducts: 'Filter products',
	sort: 'Sort',
	best_seller: 'Best Sellers',
	new_arrivals: 'New Arrivals',
	price_asc: 'Price low to high',
	top_rated: 'Top Rated',
	price_desc: 'Price high to low',
	title404: 'Page not found',
	loadMore: 'Show more products',
	text404:
		'The page you requested does not exist. Click here to continue shopping.',
	search: 'Search',
	searchPlaceholder: 'Search',
	resultsFor: 'Results for',
	selectOption: 'Select',
	optionsRequired: 'You need to choose options',
	shippingAddress: 'Shipping Address',
	billingAddress: 'Billing Address',
	shippingMethod: 'Shipping method',
	paymentMethod: 'Payment method',
	orderNumber: 'Order number',
	productName: 'Product',
	close: 'Close',
	attributes: 'Product details',
	home: 'Home',
	saleEnds: 'Offer ends',
	days: 'days',
	hours: 'hrs',
	minutes: 'mins',
	seconds: 'secs',
	email: 'Email',
	mobile: 'Mobile',
	country: 'Country',
	state: 'State',
	city: 'City',
	fullName: 'Name',
	address1: 'Address',
	address2: 'Address line 2',
	postal_code: 'Pin Code ',
	phone: 'Mobile Number (10 digits only)',
	company: 'Company',
	comments: 'Comments',
	recentlyViewed: 'Recently Viewed',
	loading: 'Loading...',
	optional: 'optional',
	shippingTo: 'Shipping To',
	shippingMethods: 'Shipping options',
	paymentMethods: 'Payment options',
	orderSubmit: 'Place Order',
	saveAddress: 'CONTINUE TO NEXT STEP',
	checkoutSaveAddressTitle: 'Delivery Address',
	emptyCheckout: 'Your cart is empty',
	required: 'This field is required.',
	required2: ' Required ',
	emailInvalid: 'Please enter a valid email address.',
	sameAsShipping: 'Same as shipping address',
	edit: 'Edit',
	next: 'Next',
	customerDetails: 'Customer Details',
	payment: 'Payment',
	signInToAccess: 'Sign In To Access Your My Account, Order And Feed. ',
	signIn: 'Sign in',
	dontHaveIrAcc: "Don't Have IndiaRush Account ?",
	createAccount: 'Create Account',
	loginLabel: 'Login Account'
};
export let language = null;
export let api = null;

const setVariables = options => {
	if (options.themeSettings) {
		({ themeSettings } = options);
	}

	if (options.text) {
		({ text } = options);
	}

	if (options.language) {
		({ language } = options);
	}

	if (options.api) {
		({ api } = options);
	}
};

export const initOnClient = options => {
	setVariables(options);
};

export const initOnServer = options => {
	setVariables(options);
};
