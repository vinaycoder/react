import React from 'react';
import { NavLink } from 'react-router-dom';
import * as helper from '../../../../lib/helper';
import { themeSettings, text } from '../../../../lib/settings';

const Option = ({ option, onChange, product }) => {
	console.log('Option product');
	console.log(product);

	const values = option.values
		// .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
		.map(optionObj => (
			<option key={optionObj.value_index} value={optionObj.product_id}>
				{optionObj.label}
			</option>
		));

	const notSelectedTitle = `${text.selectOption} ${option.label}`;

	return (
		<div className="product-option">
			<div className="product-option-name">{option.label}</div>
			<span className="select is-fullwidth">
				<select
					onChange={e => {
						onChange(product.product_id, e.target.value);
						// onChange(option.attribute_id, e.target.value);
					}}
				>
					<option value="">{notSelectedTitle}</option>
					{values}
				</select>
			</span>
		</div>
	);
};

const Options = ({ options, onChange, product }) => {
	if (options && options.length > 0) {
		const items = [];

		const mainOptions = options.map((actualoption, index) => {
			items.push(
				<Option
					key={actualoption.attribute_id}
					option={actualoption}
					onChange={onChange}
					product={product}
				/>
			);
		});

		return <div className="product-options">{items}</div>;
	}
	return null;
};
export default Options;
