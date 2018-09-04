import React from 'react';
import { NavLink } from 'react-router-dom';
import { text } from '../../../../lib/settings';

export default class BeforeHeaderStrip extends React.PureComponent {
	render() {
		return (
			<div className="globalHeaderStrip">
				<span className="needHelpHeaderStrip ">
					<NavLink
						className="need_help beforeheaderLabelColor"
						to="https://indiarush.com/help/"
					>
						{' '}
						Need Help?
					</NavLink>{' '}
					|
					<NavLink className="beforeheaderLabelColor" to="tel:011-40834083">
						011-40834083 (9AM - 7PM)
					</NavLink>
				</span>
				<span className="sellOnIrushHeaderStrip ">
					<NavLink
						className="beforeheaderLabelColor"
						to="https://indiarush.com/sellerpanel/"
					>
						Sell on IndiaRush
					</NavLink>{' '}
					|
					<NavLink
						className="beforeheaderLabelColor"
						to="https://indiarush.com/careers/"
					>
						Work With Us
					</NavLink>
				</span>
			</div>
		);
	}
}
