import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class IrCategoryOfferHtml extends Component {
	constructor(props) {
		super(props);
		// console.log("this.props.offers");
		// console.log(this.props.offers);
	}

	render() {
		const { offers } = this.props;

		return (
			<div className="column is-12">
				{offers.map(offer => (
					<span className="categoryOfferBannerItem column is-4">
						<NavLink
							to={`/${offer.landing_url.filters}`}
							id={offer.landing_url.id}
						>
							<img className="categoryOfferBannerImg" src={offer.image} />
						</NavLink>
					</span>
				))}
			</div>
		);
	}
}

export default IrCategoryOfferHtml;
