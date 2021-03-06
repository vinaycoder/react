import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';
import { text } from '../../lib/settings';
import MetaTags from '../common/components/metaTags';
import ProductList from './components/productList';
import ProductFilter from './components/productFilter';
import Sort from './components/sort';
import CategoryBreadcrumbs from './components/categoryBreadcrumbs';
import CategoryOffers from './components/categoryOffers';
import * as helper from '../../lib/helper';

const getFilterAttributesSummary = productFilter => {
	let attributesSummary = '';
	if (productFilter.attributes) {
		Object.keys(productFilter.attributes).forEach(attributeKey => {
			const attributeName = attributeKey.replace('attributes.', '');
			const attributeValue = productFilter.attributes[attributeKey];
			const attributeValueFormatted = Array.isArray(attributeValue)
				? attributeValue.join(', ')
				: attributeValue;
			attributesSummary += `. ${attributeName}: ${attributeValueFormatted}`;
		});
	}
	return attributesSummary;
};

const getFilterPriceSummary = (productFilter, settings) => {
	let priceSummary = '';
	if (productFilter.priceFrom > 0 && productFilter.priceTo > 0) {
		const priceFrom = helper.formatCurrency(productFilter.priceFrom, settings);
		const priceTo = helper.formatCurrency(productFilter.priceTo, settings);
		priceSummary = `. ${text.price}: ${priceFrom} - ${priceTo}`;
	}
	return priceSummary;
};

const CategoryHero = ({
	categoryDetails,
	categories,
	productsTotalCount,
	productsAttributes,
	productFilter,
	unsetFilterAttribute,
	settings,
	setSort
}) => (
	<div className="hero-body columns">
		<div className="category-offers-main-wrapper">
			<div className="">
				<CategoryOffers currentCategory={categoryDetails} />
			</div>

			<div className="">
				<div className="category-other-data-main-wrapper">
					<div className="">
						<div className="">
							<div className="category-title">{categoryDetails.name} </div>
							<div className="category-count">
								{productsTotalCount} Products{' '}
							</div>
						</div>

						{
							<AppliedFilters
								allFilters={productsAttributes}
								appliedFiltersList={productFilter.attributes.filters}
								unsetFilterAttribute={unsetFilterAttribute}
							/>
						}

						<div
							className="category-description is-hidden-mobile content"
							dangerouslySetInnerHTML={{
								__html: categoryDetails.description
							}}
						/>
					</div>

					<div className="category-sort-align">
						<Sort
							defaultSort={settings.default_product_sorting}
							currentSort={productFilter.sort}
							setSort={setSort}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const AppliedFilters = ({
	allFilters,
	appliedFiltersList,
	unsetFilterAttribute
}) => {
	if (appliedFiltersList) {
		const appliedFiltersDiv = Object.keys(appliedFiltersList).map(
			filterCode => (
				<AppliedFilter
					key={filterCode}
					filterCode={filterCode}
					filterValue={appliedFiltersList[filterCode]}
					allFilters={allFilters}
					unsetFilterAttribute={unsetFilterAttribute}
				/>
			)
		);
		return <span className="applied-filters">{appliedFiltersDiv}</span>;
	}
	return null;
};

class AppliedFilter extends React.Component {
	constructor(props) {
		super(props);
	}

	onChange = event => {
		const { filterCode, filterValue, unsetFilterAttribute } = this.props;
		unsetFilterAttribute(filterCode, filterValue);
	};

	render() {
		const { filterCode, filterValue, allFilters } = this.props;
		let filterLabel = null;
		let filterValueLabel = null;
		for (const key in allFilters) {
			if (allFilters[key].id == filterCode) {
				for (const secondKey in allFilters[key].sub_label) {
					filterLabel = allFilters[key].label;
					if (allFilters[key].sub_label[secondKey].value == filterValue) {
						filterValueLabel = allFilters[key].sub_label[secondKey].label;
					}
				}
			}
		}

		return (
			<span className="applied-filters">
				<span>
					{filterLabel} : {filterValueLabel}
				</span>
				{/*<span onClick={this.onChange}>Button</span>*/}
				<i className="material-icons icon filter-close" onClick={this.onChange}>
					close
				</i>
			</span>
		);
	}
}

CategoryHero.propTypes = {
	categoryDetails: PropTypes.shape({}).isRequired,
	categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const CategoryContainer = props => {
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

	const filterAttributesSummary = getFilterAttributesSummary(productFilter);
	const filterPriceSummary = getFilterPriceSummary(productFilter, settings);

	const pageTitle =
		categoryDetails.meta_title && categoryDetails.meta_title.length > 0
			? categoryDetails.meta_title
			: categoryDetails.name;
	const title = `${pageTitle}${filterAttributesSummary}${filterPriceSummary}`;

	const jsonld = getJSONLD(state);

	const showFilter = true;

	return (
		<Fragment>
			<MetaTags
				title={title}
				productsTotalCount={productsTotalCount}
				description={categoryDetails.meta_description}
				canonicalUrl={categoryDetails.url}
				imageUrl={categoryDetails.image}
				ogType="product.group"
				ogTitle={categoryDetails.name}
				ogDescription={categoryDetails.meta_description}
				jsonld={jsonld}
			/>

			<div>
				<div className="container">
					<div className="columns">
						<section className="section section-filters column is-3">
							<CategoryBreadcrumbs
								currentCategory={categoryDetails}
								categories={categories}
							/>

							{showFilter === true && (
								<div className="">
									<ProductFilter {...props} />
								</div>
							)}
						</section>

						<section className="section section-category column is-9">
							<CategoryHero
								categoryDetails={categoryDetails}
								categories={categories}
								productsTotalCount={productsTotalCount}
								productsAttributes={productsAttributes}
								productFilter={productFilter}
								unsetFilterAttribute={unsetFilterAttribute}
								settings={settings}
								setSort={setSort}
							/>

							<div className="column">
								<div className="columns">
									<div className="column" />
									<div className="column is-5">
										{/*<Sort
																			defaultSort={settings.default_product_sorting}
																			currentSort={productFilter.sort}
																			setSort={setSort}
																		/>*/}
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
						</section>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

CategoryContainer.propTypes = {
	setSort: PropTypes.func.isRequired,
	addCartItem: PropTypes.func.isRequired,
	loadMoreProducts: PropTypes.func.isRequired,
	unsetFilterAttribute: PropTypes.func.isRequired,
	getJSONLD: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		products: PropTypes.arrayOf(PropTypes.shape({})),
		productFilter: PropTypes.shape({}),
		productsHasMore: PropTypes.bool,
		categoryDetails: PropTypes.shape({}),
		categories: PropTypes.arrayOf(PropTypes.shape({})),
		loadingProducts: PropTypes.bool,
		loadingMoreProducts: PropTypes.bool
	}).isRequired
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(CategoryContainer)
);
