import React from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';

const Sort = ({ defaultSort, currentSort, setSort }) => (
	<div className="columns is-mobile sort">
		<div className="column is-4 sort-title">Sort:</div>
		<div className="column">
			<span className="select is-fullwidth">
				<select
					onChange={e => {
						setSort(e.target.value);
					}}
					value={currentSort}
				>
					<option value="bestsellers">Best Seller</option>
					<option value="position_desc">New Arrivals</option>
					<option value="price_asc">Price: Low to High</option>
					<option value="price_desc">Price: High to Low</option>
				</select>
			</span>
		</div>
	</div>
);

Sort.propTypes = {
	defaultSort: PropTypes.string.isRequired,
	currentSort: PropTypes.string.isRequired,
	setSort: PropTypes.func.isRequired
};

export default Sort;
