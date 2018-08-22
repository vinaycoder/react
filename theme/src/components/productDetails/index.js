import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';
import ViewedProducts from '../products/viewed';
import Breadcrumbs from './breadcrumbs';
import DiscountCountdown from './discountCountdown';
import AddToCartButton from './addToCartButton';

import IRProductDetails from './irProductDetails';
import IRProductShipping from './irProductShipping';
import IRProductReturns from './irProductReturns';
import IRProductReviews from './irProductReviews';
import IRProductTNC from './irTermsAndConditions';
import IRSimilarProducts from './irSimilarProducts';

import Attributes from './attributes';
import Gallery from './gallery';
import Options from './options';
import Rating from './rating';
import Price from './price';
import PinCode from './pinCode';
import Quantity from './quantity';
import RelatedProducts from './relatedProducts';
import Tags from './tags';
import Description from './description';
import Buyers from './buyers';

export default class ProductDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOptions: {},
			selectedVariant: null,
			isAllOptionsSelected: false,
			quantity: 1
		};

		this.onOptionChange = this.onOptionChange.bind(this);
		this.findVariantBySelectedOptions = this.findVariantBySelectedOptions.bind(
			this
		);
		this.addToCart = this.addToCart.bind(this);
		this.checkSelectedOptions = this.checkSelectedOptions.bind(this);
	}

	onOptionChange(optionId, valueId) {
		const { selectedOptions } = this.state;

		if (valueId === '') {
			delete selectedOptions[optionId];
		} else {
			selectedOptions[optionId] = valueId;
		}

		this.setState({ selectedOptions });
		this.findVariantBySelectedOptions();
		this.checkSelectedOptions();
	}
	a;
	findVariantBySelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;
		let variant;

		// for (const variant of product.variants) {
		// 	const variantMutchSelectedOptions = variant.options.every(
		// 		variantOption =>
		// 			selectedOptions[variantOption.option_id] === variantOption.value_id
		// 	);
		// 	if (variantMutchSelectedOptions) {
		// 		this.setState({ selectedVariant: variant });
		// 		return;
		// 	}
		// }

		// const items = [];

		const mainOptions = product.configurable_attributes.map(
			(actualoption, index) => {
				const subOptions = actualoption.values.map((optionObj, index) => {
					if (optionObj.product_id == selectedOptions[product.product_id]) {
						variant = optionObj;
					}
				});
			}
		);

		if (Object.keys(selectedOptions).length > 0) {
			this.setState({ selectedVariant: variant });
			return;
		}

		this.setState({ selectedVariant: null });
	}

	setQuantity = quantity => {
		this.setState({ quantity });
	};

	addToCart() {
		const { product, addCartItem } = this.props;
		const { selectedVariant, quantity } = this.state;

		const item = {
			product_id: product.product_id,
			quantity: quantity
		};

		if (selectedVariant) {
			item.variant_id = selectedVariant.product_id;
		}

		addCartItem(item);
	}

	checkSelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;

		// const allOptionsSelected =
		// Object.keys(selectedOptions).length === product.options.length;

		let allOptionsSelected = false;

		if (Object.keys(selectedOptions).length > 0) {
			allOptionsSelected = 'true';
		}

		this.setState({ isAllOptionsSelected: allOptionsSelected });
	}

	render() {
		const {
			product,
			settings,
			categories,
			recommendationProducts
		} = this.props;
		const { selectedVariant, isAllOptionsSelected } = this.state;
		const maxQuantity =
			product.stock_status === 'discontinued'
				? 0
				: product.stock_backorder
					? themeSettings.maxCartItemQty
					: selectedVariant
						? selectedVariant.stock_quantity
						: product.stock_quantity;

		if (product) {
			var customImageAarry = [];
			for (var i = 0; i < product.product_images.length; i += 1) {
				customImageAarry.push({ url: product.product_images[i] });
			}

			return (
				<Fragment>
					<section className="section section-product">
						<div className="container">
							<div className="columns">
								<div className="column is-7">
									{themeSettings.show_product_breadcrumbs && (
										<Breadcrumbs product={product} categories={categories} />
									)}

									<Gallery images={customImageAarry} />
								</div>
								<div className="column is-5">
									<div className="content product-shop">
										<Tags tags={product.tags} />

										<h1 className="product-name product-name-irush">
											{product.name}
										</h1>
										<Rating product={product} />
										<Price
											product={product}
											variant={selectedVariant}
											isAllOptionsSelected={isAllOptionsSelected}
											settings={settings}
										/>

										{themeSettings.show_discount_countdown &&
											product.on_sale === true && (
												<DiscountCountdown product={product} />
											)}

										<Options
											options={product.configurable_attributes}
											onChange={this.onOptionChange}
											product={product}
										/>
										<Quantity
											maxQuantity={maxQuantity}
											onChange={this.setQuantity}
										/>
										<div className="button-addtocart">
											<AddToCartButton
												product={product}
												variant={selectedVariant}
												addCartItem={this.addToCart}
												isAllOptionsSelected={isAllOptionsSelected}
											/>
										</div>
										{product.is_salable && <PinCode product={product} />}
										{product.is_salable && <Buyers />}
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="section clear">
						<div className="container">
							<div className="content">
								<Description />
							</div>
						</div>
					</section>
					{/*
					<section className="section section-product-details">
						<div className="container">
							<div className="content">
								<div className="columns">
									<div className="column is-12">
										<IRProductDetails product={product} />
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="section section-product-returns">
						<div className="container">
							<div className="content">
								<div className="columns">
									<div className="column is-12">
										<IRProductReturns product={product} />
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="section section-product-shipping">
						<div className="container">
							<div className="content">
								<div className="columns">
									<div className="column is-12">
										<IRProductShipping product={product} />
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="section section-product-tnc">
						<div className="container">
							<div className="content">
								<div className="columns">
									<div className="column is-12">
										<IRProductTNC product={product} />
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="section section-product-reviews">
						<div className="container">
							<div className="content">
								<div className="columns">
									<div className="column is-12">
										<IRProductReviews product={product} />
									</div>
								</div>
							</div>
						</div>
					</section>
					*/}
					<section className="section section-product-similar-wrapper">
						<div className="container">
							<div className="content">
								<div className="columns">
									<div className="column is-12">
										<IRSimilarProducts
											settings={settings}
											addCartItem={this.addToCart}
											product={product}
											limit={25}
											recommendationProducts={recommendationProducts}
										/>
									</div>
								</div>
							</div>
						</div>
					</section>

					<RelatedProducts
						settings={settings}
						addCartItem={this.addToCart}
						ids={product.related_product_ids}
						limit={10}
					/>

					{themeSettings.show_viewed_products && (
						<ViewedProducts
							settings={settings}
							addCartItem={this.addToCart}
							product={product}
							limit={25}
							recommendationProducts={recommendationProducts}
						/>
					)}
				</Fragment>
			);
		} else {
			return null;
		}
	}
}
