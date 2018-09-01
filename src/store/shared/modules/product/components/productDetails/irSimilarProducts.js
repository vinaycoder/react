import React, { Component } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import SlickCarousel from "slick-carousel";

import ViewedProducts from '../products/viewed';
import IRSlickSlider from './irSlickSlider';

class IRSimilarProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			irSimilarProducts: [],
			irStyleWithProducts: [],
			irTopSellerProducts: [],
			similar_status: undefined,
			stylewith_status: undefined,
			topseller_status: undefined,
			irSimilarProductsLabel: undefined,
			irStyleWithProductsLabel: undefined,
			irTopSellerProductsLabel: undefined,
			allRecommendations: []
		};
	}

	componentDidMount() {
		const productId = this.props.product.product_id;
		const version = 3.81;

		return fetch(
			`https://indiarush.com/irapi/product/getSimilarProduct/?product_id=${productId}&version=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				if (jsonResult.similar_status == 1) {
					this.setState({ irSimilarStatus: jsonResult.similar_status });
					this.setState({ irSimilarProducts: jsonResult.similar });
					this.setState({ irSimilarProductsLabel: 'Similar Products' });
					this.state.allRecommendations.push(jsonResult.similar);
				}
				if (jsonResult.stylewith_status == 1) {
					this.setState({ irStyleWithStatus: jsonResult.stylewith_status });
					this.setState({ irStyleWithProducts: jsonResult.style_with });
					this.setState({ irStyleWithProductsLabel: 'Style With' });
					this.state.allRecommendations.push(jsonResult.style_with);
				}
				if (jsonResult.topseller_status == 1) {
					this.setState({ irTopSellerStatus: jsonResult.topseller_status });
					this.setState({ irTopSellerProducts: jsonResult.topseller });
					this.setState({ irTopSellerProductsLabel: 'Top Seller Products' });
					this.state.allRecommendations.push(jsonResult.topseller);
				}

				if (this.state.allRecommendations) {
					const mainOptions = this.state.allRecommendations.map(
						(recommendationProduct, index) => {
							const subOptions = recommendationProduct.map(
								(recommendedProduct, index) => {
									this.props.recommendationProducts.push(recommendedProduct);
								}
							);
						}
					);
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
						recommendationProducts={this.props.recommendationProducts}
					/>
				)}

				{this.state.irStyleWithStatus && (
					<IRSlickSlider
						products={this.state.irStyleWithProducts}
						recommendationLabel={this.state.irStyleWithProductsLabel}
						recommendationProducts={this.props.recommendationProducts}
					/>
				)}

				{this.state.irTopSellerStatus && (
					<IRSlickSlider
						products={this.state.irTopSellerProducts}
						recommendationLabel={this.state.irTopSellerProductsLabel}
						recommendationProducts={this.props.recommendationProducts}
					/>
				)}
			</div>
		);
	}
}

export default IRSimilarProducts;
