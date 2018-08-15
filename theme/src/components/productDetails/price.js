import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const FormattedCurrency = ({ number, settings }) =>
	helper.formatCurrency(number, settings);

const NewAndOldPrices = ({ newPrice, oldPrice, settings }) => (
	<div className="product-price">
		<span className="product-new-price">
			<FormattedCurrency settings={settings} number={newPrice} />
		</span>
		<del className="product-old-price">
			<FormattedCurrency settings={settings} number={oldPrice} />
		</del>
	</div>
);

const Price = ({ product, variant, isAllOptionsSelected, settings }) => {
	let priceStyle = {};
	if (
		themeSettings.details_price_size &&
		themeSettings.details_price_size > 0
	) {
		priceStyle.fontSize = themeSettings.details_price_size + 'px';
	}
	if (
		themeSettings.details_price_color &&
		themeSettings.details_price_color.length > 0
	) {
		priceStyle.color = themeSettings.details_price_color;
	}

	let price = 0;
	let oldPrice = 0;

	if (product.variable && variant && variant.price > 0) {
		price = variant.price;
	} else {
		price = product.price;
	}

	if (product.on_sale) {
		oldPrice = product.regular_price;
	}

	if (oldPrice > 0) {
		return (
			<NewAndOldPrices
				settings={settings}
				newPrice={price}
				oldPrice={oldPrice}
			/>
		);
	} else {
		var discountPrice=product.actual_price-product.offered_price;
	  var discoutPercentage=(discountPrice*100)/product.actual_price;
		return (
			<div className="product-price-one old-price product-view-price-old invesp-price-div" style={priceStyle}>
			{discoutPercentage>0 && (
				<div class="clear priceDropBlock">
					<p>
						<span class="priceDropIcon" data-content="bar"></span>
						Price dropped {parseInt(discoutPercentage)}%
					</p>
				</div>
					)}
			<p className="price" id="old_parent_id">
					<span className="old_price old_price-v-test"data-content="bar">Rs {product.actual_price}</span>
					<span className="product-price-view invesp-product-price-view product-price-view-v-test-main" id="regular_price_id">Rs {product.offered_price}</span>
				<span className="product-view-shipping product-view-shipping-v-test-main">
				+ Free Shipping
				</span>
           </p>
			{product.is_salable && (
          <div id="saleablediv">
							<div className="old-price font-medium product-stock-qty product-stock-qty-mobile-ivsp" >
									<span className="product-view-avail-in-stock product-view-avail-in-stock-v-test-main">

									      {product.available_quantity>10 ? (
														<div className="font-small variation_qty_product">
																<strong>Low in Stock</strong>
															</div>
												) : (
													<div className="inStockInProduct">
													<span content="In Stock">In Stock</span>
											 </div>
												)}

											<div className="clear"></div>
								</span>
							</div>
			   </div>
			)}
			{product.is_salable && (
				 <p className="invesp-diccount-sticker-p invesp-diccount-sticker-p-v-test-main">
					<span className="price save font-medium you-save-span you-save-span-main-add-css">You Save :
					</span>
					<span className="you-save-span-percent1 you-save-span-main-add-css">Rs {discountPrice} </span>
				</p>
      )}
				{/* <FormattedCurrency settings={settings} number={product.actual_price} /> */}
			</div>
		);
	}
};

export default Price;
