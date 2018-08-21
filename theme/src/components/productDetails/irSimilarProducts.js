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
			recommendationProducts: []
		};
	}

	componentDidMount() {
		// const productId = 1138208;
		const productId = this.props.product.product_id;
		const version = 3.81;

		// let { recommendationProducts } = this.props;
		// let alreadyData = 0;

		// console.log("this.props");
		// console.log(this.props);
		//
		// console.log("this.state.recommendationProducts");
		// console.log(this.state);

		// console.log("this.props.recommendationProducts.length");
		// console.log(this.props.recommendationProducts.length);

		// console.log("Object.keys(recommendationProducts).length");
		// console.log(Object.keys(recommendationProducts).length);

		// if(this.props.recommendationProducts)
		// {
		// 			const mainOptions = this.props.recommendationProducts.map((recommendationProduct, index) => {
		//
		// 				const subOptions = recommendationProduct.map((recommendedProduct, index) => {
		//
		// 								if(recommendedProduct.product_id == this.props.product.product_id )
		// 								{
		// 										alreadyData = 1;
		//
		//
		// 								}
		//
		// 				});
		//
		// 			});
		// }

		//
		// console.log("alreadyData");
		// console.log(alreadyData);

		// console.log("recommendationProducts");
		// console.log(recommendationProducts);

		// if(alreadyData == 0)
		// {
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
					// console.log("jsonResult.similar");
					// console.log(jsonResult.similar);
					//
					// console.log("this.props.recommendationProducts");
					// console.log(this.props.recommendationProducts);

					// let getRecommendationProducts = this.props.recommendationProducts;
					// getRecommendationProducts[`${productId}`]= getRecommendationProducts;
					// this.props.recommendationProducts.push(getRecommendationProducts);
					// console.log("getRecommendationProducts");
					// console.log(getRecommendationProducts);
					this.setState({
						recommendationProducts: jsonResult.similar
					});

					this.props.recommendationProducts.push(jsonResult.similar);
				}
				if (jsonResult.stylewith_status == 1) {
					this.setState({ irStyleWithStatus: jsonResult.stylewith_status });
					this.setState({ irStyleWithProducts: jsonResult.style_with });
					this.setState({ irStyleWithProductsLabel: 'Style With' });
					this.props.recommendationProducts.push(jsonResult.style_with);
					this.setState({
						recommendationProducts: jsonResult.style_with
					});
				}
				if (jsonResult.topseller_status == 1) {
					this.setState({ irTopSellerStatus: jsonResult.topseller_status });
					this.setState({ irTopSellerProducts: jsonResult.topseller });
					this.setState({ irTopSellerProductsLabel: 'Top Seller Products' });
					this.props.recommendationProducts.push(jsonResult.topseller);
					this.setState({
						recommendationProducts: jsonResult.topseller
					});
				}

				// return jsonResult;
			});

		// }
		// else{
		//
		//
		//
		// }
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
