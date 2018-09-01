import React from 'react';
import * as helper from '../../../../lib/helper';
import { themeSettings, text } from '../../../../lib/settings';

// const IRProductDetailsAttributeVars = props => {
//   return (
//     <div>
//       <p>{props.label}</p>
//       <p>{props.value}</p>
//       <p>{props.code}</p>
//       <p>{props.label_value}</p>
//       <p>{props.image_url}</p>
//     </div>
//   );
// };

// IRProductDetailsAttributeVars.propTypes = {
//   label: React.PropTypes.string,
//   value: React.PropTypes.string,
//   code: React.PropTypes.string,
//   label_value: React.PropTypes.string,
//   image_url: React.PropTypes.string
// }

const IRProductDetails = ({
	product,
	variant,
	addCartItem,
	isAllOptionsSelected
}) => {
	return (
		<div>
			<p>Product Details </p>

			<ul>
				{product.additional_info.map(additionalinfo => (
					<li className="liProductDetailAttributes">
						{additionalinfo.image_url && (
							<span className="imgProductDetailAttributes">
								<img src={additionalinfo.image_url} alt="logo" />
							</span>
						)}
						<span className="labelProductDetailAttributes">
							{' '}
							{additionalinfo.label} {additionalinfo.value}{' '}
						</span>
					</li>
				))}
			</ul>
			<span>
				<p>Disclaimer:</p>
				<p>
					Product color may slightly vary due to photographic lighting sources.
				</p>
			</span>
		</div>
	);
};

export default IRProductDetails;
