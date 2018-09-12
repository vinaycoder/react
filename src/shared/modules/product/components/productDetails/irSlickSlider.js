import React, { Component } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import SlickCarousel from "slick-carousel";
// import * as helper from '../../lib/helper';

import ViewedProducts from '../products/viewed';
import CustomProducts from '../products/custom';

class IRSlickSlider extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const settings = {
			dots: false,
			infinite: false,
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
						infinite: false
					}
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 4,
						infinite: false
					}
				},
				{
					breakpoint: 900,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
						infinite: false
					}
				},
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: false
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
				{this.props.products && (
					<div>
						<h2>{this.props.recommendationLabel}</h2>
						<div className="similar-li-wrapper">
							<ul>
								<Slider {...settings}>
									{this.props.products.map(irSimilarProduct => (
										<li
											className="category-landscape-view-li-wrapper"
											itemType="https://schema.org/Enumeration"
											itemID={irSimilarProduct.product_id}
											key={irSimilarProduct.product_id}
										>
											<div className="category-landscape-image-wrapper onsale-category-container-list">
												<NavLink
													to={`/${irSimilarProduct.product_urlpath}`}
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
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default IRSlickSlider;
