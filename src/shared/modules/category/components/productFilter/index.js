import React from 'react';
import { NavLink } from 'react-router-dom';
import { text } from '../../../../lib/settings';

import Sort from '../sort';
import PriceSlider from './priceSlider';
import AttributeFilter from './attributeFilter';

export default class ProductFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarIsActive: false,
			ProductAttributeFilter:[],
			currentCategory:null
		};
			this.getProductAttributeFilter = this.getProductAttributeFilter.bind(this);
	}

async getProductAttributeFilter() {
return	await fetch(
	`https://indiarush.com/irapi/category/getCategoryFilters/?category_id=${this.props.state.currentPage.resource}&version=3.81`
	)
		.then(result => result.json())
		.then(jsonResult => {
			return jsonResult.data.filters;
		});
}



	async componentDidMount(){
		const filtersData = await this.getProductAttributeFilter();
		this.setState({ProductAttributeFilter:filtersData});
		this.setState({prevState:this.props.state.currentPage.resource});
	}

async componentDidUpdate(nextProps)
{
	if(this.state.prevState!==this.props.state.currentPage.resource)
	{
		const filtersData = await this.getProductAttributeFilter();
		this.setState({ProductAttributeFilter:filtersData});
		this.setState({prevState:this.props.state.currentPage.resource});
	}
}
	sidebarToggle = () => {
		this.setState({
			sidebarIsActive: !this.state.sidebarIsActive
		});
		document.body.classList.toggle('noscroll');
	};

	sidebarClose = () => {
		this.setState({ sidebarIsActive: false });
		document.body.classList.remove('noscroll');
	};

	render() {
		const { sidebarIsActive } = this.state;
		const {
			categoryDetails,
			categories,
			settings,
			productFilter,
			productsMinPrice,
			productsMaxPrice,
			productsAttributes
		} = this.props.state;

		return (
			<div>
				<div className="is-hidden-tablet">
					<button className="button is-fullwidth" onClick={this.sidebarToggle}>
						{text.filterProducts}
					</button>
				</div>

				<div
					className={sidebarIsActive ? 'modal is-active' : 'is-hidden-mobile'}
					style={{ zIndex: 101 }}
				>
					<div
						className={sidebarIsActive ? 'dark-overflow' : ''}
						onClick={this.sidebarClose}
					/>
					<div className={sidebarIsActive ? 'modal-content' : ''}>
						<div className={sidebarIsActive ? 'box sidebar' : ''}>
							<button
								className="button is-fullwidth is-dark is-hidden-tablet"
								onClick={this.sidebarClose}
							>
								{text.close}
							</button>
							{/*
							<div className="is-hidden-tablet" style={{ marginBottom: 30 }}>
								<Sort
									defaultSort={settings.default_product_sorting}
									currentSort={productFilter.sort}
									setSort={this.props.setSort}
								/>
							</div>
						*/}


					<AttributeFilter
						attributes={this.state.ProductAttributeFilter}
						setFilterAttribute={this.props.setFilterAttribute}
						unsetFilterAttribute={this.props.unsetFilterAttribute}

					/>








							{/*
							// <PriceSlider
							// 	minPrice={productsMinPrice}
							// 	maxPrice={productsMaxPrice}
							// 	minValue={productFilter.priceFrom}
							// 	maxValue={productFilter.priceTo}
							// 	setPriceFromAndTo={this.props.setPriceFromAndTo}
							// 	settings={settings}
							// />
							*/}

							<button
								className="button is-fullwidth is-dark is-hidden-tablet"
								onClick={this.sidebarClose}
							>
								{text.close}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
