import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as helper from '../../lib/helper';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';
import MetaTags from '../common/components/metaTags';
import CheckoutSuccess from './components/checkoutSuccess';

const CheckoutSuccessContainer = props => {
	const {
		state: { pageDetails, order, settings, shippingMethods, checkoutFields }
	} = props;
	const shippingMethod = helper.getShippingMethodFromOrder(
		order,
		shippingMethods
	);

	return (
		<Fragment>
		{/*
			<MetaTags
				title={pageDetails.meta_title}
				description={pageDetails.meta_description}
				canonicalUrl={pageDetails.url}
				ogTitle={pageDetails.meta_title}
				ogDescription={pageDetails.meta_description}
			/>
			*/}

			<section className="section section-checkout">
				<div className="container">
					<div className="columns content">
						<div className="column is-8 is-offset-2">
							<div className="checkout-box">
								<CheckoutSuccess
									order={props.state.currentOrder}
									settings={settings}
									pageDetails={pageDetails}
									shippingMethod={shippingMethod}
									checkoutFields={checkoutFields}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

// CheckoutSuccessContainer.propTypes = {
// 	state: PropTypes.shape({
// 		settings: PropTypes.shape({}),
// 		pageDetails: PropTypes.shape({}),
// 		order: PropTypes.shape({}),
// 		shippingMethods: PropTypes.arrayOf(PropTypes.shape({})),
// 		checkoutFields: PropTypes.arrayOf(PropTypes.shape({}))
// 	}).isRequired
// };

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(CheckoutSuccessContainer)
);
