import React, { Fragment } from 'react';
import { themeSettings, text } from '../../lib/settings';
import Item from './item';
import LoadMore from './loadMore';

class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemView: 'grid'
		};
	}

	onChangeToList = event => {
		this.setState({ itemView: 'list' });
	};

	onChangeToGrid = event => {
		this.setState({ itemView: 'grid' });
	};

	render() {
		const {
			products,
			addCartItem,
			settings,
			loadMoreProducts,
			hasMore,
			productsPage,
			loadingProducts,
			loadingMoreProducts,
			isCentered,
			columnCountOnMobile,
			columnCountOnTablet,
			columnCountOnDesktop,
			columnCountOnWidescreen,
			columnCountOnFullhd
		} = this.props;
		const { itemView } = this.state;
		const className = 'columns is-multiline is-mobile products';
		const items = products
			? products.map(product => (
					<Item
						key={product.product_id}
						product={product}
						addCartItem={addCartItem}
						settings={settings}
						itemView={itemView}
						columnCountOnMobile={columnCountOnMobile}
						columnCountOnTablet={columnCountOnTablet}
						columnCountOnDesktop={columnCountOnDesktop}
						columnCountOnWidescreen={columnCountOnWidescreen}
						columnCountOnFullhd={columnCountOnFullhd}
					/>
			  ))
			: null;

		return (
			<Fragment>
				<div>
					<div onClick={this.onChangeToGrid}>Move To Grid</div>
					<div onClick={this.onChangeToList}>Move To List</div>
				</div>
				<div
					className={
						className +
						(loadingProducts ? ' loading' : '') +
						(isCentered ? ' is-centered' : '')
					}
				>
					{items}
				</div>
				<div className="load-more">
					<LoadMore
						loadMoreProducts={loadMoreProducts}
						hasMore={hasMore}
						productsPage={productsPage}
						loading={loadingMoreProducts}
					/>
				</div>
			</Fragment>
		);
	}
}

export default ProductList;
