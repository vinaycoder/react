import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../../../lib/settings';
import ItemTags from './itemTags';
import ItemImage from './itemImage';
import ItemPrice from './itemPrice';
import ItemSize from './itemSize';
import ItemSoldCount from './itemSoldCount';
import ItemRatings from './itemRatings';

class Item extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			product,
			addCartItem,
			settings,
			columnCountOnMobile = 2,
			columnCountOnTablet = 3,
			columnCountOnDesktop = 3,
			columnCountOnWidescreen = 3,
			columnCountOnFullhd = 3,
			itemView
		} = this.props;

		let columnCount = 12;
		let columnSizeOnMobile = columnCount / columnCountOnMobile;
		let columnSizeOnTablet = columnCount / columnCountOnTablet;
		let columnSizeOnDesktop = columnCount / columnCountOnDesktop;
		let columnSizeOnWidescreen = columnCount / columnCountOnWidescreen;
		let columnSizeOnFullhd = columnCount / columnCountOnFullhd;
		if (itemView === 'list') {
			columnSizeOnMobile = 1;
			columnSizeOnTablet = 1;
			columnSizeOnDesktop = 1;
			columnSizeOnWidescreen = 1;
			columnSizeOnFullhd = 1;
			columnCount = 1;
		}

		const imageHeight =
			themeSettings.list_image_max_height &&
			themeSettings.list_image_max_height > 0
				? themeSettings.list_image_max_height
				: 'auto';
		const placeholderHeight =
			themeSettings.list_image_max_height &&
			themeSettings.list_image_max_height > 0
				? themeSettings.list_image_max_height
				: 200;

		return (
			<Fragment>
				{itemView === 'grid' && (
					<div
						className={`column is-${columnSizeOnMobile}-mobile is-${columnSizeOnTablet}-tablet is-${columnSizeOnDesktop}-desktop is-${columnSizeOnWidescreen}-widescreen is-${columnSizeOnFullhd}-fullhd ${
							product.is_salable
						}`}
					>
						<NavLink
							to={{
								pathname: `/${product.path}/`,
								search: '',
								hash: '',
								state: {
									id: product.product_id,
									type: 'product'
								}
							}}
							id={product.product_id}
							// itemId={product.product_id}
						>
							<figure className="image" style={{ height: imageHeight }}>
								{/*<ItemTags tags={product.tags} />*/}
								<ItemImage
									images={product.product_images}
									productName={product.name}
									height={placeholderHeight}
								/>
							</figure>
							<div className="content product-caption">
								<ItemPrice product={product} settings={settings} />
								<div className="product-name">{product.product_name}</div>
								<ItemSize product={product} settings={settings} />
								<ItemRatings product={product} settings={settings} />
								<ItemSoldCount product={product} settings={settings} />
							</div>
						</NavLink>
					</div>
				)}
				{itemView === 'list' && (
					<div
						className={`row is-${columnSizeOnMobile}-mobile is-${columnSizeOnTablet}-tablet is-${columnSizeOnDesktop}-desktop is-${columnSizeOnWidescreen}-widescreen is-${columnSizeOnFullhd}-fullhd ${
							product.is_salable
						}`}
					>
						<NavLink
							to={{
								pathname: `/${product.path}/`,
								search: '',
								hash: '',
								state: {
									id: product.product_id,
									type: 'product'
								}
							}}
							id={product.product_id}
							itemId={product.product_id}
						>
							<figure className="image" style={{ height: imageHeight }}>
								{/*<ItemTags tags={product.tags} />*/}
								<ItemImage
									images={product.product_images}
									productName={product.name}
									height={placeholderHeight}
								/>
							</figure>
							<div className="content product-caption">
								<ItemSoldCount product={product} settings={settings} />
								<ItemPrice product={product} settings={settings} />
								<div className="product-name">{product.product_name}</div>
								<ItemSize product={product} settings={settings} />
								<ItemRatings product={product} settings={settings} />
							</div>
						</NavLink>
					</div>
				)}
			</Fragment>
		);
	}
}

export default Item;
