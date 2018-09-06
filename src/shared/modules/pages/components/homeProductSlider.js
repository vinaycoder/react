import React, { Component } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';

class HomeProductSlider extends Component {
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

		// console.log('recommendations');
		// console.log(this.props.recommendations);

		return (
			<div>
				{this.props.recommendations && (
					<div className="similar-li-wrapper">
						{this.props.recommendations.map(recommendation => (
							<div>
								<h3 className="homeStripsHeading">
									{recommendation.head_title}
								</h3>
								<ul>
									<Slider {...settings}>
										{recommendation.products.map(irProduct => (
											<li
												className="category-landscape-view-li-wrapper"
												itemType="https://schema.org/Enumeration"
												itemID={irProduct.product_id}
												key={irProduct.product_id}
											>
												<div className="category-landscape-image-wrapper onsale-category-container-list">
													<NavLink
														to={`/${irProduct.product_urlpath}`}
														id={irProduct.product_id}
													>
														<img
															data-arg1={irProduct.product_id}
															src={irProduct.product_img}
															alt={irProduct.product_name}
														/>
													</NavLink>
												</div>

												<div className="listview">
													<div className="category-landscape-content-wrapper">
														<div className="products-grid-price-name category-landscape-price-name-wrapper">
															<NavLink
																to={`/${irProduct.product_urlpath}`}
																id={irProduct.product_id}
															>
																<div className="product-price-discount price_variation_test price_variation_test_convert_v1 convert-cart-v1-test-show">
																	<span className="original-category-price original-category-price-add-css similar_price">
																		{irProduct.product_offer}
																	</span>
																	<span className="product-discount">
																		{irProduct.discount && (
																			<span>({irProduct.discount})</span>
																		)}
																	</span>
																</div>
																<div className="clear" />
															</NavLink>
														</div>

														<div className="products-grid-newblock category-landscape-grid-new-block">
															<div className="product-name">
																<NavLink
																	to={`/${irProduct.product_urlpath}`}
																	id={irProduct.product_id}
																>
																	{irProduct.product_name}
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
						))}
					</div>
				)}
			</div>
		);
	}
}

export default HomeProductSlider;
