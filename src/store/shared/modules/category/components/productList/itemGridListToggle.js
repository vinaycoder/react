import React, { Fragment } from 'react';
import { themeSettings, text } from '../../lib/settings';
import Item from './item';
import LoadMore from './loadMore';

class ItemGridListToggle extends React.Component {
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
		const { products, addCartItem, settings } = this.props;
		const { itemView } = this.state;

		return (
			<div>
				<div onClick={this.onChangeToGrid}>Move To Grid</div>
				<div onClick={this.onChangeToList}>Move To List</div>
			</div>
		);
	}
}

export default ItemGridListToggle;
