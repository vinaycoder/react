import React, { Component } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';

class HomeSlider extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const settings = {
			autoplay: false,
			autoplaySpeed: 4000,
			infinite: true,
			arrow: false,
			adaptiveHeight: false,
			draggable: true,
			pauseOnFocus: true,
			pauseOnHover: true,
			lazyLoad: 'progressive',
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			responsive: [
				{
					breakpoint: 1366,
					settings: {
						arrows: false,
						centerMode: true,
						centerPadding: '0px',
						slidesToShow: 1
					}
				},
				{
					breakpoint: 994,
					settings: {
						arrows: false,
						centerMode: true,
						centerPadding: '0px',
						slidesToShow: 1,
						dots: false
					}
				},
				{
					breakpoint: 650,
					settings: {
						arrows: false,
						centerMode: true,
						centerPadding: '0px',
						slidesToShow: 1,
						dots: false
					}
				},
				{
					breakpoint: 480,
					settings: {
						arrows: false,
						centerMode: true,
						centerPadding: '0px',
						slidesToShow: 1,
						dots: false
					}
				},
				{
					breakpoint: 250,
					settings: {
						arrows: false,
						centerMode: true,
						centerPadding: '0px',
						slidesToShow: 1,
						dots: false
					}
				}
			]
		};

		// console.log('props');
		// console.log(this.props.products);

		return (
			<div>
				{this.props.products && (
					<div className="similar-li-wrapper">
						<ul>
							<Slider {...settings}>
								{this.props.products.map(irProduct => (
									<li
										className="category-landscape-view-li-wrapper"
										itemType="https://schema.org/Enumeration"
										itemID={irProduct.id}
										key={irProduct.id}
									>
										<div className="category-landscape-image-wrapper onsale-category-container-list">
											<NavLink
												to={`/${irProduct.new_landing_url}`}
												id={irProduct.id}
											>
												<img
													data-arg1={irProduct.id}
													src={irProduct.big_image_url}
													alt={irProduct.name}
												/>
											</NavLink>
										</div>
									</li>
								))}
							</Slider>
						</ul>
					</div>
				)}
			</div>
		);
	}
}

export default HomeSlider;
