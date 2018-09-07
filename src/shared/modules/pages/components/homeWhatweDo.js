import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HomeWhatweDo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log('props');
		// console.log(this.props.promotions);

		return (
			<div>
				<div className="homeHeadingText">
					<strong>What we do?</strong>
				</div>
				<div className="divider1" />
				<p className="center">Directly from Manufacturer</p>
				<div className="columns">
					<div className="column">
						<img
							alt="IndiaRush Shopping"
							src="https://indiarush.com/media/banners/about-us-block-banner-670-1.jpg"
							className="responsiveImg"
						/>
					</div>
					<div className="column">
						<img
							alt="IndiaRush Shopping"
							src="https://indiarush.com/media/banners/about-us-block-banner-670-2.jpg"
							className="responsiveImg"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeWhatweDo;
