import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import ProductList from '../components/productList';
import ProductFilter from '../components/productFilter';
import Sort from '../components/sort';
import * as helper from '../lib/helper';

const SearchContainer = props => {
	const {
		setSort,
		addCartItem,
		loadMoreProducts,
		unsetFilterAttribute,
		getJSONLD,
		state,
		state: {
			products,
			categoryDetails,
			settings,
			productFilter,
			productsHasMore,
			categories,
			loadingProducts,
			loadingMoreProducts,
			productsTotalCount,
			productsPage,
			productsAttributes
		}
	} = props;
	const searchNotEmpty = productFilter.search && productFilter.search !== '';
	const searchDescription = searchNotEmpty
		? `${text.resultsFor} "${productFilter.search}"`
		: text.search;
	const title = searchNotEmpty
		? `${productFilter.search} - ${text.search}`
		: text.search;
	const showFilter = true;

	return (
		<Fragment>
			<MetaTags title={title} />

			<section className="hero is-light">
				<div className="hero-body">
					<div className="container">
						<h1 className="title is-4">{searchDescription}</h1>
					</div>
				</div>
			</section>

			<section className="section section-category">
				<div className="container">
					<div className="columns">
						{showFilter === true && (
							<div className="column is-one-quarter left-sidebar">
								<ProductFilter {...props} />
							</div>
						)}

						<div className="column">
							<div className="columns">
								<div className="column" />
								<div className="column is-5">
									<Sort
										defaultSort={settings.default_product_sorting}
										currentSort={productFilter.sort}
										setSort={setSort}
									/>
								</div>
							</div>
							<ProductList
								products={products}
								addCartItem={addCartItem}
								settings={settings}
								loadMoreProducts={loadMoreProducts}
								hasMore={productsHasMore}
								productsPag={productsPage}
								loadingProducts={loadingProducts}
								loadingMoreProducts={loadingMoreProducts}
							/>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

SearchContainer.propTypes = {
	addCartItem: PropTypes.func.isRequired,
	loadMoreProducts: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		products: PropTypes.arrayOf(PropTypes.shape({})),
		productFilter: PropTypes.shape({}),
		productsHasMore: PropTypes.bool
	}).isRequired
};

export default SearchContainer;
