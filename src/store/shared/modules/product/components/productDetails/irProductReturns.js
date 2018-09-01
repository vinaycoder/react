import React from 'react';

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

const IRProductReturns = ({
	product,
	variant,
	addCartItem,
	isAllOptionsSelected
}) => {
	return (
		<div>
			<p>Return Policy </p>
			<span>
				<p>
					{product.return_policy && (
						<span className="spanProductReturnPolicy">
							{product.return_policy}
						</span>
					)}
				</p>
			</span>
		</div>
	);
};

export default IRProductReturns;
