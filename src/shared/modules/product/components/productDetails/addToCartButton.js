import React from 'react';
import * as helper from '../../../../lib/helper';
import { themeSettings, text } from '../../../../lib/settings';

const AddToCartButton = ({
	product,
	variant,
	addCartItem,
	isAllOptionsSelected
}) => {
	console.log('variant');
	console.log(variant);

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
	console.log('vinay in prduct');
	console.log(product);
	if (!product.is_salable) {
		return (
			<div
				className="old-price font-medium clear product-stock-qty-mobile-ivsp"
				id="cartButton"
			>
				<p className="product-view-avail-out-of-stock" content="Out Of Stock">
					<b className="convert-test-v1-out-of-stock">Sold Out</b>
				</p>
				<div id="outofstockmessage">
					<p>Due to popular demand this product is currently Out of stock.</p>
				</div>

				<div className="product-outofstock font-medium">
					<div className="product-outofstock-box">
						<span data-content="bar" />
						<input
							type="hidden"
							value="2018-08-15 18:40:41"
							id="current_date"
						/>
						<input type="hidden" id="product_Id" value="1142567" />
						<input
							type="hidden"
							id="user_email"
							value="testvinay@indiarush.com"
						/>
						<input type="hidden" id="user_name" value="test vinay" />
						<div className="price-clone-notify">
							<button
								id="product-notify-button"
								className="orange-button btn-cart"
							>
								<b>Notify me when this product is back in stock</b>
							</button>
							<div>
								<p>(This product will be added to your save for later list)</p>
							</div>
						</div>
						<div className="clear" />
					</div>
					<div className="clear" />
				</div>
			</div>
		);
	} else {
		return (
			<div
				className="add-to-cart checkout-types product-page-add-to-cart-button product-page-add-to-cart-button-web product-page-add-to-cart-button-web-add-css NewChangePostionSize"
				id="cartButton"
			>
				<button
					id="buy-button"
					type="button"
					title="Add to My Cart"
					onClick={e => {
						addCartItem('addCart');
					}}
					className="orange-button btn-cart product-page-add-to-cart-button btn-cart-product btn-cart-product-main proAddToCartBtn"
				>
					<div id="buy-now">
						<span
							className="product-page-add-to-cart-button product-page-add-to-cart-text addToCartBtn productAddToCartText "
							data-content="bar"
						>
							Add to My Cart
						</span>
						<span
							className="addToCartBtnIcon productCTAIcons"
							data-content="bar"
						>
							<i className="material-icons">shopping_cart</i>
						</span>
					</div>
				</button>


				<button
					id="buy-now-button"
					type="button"
					title="Add to My Cart"
					onClick={e => {
						addCartItem('buyNow');
					}}
					className="orange-button btn-cart product-page-add-to-cart-button btn-cart-product btn-cart-product-main proAddToCartBtn"
				>
					<div id="buy-now">
						<span
							className="product-page-add-to-cart-button product-page-add-to-cart-text addToCartBtn productAddToCartText "
							data-content="bar"
						>
						Buy Now
						</span>
						<span
							className="addToCartBtnIcon productCTAIcons"
							data-content="bar"
						>
						  <i className="material-icons">play_arrow</i>

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
	} else if (product.variable && variant && variant.max_quantity > 0) {
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
