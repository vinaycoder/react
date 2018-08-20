import React from 'react';
import PropTypes from 'prop-types';
import api from '../../lib/api';
import ProductList from '../productList';
import IRSlickSlider from '../productDetails/irSlickSlider';

export default class CustomProducts extends React.Component {
	static propTypes = {
		ids: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string)
		]),
		sku: PropTypes.string,
		sort: PropTypes.string,
		limit: PropTypes.number.isRequired,
		category_id: PropTypes.string,
		tags: PropTypes.string,
		attributes: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired
			})
		),
		price_from: PropTypes.number,
		price_to: PropTypes.number,
		on_sale: PropTypes.bool,
		settings: PropTypes.shape({}).isRequired,
		addCartItem: PropTypes.func.isRequired,
		isCentered: PropTypes.bool,
		className: PropTypes.string,
		columnCountOnMobile: PropTypes.number,
		columnCountOnTablet: PropTypes.number,
		columnCountOnDesktop: PropTypes.number,
		columnCountOnWidescreen: PropTypes.number,
		columnCountOnFullhd: PropTypes.number
	};

	static defaultProps = {
		ids: null,
		sku: null,
		sort: null,
		category_id: null,
		tags: null,
		attributes: null,
		price_from: null,
		price_to: null,
		on_sale: null,
		isCentered: true,
		className: null,
		columnCountOnMobile: null,
		columnCountOnTablet: null,
		columnCountOnDesktop: null,
		columnCountOnWidescreen: null,
		columnCountOnFullhd: null
	};

	state = {
		products: []
	};

	componentDidMount() {
		this.isCancelled = false;
		console.log('custom componentDidMount');
		this.fetchProducts(this.props);
	}

	componentWillReceiveProps(nextProps) {
		console.log('custom componentWillReceiveProps');
		this.fetchProducts(nextProps);
	}

	componentWillUnmount() {
		console.log('custom componentWillUnmount');
		this.isCancelled = true;
	}

	fetchProducts = ({
		ids,
		sku,
		sort,
		limit,
		category_id,
		tags,
		attributes,
		price_from,
		price_to,
		on_sale
	}) => {
		const filter = {
			ids,
			sku,
			tags,
			on_sale,
			search: null,
			category_id,
			price_from,
			price_to,
			sort,
			fields:
				'path,id,name,category_id,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags',
			limit: limit || 25,
			offset: 0
		};

		if (attributes && Array.isArray(attributes) && attributes.length > 0) {
			attributes.forEach(attr => {
				filter[`attributes.${attr.name}`] = attr.value;
			});
		}

		console.log('in here');

		fetch(
			`https://indiarush.com/irapi/product/getProductDetailsBasedOnProductIds/?product_id=${ids}&version=3.81`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				// return jsonResult.data;
				this.setState({
					products: jsonResult.data.products
				});
			});
	};

	render() {
		console.log('in custom js render');
		const {
			settings,
			addCartItem,
			isCentered,
			className,
			columnCountOnMobile,
			columnCountOnTablet,
			columnCountOnDesktop,
			columnCountOnWidescreen,
			columnCountOnFullhd
		} = this.props;

		const { products } = this.state;

		return <IRSlickSlider products={products} />;

		// return (
		// 	<ProductList
		// 		products={products}
		// 		addCartItem={addCartItem}
		// 		settings={settings}
		// 		loadMoreProducts={null}
		// 		hasMore={false}
		// 		columnCountOnMobile={columnCountOnMobile}
		// 		columnCountOnTablet={columnCountOnTablet}
		// 		columnCountOnDesktop={columnCountOnDesktop}
		// 		columnCountOnWidescreen={columnCountOnWidescreen}
		// 		columnCountOnFullhd={columnCountOnFullhd}
		// 		isCentered={isCentered}
		// 		className={className}
		// 	/>
		// );
	}
}
