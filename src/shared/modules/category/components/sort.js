import React from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../../../lib/settings';

const Sort = ({ defaultSort, currentSort, setSort }) => (
	<div className="columns is-mobile sort">
		<div className="column is-4 sort-title">{text.sort}:</div>
		<div className="column">
			<span className="select is-fullwidth">
				<select
					onChange={e => {
						setSort(e.target.value);
					}}
					value={currentSort}
				>
					<option value={defaultSort}>{text.best_seller}</option>
					<option value={themeSettings.new_arrivals}>
						{text.new_arrivals}
					</option>
					<option value={themeSettings.price_asc}>{text.price_asc}</option>
					<option value={themeSettings.top_rated}>{text.top_rated}</option>
					<option value={themeSettings.price_desc}>{text.price_desc}</option>
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
