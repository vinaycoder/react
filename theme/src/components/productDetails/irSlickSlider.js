import React, { Component } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import SlickCarousel from "slick-carousel";
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

import ViewedProducts from '../products/viewed';
import CustomProducts from '../products/custom';

class IRSlickSlider extends Component {
	constructor(props) {
		super(props);
		this.ProductClicked = this.ProductClicked.bind(this);
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

	ProductClicked(i, e) {
		// this.ViewedProducts.addProductIdToLocalStorage(this.props.product.product_id);

		if (e.target.getAttribute('id')) {
			const viewedProducts = this.getArrayFromLocalStorage();
			if (viewedProducts.includes(e.target.getAttribute('id'))) {
				const index = viewedProducts.indexOf(e.target.getAttribute('id'));
				viewedProducts.splice(index, 1);
				viewedProducts.push(e.target.getAttribute('id'));
			} else {
				viewedProducts.push(e.target.getAttribute('id'));
			}
			localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
			this.setState({ viewedProducts });
		}
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
					<p className="similar-li-wrapper">
						<h2>{this.props.recommendationLabel}</h2>
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
												onClick={this.ProductClicked.bind(
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
														onClick={this.ProductClicked.bind(
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
															onClick={this.ProductClicked.bind(
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
			</div>
		);
	}
}

export default IRSlickSlider;
