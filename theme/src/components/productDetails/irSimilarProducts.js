import React, { Component } from 'react';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import SlickCarousel from "slick-carousel";
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

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
											<a
												data-arg1={irSimilarProduct.product_id}
												href={`/${irSimilarProduct.product_urlpath}`}
												title={irSimilarProduct.product_name}
												className="product-image getSimilarProductClick"
											>
												<img
													data-arg1={irSimilarProduct.product_id}
													src={irSimilarProduct.product_img}
													alt={irSimilarProduct.product_name}
												/>
											</a>
										</div>

										<div className="listview">
											<div className="category-landscape-content-wrapper">
												<div className="products-grid-price-name category-landscape-price-name-wrapper">
													<a
														className="getSimilarProductClick"
														data-arg1={irSimilarProduct.product_id}
														href={`/${irSimilarProduct.product_urlpath}`}
														title={irSimilarProduct.product_name}
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
													</a>
												</div>

												<div className="products-grid-newblock category-landscape-grid-new-block">
													<div className="product-name">
														<a
															className="product-name-sm getSimilarProductClick"
															data-arg1={irSimilarProduct.product_id}
															href={`/${irSimilarProduct.product_urlpath}`}
															title={irSimilarProduct.product_name}
														>
															{irSimilarProduct.product_name}
														</a>
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
											<a
												data-arg1={irStyleWith.product_id}
												href={`/${irStyleWith.product_urlpath}`}
												title={irStyleWith.product_name}
												className="product-image getSimilarProductClick"
											>
												<img
													data-arg1={irStyleWith.product_id}
													src={irStyleWith.product_img}
													alt={irStyleWith.product_name}
												/>
											</a>
										</div>

										<div className="listview">
											<div className="category-landscape-content-wrapper">
												<div className="products-grid-price-name category-landscape-price-name-wrapper">
													<a
														className="getSimilarProductClick"
														data-arg1={irStyleWith.product_id}
														href={`/${irStyleWith.product_urlpath}`}
														title={irStyleWith.product_name}
													>
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
													</a>
												</div>

												<div className="products-grid-newblock category-landscape-grid-new-block">
													<div className="product-name">
														<a
															className="product-name-sm getSimilarProductClick"
															data-arg1={irStyleWith.product_id}
															href={`/${irStyleWith.product_urlpath}`}
															title={irStyleWith.product_name}
														>
															{irStyleWith.product_name}
														</a>
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
											<a
												data-arg1={irTopSellerProduct.product_id}
												href={`/${irTopSellerProduct.product_urlpath}`}
												title={irTopSellerProduct.product_name}
												className="product-image getSimilarProductClick"
											>
												<img
													data-arg1={irTopSellerProduct.product_id}
													src={irTopSellerProduct.product_img}
													alt={irTopSellerProduct.product_name}
												/>
											</a>
										</div>

										<div className="listview">
											<div className="category-landscape-content-wrapper">
												<div className="products-grid-price-name category-landscape-price-name-wrapper">
													<a
														className="getSimilarProductClick"
														data-arg1={irTopSellerProduct.product_id}
														href={`/${irTopSellerProduct.product_urlpath}`}
														title={irTopSellerProduct.product_name}
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
													</a>
												</div>

												<div className="products-grid-newblock category-landscape-grid-new-block">
													<div className="product-name">
														<a
															className="product-name-sm getSimilarProductClick"
															data-arg1={irTopSellerProduct.product_id}
															href={`/${irTopSellerProduct.product_urlpath}`}
															title={irTopSellerProduct.product_name}
														>
															{irTopSellerProduct.product_name}
														</a>
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
