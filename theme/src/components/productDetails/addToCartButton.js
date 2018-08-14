import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const AddToCartButton = ({
	product,
	variant,
	addCartItem,
	isAllOptionsSelected
}) => {
	let buttonStyle = {};
	if (
		themeSettings.button_addtocart_bg &&
		themeSettings.button_addtocart_bg.length > 0
	) {
		buttonStyle.backgroundColor = themeSettings.button_addtocart_bg;
	}
	if (
		themeSettings.button_addtocart_color &&
		themeSettings.button_addtocart_color.length > 0
	) {
		buttonStyle.color = themeSettings.button_addtocart_color;
	}

	let addToCartText =
		themeSettings.button_addtocart_text &&
		themeSettings.button_addtocart_text.length > 0
			? themeSettings.button_addtocart_text
			: text.addToCart;


	if (!product.is_salable) {
		return (
			<p className="product-view-avail-out-of-stock" content="Out Of Stock">
			<b className="convert-test-v1-out-of-stock">Sold Out</b>
			</p>
		);
	}else{
	return (
<div className="add-to-cart checkout-types product-page-add-to-cart-button product-page-add-to-cart-button-web product-page-add-to-cart-button-web-add-css NewChangePostionSize">
<button id="buy-button" type="button" title="Add to My Cart" onClick={addCartItem} className="orange-button btn-cart product-page-add-to-cart-button btn-cart-product btn-cart-product-main proAddToCartBtn">
	 <div id="buy-now">
			 <span className="product-page-add-to-cart-button product-page-add-to-cart-text addToCartBtn productAddToCartText " data-content="bar">Add to My Cart</span>
			 <span className="addToCartBtnIcon productCTAIcons" data-content="bar"><i class="material-icons">
shopping_cart
</i></span>
	 </div>
	 </button>

	 <button id="buy-now-button" type="button" title="Buy Now" className="orange-button btn-buy">
	 <div id="buy-now-label">

			 <span className="right product-page-add-to-cart-button"  data-content="bar">
				 <span className="product-page-add-to-cart-button product-page-add-to-cart-text productBuyNowText" data-content="bar">Buy Now
			 </span>
					 <span className="buyNowBtnIcon productCTAIcons" data-content="bar">
					 <i class="material-icons">play_arrow</i>
					 </span>

		 </span>
	 </div>
	 </button>
</div>
	);

}

/*
	if (product.stock_status === 'discontinued') {
		return (
			<button
				className="button is-dark is-fullwidth"
				style={buttonStyle}
				disabled
			>
				{text.discontinued}
			</button>
		);
	} else if (product.variable && variant && variant.stock_quantity > 0) {
		return (
			<button
				className="button is-success is-fullwidth"
				style={buttonStyle}
				onClick={addCartItem}
			>
				{addToCartText}
			</button>
		);
	} else if (product.variable && !isAllOptionsSelected) {
		return (
			<button
				className="button is-success is-fullwidth"
				style={buttonStyle}
				disabled
			>
				{text.optionsRequired}
			</button>
		);
	} else if (product.variable && !product.stock_backorder) {
		return (
			<button
				className="button is-success is-fullwidth"
				style={buttonStyle}
				disabled
			>
				{text.outOfStock}
			</button>
		);
	} else if (product.stock_status === 'available') {
		return (
			<button
				className="button is-success is-fullwidth"
				style={buttonStyle}
				onClick={addCartItem}
			>
				{addToCartText}
			</button>
		);
	} else if (product.stock_status === 'out_of_stock') {
		return (
			<button
				className="button is-success is-fullwidth"
				style={buttonStyle}
				disabled
			>
				{text.outOfStock}
			</button>
		);
	} else {
		return null;
	}
	*/
};

export default AddToCartButton;
