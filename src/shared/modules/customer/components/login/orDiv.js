import React from 'react';

export default class OrDiv extends React.Component {
	render() {
		return (
			<div className="tab-content-ruler-main-login">
				<p className="loginORDividerTextMainLogin registerORDividerText checkoutORDividerText">
					{' '}
					OR
				</p>
				<hr className="loginORDivider checkoutORDivider" />
			</div>
		);
	}
}
