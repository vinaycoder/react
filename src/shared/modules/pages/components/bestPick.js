import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class BestPick extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log('props');
		// console.log(this.props.promotions);

		return (
			<div>
				<div className="homeHeadingText">
					<strong>BEST PICKS</strong>
				</div>
				<div className="divider1" />
				<div className="homeBestPicks">
					{this.props.promotions.map(promotion => (
						<span
							className="homeBestPickItem homeBestPickItemImg"
							id={promotion.id}
						>
							<NavLink to={promotion.landing_url} className="">
								<img src={promotion.image_url} alt={promotion.name} />
								<div className="bestPicKsText">{promotion.name}</div>
							</NavLink>
						</span>
					))}
				</div>
			</div>
		);
	}
}

export default BestPick;
