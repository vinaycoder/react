import React from 'react';

class Description extends React.Component {
	render() {
		return (
			<a href="https://indiarush.com/buyer-satisfaction/" target="_blank">
				<div className="product-buyer-satisfaction font-medium">
					<div className="product-buyer-satisfaction-leftdiv">
						<img src="https://indiarush.com/media/banners/buyers-satisfaction-color-icon.png" />
					</div>
					<div className="product-buyer-satisfaction-rightdiv">
						<span className="span100" data-content="bar">
							100% Buyers Satisfaction
						</span>
						<br />
						<span className="span10" data-content="bar">
							14 Days Exchange Policy | 10% Back as Store Credits
						</span>
					</div>
				</div>
			</a>
		);
	}
}
export default Description;
