import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HomeTopBrands extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log('props');
		// console.log(this.props.promotions);

		return (
			<div>
				<div className="clear" />

				<div className="homeHeadingText">
					<strong>TOP BRANDS</strong>
				</div>

				<div className="divider1" />

				<div className="homeBestPicks">
					<div className="homeBestPickItem" id="itemhomeBestPickid">
						<a href="bestPickItemURl">
							<img
								src=""
								alt="bestPickItemName"
								className="homeBestPickItemImg"
							/>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeTopBrands;
