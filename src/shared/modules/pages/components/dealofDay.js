import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class DealofDay extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('props');
		console.log(this.props.promotions);

		return (
			<div>
				<div className="homeHeadingText">
					<strong>DEAL OF THE DAY</strong>
				</div>
				<div className="divider1" />
				<div className="homeDOD">
					{this.props.promotions.map(promotion => (
						<span className="homeDODItem">
							<NavLink to={promotion.landing_url}>
								<img
									className="homeDODItemImg"
									src={promotion.image_url}
									alt={promotion.name}
								/>
							</NavLink>
						</span>
					))}
				</div>
			</div>
		);
	}
}

export default DealofDay;
