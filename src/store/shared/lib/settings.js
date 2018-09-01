export let themeSettings = {
	checkoutInputClass: 'checkout-field',
	checkoutButtonClass: 'checkout-button button is-primary',
	checkoutEditButtonClass: 'checkout-button button',
	cartThumbnailWidth: 100,
	footer_contacts: [
		{ text: '104 N Stagecoach Rd' },
		{ text: 'Dover Foxcroft, ME, 04426' },
		{ text: '(207) 564-8482' },
		{ text: 'sales@shop.com' }
	],
	footer_about:
		'Store - just to show you what it can. Some text go here. Some text go here. Some text go here. Some text go here. Some text go here. Some text go here. Some text go here.',
	footer_menu_2_title: 'Customer service',
	footer_menu_1_title: 'Company',
	footer_social: [
		{ type: 'facebook', url: 'https://www.facebook.com/' },
		{ type: 'twitter', url: 'https://twitter.com/' }
	],
	footer_menu_1_items: [
		{ text: 'About', url: '/about' },
		{ text: 'Blog', url: '/blog' },
		{ text: 'Terms of Service', url: '/tos' },
		{ text: 'Privacy Policy', url: '/privacy-policy' }
	],
	footer_menu_2_items: [
		{ text: 'Shipping & returns', url: '/' },
		{ text: 'Conditions of Use', url: '/' },
		{ text: 'Sitemap', url: '/' }
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
		{ path: '/page-2', image: 'slide9.jpg' },
		{ image: 'slide7.jpg', path: '/page-3' }
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
export let text = [
	{
		section: 'Footer',
		key: 'footer_logo_url',
		type: 'image',
		label: 'Logo'
	},
	{
		section: 'Product List',
		key: 'list_image_max_height',
		type: 'number',
		label: 'Image max height'
	},
	{
		section: 'Product Details',
		key: 'button_addtocart_bg',
		type: 'color',
		label: 'Button Add to Cart. Background color.'
	},
	{
		section: 'Product Details',
		key: 'button_addtocart_color',
		type: 'color',
		label: 'Button Add to Cart. Text color.'
	},
	{
		section: 'Product Details',
		key: 'button_addtocart_text',
		type: 'string',
		label: 'Button Add to Cart. Text.'
	},
	{
		section: 'Product List',
		key: 'button_loadmore_bg',
		type: 'color',
		label: 'Button Load more. Background color.'
	},
	{
		section: 'Product List',
		key: 'button_loadmore_color',
		type: 'color',
		label: 'Button Load more. Text color.'
	},
	{
		section: 'Product List',
		key: 'button_loadmore_text',
		type: 'string',
		label: 'Button Load more. Text.'
	},
	{
		section: 'Product List',
		key: 'list_price_color',
		type: 'color',
		label: 'Price color'
	},
	{
		section: 'Product List',
		key: 'list_price_size',
		type: 'number',
		label: 'Price font size (px)'
	},
	{
		section: 'Product Details',
		key: 'details_price_color',
		type: 'color',
		label: 'Price color'
	},
	{
		section: 'Product Details',
		key: 'details_price_size',
		type: 'number',
		label: 'Price font size (px)'
	},
	{
		section: 'Header',
		key: 'search_placeholder',
		type: 'string',
		label: 'Search placeholder'
	},
	{
		section: 'Product List',
		key: 'show_product_filter',
		type: 'boolean',
		label: 'Show Product Filter'
	},
	{
		section: 'Product Details',
		key: 'show_product_breadcrumbs',
		type: 'boolean',
		label: 'Show breadcrumbs'
	},
	{
		section: 'Product List',
		key: 'show_category_breadcrumbs',
		type: 'boolean',
		label: 'Show breadcrumbs'
	},
	{
		section: 'Product Details',
		key: 'show_discount_countdown',
		type: 'boolean',
		label: 'Show discount countdown'
	},
	{
		section: 'Home',
		key: 'home_products_title',
		type: 'string',
		label: 'Featured Products Title'
	},
	{
		section: 'Home',
		key: 'home_products_sort',
		type: 'string',
		label: 'Featured Products Sort By'
	},
	{
		section: 'Home',
		key: 'home_products_sku',
		type: 'string',
		label: 'Featured Products SKUs'
	},
	{
		section: 'Home',
		key: 'home_products_limit',
		type: 'number',
		label: 'Featured Products Items Count'
	},
	{
		section: 'Cart and Checkout',
		key: 'hide_footer_on_checkout',
		type: 'boolean',
		label: 'Hide footer on checkout'
	},
	{
		section: 'Cart and Checkout',
		key: 'checkoutInputClass',
		type: 'string',
		label: 'Text input class'
	},
	{
		section: 'Cart and Checkout',
		key: 'checkoutButtonClass',
		type: 'string',
		label: 'Button class'
	},
	{
		section: 'Cart and Checkout',
		key: 'checkoutEditButtonClass',
		type: 'string',
		label: 'Edit button class'
	},
	{
		section: 'Product List',
		key: 'new_arrivals',
		type: 'string',
		label: 'New Arrivals (comma separated fields)'
	},
	{
		section: 'Product List',
		key: 'price_asc',
		type: 'string',
		label: 'Sort by low price (comma separated fields)'
	},
	{
		section: 'Product List',
		key: 'top_rated',
		type: 'string',
		label: 'Top Rated (comma separated fields)'
	},
	{
		section: 'Product List',
		key: 'price_desc',
		type: 'string',
		label: 'Sort by high price (comma separated fields)'
	},
	{
		section: 'Product Details',
		key: 'product_thumbnail_position',
		type: 'string',
		label: 'Gallery thumbnail position',
		options: [
			{
				label: 'Top',
				value: 'top'
			},
			{
				label: 'Right',
				value: 'right'
			},
			{
				label: 'Bottom',
				value: 'bottom'
			},
			{
				label: 'Left',
				value: 'left'
			}
		]
	},
	{
		section: 'Product Details',
		key: 'disqus_shortname',
		type: 'string',
		label: 'DISQUS shortname'
	},
	{
		section: 'Footer',
		key: 'footer_about',
		type: 'string',
		label: 'Short description'
	},
	{
		section: 'Footer',
		key: 'footer_menu_1_title',
		type: 'string',
		label: 'Menu 1 title'
	},
	{
		section: 'Footer',
		key: 'footer_menu_2_title',
		type: 'string',
		label: 'Menu 2 title'
	},
	{
		section: 'Cart and Checkout',
		key: 'maxCartItemQty',
		type: 'number',
		label: 'Max Quantity'
	},
	{
		section: 'Cart and Checkout',
		key: 'cartThumbnailWidth',
		type: 'number',
		label: 'Image width (px)'
	},
	{
		section: 'Product List',
		key: 'listThumbnailWidth',
		type: 'number',
		label: 'Image width (px)'
	},
	{
		section: 'Product Details',
		key: 'previewThumbnailWidth',
		type: 'number',
		label: 'Thumbnail image width (px)'
	},
	{
		section: 'Product Details',
		key: 'bigThumbnailWidth',
		type: 'number',
		label: 'Image width (px)'
	},
	{
		section: 'Home',
		key: 'category_list_thumbnail_width',
		type: 'number',
		label: 'Category list. Image width (px)'
	},
	{
		section: 'Footer',
		key: 'footer_menu_1_items',
		type: 'array',
		label: 'Menu 1 (links)',
		properties: [
			{
				key: 'text',
				type: 'string',
				label: 'Link text'
			},
			{
				key: 'url',
				type: 'string',
				label: 'Link url'
			}
		]
	},
	{
		section: 'Footer',
		key: 'footer_menu_2_items',
		type: 'array',
		label: 'Menu 2 (links)',
		properties: [
			{
				key: 'text',
				type: 'string',
				label: 'Link text'
			},
			{
				key: 'url',
				type: 'string',
				label: 'Link url'
			}
		]
	},
	{
		section: 'Footer',
		key: 'footer_social',
		type: 'array',
		label: 'Social icons',
		properties: [
			{
				key: 'type',
				type: 'string',
				label: 'Type',
				options: [
					{
						label: 'Facebook',
						value: 'facebook'
					},
					{
						label: 'Twitter',
						value: 'twitter'
					},
					{
						label: 'Instagram',
						value: 'instagram'
					},
					{
						label: 'VK',
						value: 'vk'
					}
				]
			},
			{
				key: 'url',
				type: 'string',
				label: 'Url'
			}
		]
	},
	{
		section: 'Home',
		key: 'home_slider',
		type: 'array',
		label: 'Slider',
		properties: [
			{
				key: 'image',
				type: 'image',
				label: 'Image'
			},
			{
				key: 'title',
				type: 'string',
				label: 'Title'
			},
			{
				key: 'description',
				type: 'string',
				label: 'Description'
			},
			{
				key: 'path',
				type: 'string',
				label: 'Page path'
			}
		]
	},
	{
		section: 'Home',
		key: 'home_slider_color',
		type: 'color',
		label: 'Slider text color'
	},
	{
		section: 'Footer',
		key: 'footer_contacts',
		type: 'array',
		label: 'Contacts',
		properties: [
			{
				key: 'text',
				type: 'string',
				label: 'Text line'
			}
		]
	},
	{
		section: 'Header',
		key: 'header_menu',
		type: 'array',
		label: 'Menu',
		properties: [
			{
				key: 'text',
				type: 'string',
				label: 'Link text'
			},
			{
				key: 'url',
				type: 'string',
				label: 'Link url'
			}
		]
	},
	{
		section: 'Product Details',
		key: 'related_products_title',
		type: 'string',
		label: 'Related Products Title'
	},
	{
		section: 'Product Details',
		key: 'product_gallery_shownav',
		type: 'boolean',
		label: 'Show Navigation Arrows in Gallery'
	},
	{
		section: 'Home',
		key: 'home_gallery_shownav',
		type: 'boolean',
		label: 'Show Navigation Arrows in Gallery'
	},
	{
		section: 'Product Details',
		key: 'show_viewed_products',
		type: 'boolean',
		label: 'Show recently viewed products'
	},
	{
		section: 'Product Details',
		key: 'limit_viewed_products',
		type: 'number',
		label: 'Count of recently viewed products'
	},
	{
		section: 'Pages',
		key: 'page_list_tag',
		type: 'string',
		label: 'Tag to create page list (blog, news, articles or docs)'
	}
];
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
