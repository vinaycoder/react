import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HomePerfectProduct extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log('props');
		// console.log(this.props.promotions);

		return (
			<div>
				<div className="homeHeadingText">
					<strong>Find Your Perfect Product</strong>
				</div>

				<div className="divider1" />

				<div className="homepage_block_row">
					<div className="homepage_block1">
						<div className="homepage_block_header">Impressive Selection</div>
						<div className="font-medium">
							<ul>
								<li className="line_space">
									Wide range of ethnic wears from every specialized corner of
									India for every occasion to make you look ravishing
								</li>
								<li className="line_space">
									2000 + new Styles add on to the collection in every week
								</li>
								<li className="line_space">
									Latest seasonal trends, designer creativity and affordable
									cost have found a new home.
								</li>
							</ul>
						</div>
					</div>
					<div className="homepage_block2">
						<div className="homepage_block_header">Affordable Pricing</div>
						<div className="font-medium">
							<ul>
								<li className="line_space">
									Unbeatable styles in wedding gallery with designer lehengas
									and sarees, daily wear kurtis and festive show suits are there
									with ‘to-die-for prices’.
								</li>
								<li className="line_space">
									In-house Fashion team like Fashion Edits help you motivate,
									share and shop better.
								</li>
							</ul>
						</div>
					</div>
					<div className="homepage_block3">
						<div className="homepage_block_header">Excellent Support</div>
						<div className="font-medium">
							<ul>
								<li className="line_space">
									Take the privilege to give 360 degree support to our Customers
									through call, emails, messages or one to one options
								</li>
								<li className="line_space">
									Dedicated team to address every inquiries and proposals
								</li>
								<li className="line_space">100% Secured Payment Gateway</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomePerfectProduct;
