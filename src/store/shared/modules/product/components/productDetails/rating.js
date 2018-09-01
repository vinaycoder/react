import React from 'react';
import * as helper from '../../../../lib/helper';
import { themeSettings, text } from '../../../../lib/settings';

const Rating = ({ product, variant, addCartItem, isAllOptionsSelected }) => {
	return (
		<div className="product-explore">
			<div className="product-explore-save-for-later-wrapper-variate">
				<span className="rating-star-variation fixWidth">
					<a href="#productRatings">
						<span className="">
							<i className="material-icons externalIconWidth ratingStarColor">
								star_rate
							</i>
						</span>
					</a>
				</span>
				<span className="productRatingBestQualityText">
					{product.rating.average_rating}
				</span>
				<span className="left best-quality-product-page fixWidth">
					<span className="sprites productBestQuality productBestQualityIcons">
						<i className="material-icons externalIconWidth bestQualityColor">
							thumb_up
						</i>
					</span>
				</span>
				<span className="productRatingBestQualityText">Best Quality</span>
			</div>
		</div>
	);
};

export default Rating;
