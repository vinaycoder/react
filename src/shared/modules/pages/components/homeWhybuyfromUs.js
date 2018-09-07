import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HomeWhybuyfromUs extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log('props');
		// console.log(this.props.promotions);

		return (
			<div className="">
				<div className="homeHeadingText">
					<strong>WHY BUY FROM US</strong>
				</div>
				<div className="divider1" />
				<div className="homeDOD columns homeDOD-whybuyfromUs-wrapper">
					<div className="homeDODItem valuePropItem column is-3">
						<div className="valuePropHeading">
							<span className="freeShippingIcon valueProportionIcons" />
							<span className="valuePropHeadingText">Free Shipping</span>
						</div>
						<div className="valuePropDesc">
							<p>
								Place order with minimum order size of Rs.500 and Get Free
								Shipping.
							</p>
						</div>
					</div>
					<div className="homeDODItem valuePropItem column is-3">
						<div className="valuePropHeading">
							<span className="return14DaysIcon valueProportionIcons" />
							<span className="valuePropHeadingText">
								14 days Returns Policy
							</span>
						</div>
						<div className="valuePropDesc">
							<ul className="return-policy-text">
								<li>No Questions Asked return</li>
								<li>Get Cash/Store Credits refund for return product</li>
							</ul>
						</div>
					</div>
					<div className="homeDODItem valuePropItem column is-3">
						<div className="valuePropHeading">
							<span className="freeBonusIcon valueProportionIcons" />
							<span className="valuePropHeadingText">
								Free Bonus With A Purchase
							</span>
						</div>
						<div className="valuePropDesc">
							<p>Get UPTO 10% Store Credits with every purchase.</p>
						</div>
					</div>
					<div className="homeDODItem valuePropItem column is-3">
						<div className="valuePropHeading">
							<span className="goodPriceIcon valueProportionIcons" />
							<span className="valuePropHeadingText">
								Good Collection At Low Price
							</span>
						</div>
						<div className="valuePropDesc">
							<li>50,000+ Styles</li>
							<li>2,500+ Brands</li>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeWhybuyfromUs;
