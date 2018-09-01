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

const IRProductTNC = ({
	product,
	variant,
	addCartItem,
	isAllOptionsSelected
}) => {
	return (
		<div>
			<p>Terms And Conditions </p>
			<ul>
				{product.additional_terms_conditions.map(additionalTnC => (
					<li className="liProductDetailAttributes">
						{additionalTnC.title && (
							<span className="imgProductDetailTnCTitle">
								{additionalTnC.title}
							</span>
						)}
						<span className="labelProductDetailTnCDesc">
							{' '}
							{additionalTnC.description}{' '}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default IRProductTNC;
