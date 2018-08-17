import React, { Component } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import SlickCarousel from "slick-carousel";
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

import ViewedProducts from '../products/viewed';

class IRSimilarProducts extends Component {
	constructor(props) {
		super(props);
		this.SimilarClicked = this.SimilarClicked.bind(this);
	}

	state = {
		irSimilarProducts: [],
		irStyleWithProducts: [],
		irTopSellerProducts: [],
		similar_status: undefined,
		stylewith_status: undefined,
		topseller_status: undefined
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
				}
				if (jsonResult.stylewith_status == 1) {
					this.setState({ irStyleWithStatus: jsonResult.stylewith_status });
					this.setState({ irStyleWithProducts: jsonResult.style_with });
				}
				if (jsonResult.topseller_status == 1) {
					this.setState({ irTopSellerStatus: jsonResult.topseller_status });
					this.setState({ irTopSellerProducts: jsonResult.topseller });
				}

				// return jsonResult;
			});
	}

	getArrayFromLocalStorage = () => {
		console.log('getArrayFromLocalStorage');
		let values = [];
		const viewedProducts = localStorage.getItem('viewedProducts');
		console.log('getArrayFromLocalStorage');
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

	// onClick = () => {
	// window.alert('do stuff');
	// console.log("in Onclick");
	// this.ViewedProducts.addProductIdToLocalStorage(this.props.product.product_id);
	// console.log(this.props.id);
	//
	// if (this.props.id && this.props.id.length > 0) {
	// 	const viewedProducts = this.getArrayFromLocalStorage();
	//
	// 	if (viewedProducts.includes(this.props.id)) {
	// 		const index = viewedProducts.indexOf(this.props.id);
	// 		viewedProducts.splice(index, 1);
	// 		viewedProducts.push(this.props.id);
	// 	} else {
	// 		viewedProducts.push(this.props.id);
	// 	}
	//
	// 	localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
	// 	this.setState({ viewedProducts });
	// }

	// };

	SimilarClicked(i, e) {
		if (this.props.onClick && this.props.onClick > 0) {
			const viewedProducts = this.getArrayFromLocalStorage();
			if (viewedProducts.includes(this.id)) {
				const index = viewedProducts.indexOf(this.id);
				viewedProducts.splice(index, 1);
				viewedProducts.push(this.id);
			} else {
				viewedProducts.push(this.id);
			}
			localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
			this.setState({ viewedProducts });
		}
	}

	render() {
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 4,
			arrows: false,
			// slickPrev : false,
			// slickNext:false
			// prevArrow: '<button type="button" className="slick-prev psnl-prSMbtn">Previous</button>',
			// nextArrow: '<button type="button" className="slick-next psnl-nxtSMbtn">next</button>'
			prevArrow: false,
			nextArrow: false,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 4,
						infinite: true
					}
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 4,
						infinite: true
					}
				},
				{
					breakpoint: 900,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
						infinite: true
					}
				},
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true
					}
				},
				{
					breakpoint: 400,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						infinite: true
					}
				},
				{
					breakpoint: 300,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						infinite: true
					}
				},
				{
					breakpoint: 200,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						infinite: true
					}
				}
			]
		};

		return (
			<div>
				{this.state.irSimilarStatus && (
					<p className="similar-li-wrapper">
						<h2> Similar Products</h2>
						<ul>
							<Slider {...settings}>
								{this.state.irSimilarProducts.map(irSimilarProduct => (
									<li
										className="category-landscape-view-li-wrapper"
										itemType="https://schema.org/Enumeration"
										itemID={irSimilarProduct.product_id}
										key={irSimilarProduct.product_id}
									>
										<div className="category-landscape-image-wrapper onsale-category-container-list">
											<NavLink
												to={`/${irSimilarProduct.product_urlpath}`}
												onClick={this.SimilarClicked.bind(
													this,
													`${irSimilarProduct.product_id}`
												)}
												id={irSimilarProduct.product_id}
											>
												<img
													data-arg1={irSimilarProduct.product_id}
													src={irSimilarProduct.product_img}
													alt={irSimilarProduct.product_name}
												/>
											</NavLink>
										</div>

										<div className="listview">
											<div className="category-landscape-content-wrapper">
												<div className="products-grid-price-name category-landscape-price-name-wrapper">
													<NavLink
														to={`/${irSimilarProduct.product_urlpath}`}
														onClick={this.SimilarClicked.bind(
															this,
															`${irSimilarProduct.product_id}`
														)}
														id={irSimilarProduct.product_id}
													>
														<div className="product-price-discount price_variation_test price_variation_test_convert_v1 convert-cart-v1-test-show">
															<span className="original-category-price original-category-price-add-css similar_price">
																{irSimilarProduct.product_offer}
															</span>
															<span className="product-discount">
																{irSimilarProduct.discount && (
																	<span>({irSimilarProduct.discount})</span>
																)}
															</span>
														</div>
														<div className="clear" />
													</NavLink>
												</div>

												<div className="products-grid-newblock category-landscape-grid-new-block">
													<div className="product-name">
														<NavLink
															to={`/${irSimilarProduct.product_urlpath}`}
															onClick={this.SimilarClicked.bind(
																this,
																`${irSimilarProduct.product_id}`
															)}
															id={irSimilarProduct.product_id}
														>
															{irSimilarProduct.product_name}
														</NavLink>
													</div>
												</div>

												<div className="clear" />
											</div>
										</div>
									</li>
								))}
							</Slider>
						</ul>
					</p>
				)}

				{this.state.irStyleWithStatus && (
					<p className="style-with-li-wrapper">
						<h2> Style With </h2>
						<ul>
							<Slider {...settings}>
								{this.state.irStyleWithProducts.map(irStyleWith => (
									<li
										className="category-landscape-view-li-wrapper"
										itemType="https://schema.org/Enumeration"
										itemID={irStyleWith.product_id}
										key={irStyleWith.product_id}
									>
										<div className="category-landscape-image-wrapper onsale-category-container-list">
											<NavLink to={`/${irStyleWith.product_urlpath}`}>
												<img
													data-arg1={irStyleWith.product_id}
													src={irStyleWith.product_img}
													alt={irStyleWith.product_name}
												/>
											</NavLink>
										</div>

										<div className="listview">
											<div className="category-landscape-content-wrapper">
												<div className="products-grid-price-name category-landscape-price-name-wrapper">
													<NavLink to={`/${irStyleWith.product_urlpath}`}>
														<div className="product-price-discount price_variation_test price_variation_test_convert_v1 convert-cart-v1-test-show">
															<span className="original-category-price original-category-price-add-css similar_price">
																{irStyleWith.product_offer}
															</span>
															<span className="product-discount">
																{irStyleWith.discount && (
																	<span>({irStyleWith.discount})</span>
																)}
															</span>
														</div>
														<div className="clear" />
													</NavLink>
												</div>

												<div className="products-grid-newblock category-landscape-grid-new-block">
													<div className="product-name">
														<NavLink to={`/${irStyleWith.product_urlpath}`}>
															{irStyleWith.product_name}
														</NavLink>
													</div>
												</div>

												<div className="clear" />
											</div>
										</div>
									</li>
								))}
							</Slider>
						</ul>
					</p>
				)}

				{this.state.irTopSellerStatus && (
					<p className="topseller-li-wrapper">
						<h2> TopSeller Products </h2>
						<ul>
							<Slider {...settings}>
								{this.state.irTopSellerProducts.map(irTopSellerProduct => (
									<li
										className="category-landscape-view-li-wrapper"
										itemType="https://schema.org/Enumeration"
										itemID={irTopSellerProduct.product_id}
										key={irTopSellerProduct.product_id}
									>
										<div className="category-landscape-image-wrapper onsale-category-container-list">
											<NavLink to={`/${irTopSellerProduct.product_urlpath}`}>
												<img
													data-arg1={irTopSellerProduct.product_id}
													src={irTopSellerProduct.product_img}
													alt={irTopSellerProduct.product_name}
												/>
											</NavLink>
										</div>

										<div className="listview">
											<div className="category-landscape-content-wrapper">
												<div className="products-grid-price-name category-landscape-price-name-wrapper">
													<NavLink
														to={`/${irTopSellerProduct.product_urlpath}`}
													>
														<div className="product-price-discount price_variation_test price_variation_test_convert_v1 convert-cart-v1-test-show">
															<span className="original-category-price original-category-price-add-css similar_price">
																{irTopSellerProduct.product_offer}
															</span>
															<span className="product-discount">
																{irTopSellerProduct.discount && (
																	<span>({irTopSellerProduct.discount})</span>
																)}
															</span>
														</div>
														<div className="clear" />
													</NavLink>
												</div>

												<div className="products-grid-newblock category-landscape-grid-new-block">
													<div className="product-name">
														<NavLink
															to={`/${irTopSellerProduct.product_urlpath}`}
														>
															{irTopSellerProduct.product_name}
														</NavLink>
													</div>
												</div>

												<div className="clear" />
											</div>
										</div>
									</li>
								))}
							</Slider>
						</ul>
					</p>
				)}
			</div>
		);
	}
}

export default IRSimilarProducts;
