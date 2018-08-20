import React, { Component } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import SlickCarousel from "slick-carousel";
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

import ViewedProducts from '../products/viewed';
import IRSlickSlider from './irSlickSlider';

class IRSimilarProducts extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		irSimilarProducts: [],
		irStyleWithProducts: [],
		irTopSellerProducts: [],
		similar_status: undefined,
		stylewith_status: undefined,
		topseller_status: undefined,
		irSimilarProductsLabel: undefined,
		irStyleWithProductsLabel: undefined,
		irTopSellerProductsLabel: undefined
	};

	componentDidMount() {
		// const productId = 1138208;
		const productId = this.props.product.product_id;
		const version = 3.81;

		return fetch(
			`https://indiarush.com/irapi/product/getSimilarProduct/?product_id=${productId}&version=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				// console.log(jsonResult.similar_status);
				if (jsonResult.similar_status == 1) {
					this.setState({ irSimilarStatus: jsonResult.similar_status });
					this.setState({ irSimilarProducts: jsonResult.similar });
					this.setState({ irSimilarProductsLabel: 'Similar Products' });
				}
				if (jsonResult.stylewith_status == 1) {
					this.setState({ irStyleWithStatus: jsonResult.stylewith_status });
					this.setState({ irStyleWithProducts: jsonResult.style_with });
					this.setState({ irStyleWithProductsLabel: 'Style With' });
				}
				if (jsonResult.topseller_status == 1) {
					this.setState({ irTopSellerStatus: jsonResult.topseller_status });
					this.setState({ irTopSellerProducts: jsonResult.topseller });
					this.setState({ irTopSellerProductsLabel: 'Top Seller Products' });
				}

				// return jsonResult;
			});
	}

	render() {
		return (
			<div>
				{this.state.irSimilarStatus && (
					<IRSlickSlider
						products={this.state.irSimilarProducts}
						recommendationLabel={this.state.irSimilarProductsLabel}
					/>
				)}

				{this.state.irStyleWithStatus && (
					<IRSlickSlider
						products={this.state.irStyleWithProducts}
						recommendationLabel={this.state.irStyleWithProductsLabel}
					/>
				)}

				{this.state.irTopSellerStatus && (
					<IRSlickSlider
						products={this.state.irTopSellerProducts}
						recommendationLabel={this.state.irTopSellerProductsLabel}
					/>
				)}
			</div>
		);
	}
}

export default IRSimilarProducts;
