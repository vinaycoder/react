import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MetaTags from '../components/metaTags';
import ProductDetails from '../components/productDetails';

const ProductContainer = props => {
	const {
		addCartItem,
		getJSONLD,
		loginPost,
		state: {
			productDetails,
			settings,
			categories,
			recommendationProducts,
			isLoggedIn,
			statsCookieId,
			customerDetails
		}
	} = props;

	if (productDetails) {
		const { images } = productDetails;
		const imageUrl = images && images.length > 0 ? images[0].url : null;
		const title =
			productDetails.meta_title && productDetails.meta_title.length > 0
				? productDetails.meta_title
				: productDetails.name;
		const jsonld = getJSONLD(props.state);

		return (
			<Fragment>
				<MetaTags
					title={title}
					description={productDetails.meta_description}
					canonicalUrl={productDetails.url}
					imageUrl={imageUrl}
					ogType="product"
					ogTitle={productDetails.name}
					ogDescription={productDetails.meta_description}
					jsonld={jsonld}
				/>

				<ProductDetails
					settings={settings}
					product={productDetails}
					addCartItem={addCartItem}
					categories={categories}
					recommendationProducts={recommendationProducts}
					loginPost={loginPost}
				/>
			</Fragment>
		);
	}
	return null;
};

ProductContainer.propTypes = {
	getJSONLD: PropTypes.func.isRequired,
	addCartItem: PropTypes.func.isRequired,
	loginPost: PropTypes.func,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		productDetails: PropTypes.shape({}),
		categories: PropTypes.arrayOf(PropTypes.shape({})),
		recommendationProducts: PropTypes.arrayOf(PropTypes.shape({})),
		isLoggedIn: PropTypes.shape({}),
		statsCookieId: PropTypes.shape({}),
		customerDetails: PropTypes.shape({})
	}).isRequired
};

export default ProductContainer;
