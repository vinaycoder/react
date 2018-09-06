import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';
// import MetaTags from '../common/components/metaTags';
// import CustomProducts from '../product/components/products/custom';
import HomePageMain from './components/homePageMain';

const HomeContainer = props => {
	const {
		addCartItem,
		state: { pageDetails, settings }
	} = props;

	console.log('HomeContainer pageDetails');
	console.log(pageDetails);

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

			<HomePageMain pageDetails={pageDetails} settings={settings} />
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
