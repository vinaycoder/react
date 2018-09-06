import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';
import MetaTags from '../common/components/metaTags';
import CustomProducts from '../product/components/products/custom';
import HomeSlider from './components/homeSlider';
import DealofDay from './components/dealofDay';
import BestPick from './components/bestPick';
import HomeProductSlider from './components/homeProductSlider';

const HomeContainer = props => {
	const {
		addCartItem,
		state: { pageDetails, settings }
	} = props;

	// const trendingBestSeller = {};
	const trendingBestSeller = [];
	const soldIn24hours = [];
	const categoryRecommendation = [];
	const otherRecommendation = [];

	const isTrendingBestSeller = 0;
	const isSoldIn24hours = 0;
	const isCategoryRecommendation = 0;
	const isOtherRecommendation = 0;

	console.log('HomeContainer pageDetails');
	console.log(pageDetails);

	pageDetails.getHomePageRecommendationDetails.map(
		getHomePageRecommendationDetail =>
			getHomePageRecommendationDetail.head_title === 'Trending BestSeller'
				? trendingBestSeller.push(getHomePageRecommendationDetail)
				: // Object.assign({}, trendingBestSeller, {trendingBestSeller: getHomePageRecommendationDetail} )

				  trendingBestSeller.push()
			// Object.assign({}, trendingBestSeller,{} )
	);

	pageDetails.getHomePageRecommendationDetails.map(
		getHomePageRecommendationDetail =>
			getHomePageRecommendationDetail.head_title ===
			"Sold In 24 Hours, Don't Miss Out On These"
				? soldIn24hours.push(getHomePageRecommendationDetail)
				: soldIn24hours.push()
	);

	pageDetails.getHomePageRecommendationDetails.map(
		getHomePageRecommendationDetail =>
			getHomePageRecommendationDetail.head_title === 'Most Loved Kurtis'
				? categoryRecommendation.push(getHomePageRecommendationDetail)
				: categoryRecommendation.push()
	);

	pageDetails.getHomePageRecommendationDetails.map(
		getHomePageRecommendationDetail =>
			getHomePageRecommendationDetail.head_title ===
			'You may also interested in the following producs'
				? otherRecommendation.push(getHomePageRecommendationDetail)
				: otherRecommendation.push()
	);
	//
	// console.log("trendingBestSeller");
	// console.log(trendingBestSeller);
	return (
		<Fragment>
			{/*<MetaTags
				title={pageDetails.meta_title}
				description={pageDetails.meta_description}
				canonicalUrl={pageDetails.url}
				ogTitle={pageDetails.meta_title}
				ogDescription={pageDetails.meta_description}
			/>

			{pageDetails.content &&
				pageDetails.content.length > 10 && (
					<section className="section">
						<div className="container">
							<div className="content">
								<div
									dangerouslySetInnerHTML={{
										__html: pageDetails.content
									}}
								/>
							</div>
						</div>
					</section>
				)}

				<HomeSlider
				pageDetails={pageDetails}
				settings={pageDetails}
				/>

				*/}

			{pageDetails.getHomePageDetails.slider && (
				<HomeSlider products={pageDetails.getHomePageDetails.slider} />
			)}
			{trendingBestSeller && (
				<HomeProductSlider recommendations={trendingBestSeller} />
			)}
			{pageDetails.getHomePageDetails.promotion && (
				<DealofDay promotions={pageDetails.getHomePageDetails.promotion} />
			)}
			{pageDetails.getHomePageDetails.bestPick && (
				<BestPick promotions={pageDetails.getHomePageDetails.bestPick} />
			)}
			{soldIn24hours && <HomeProductSlider recommendations={soldIn24hours} />}
			{categoryRecommendation && (
				<HomeProductSlider recommendations={categoryRecommendation} />
			)}
			{/*otherRecommendation && <HomeProductSlider recommendations={otherRecommendation} />*/}
		</Fragment>
	);
};

HomeContainer.propTypes = {
	addCartItem: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(HomeContainer)
);
