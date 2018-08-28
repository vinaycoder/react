import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

const CartCount = ({ saveForLater }) => {
	if (saveForLater.length > 0) {
		return <span className="cart-count">{saveForLater.length}</span>;
	}
	return null;
};

const CartIcon = ({ saveForLaterIsActive }) => {
	if (saveForLaterIsActive) {
		return (
			<img
				src="/assets/images/close.svg"
				className="icon"
				alt={text.close}
				title={text.close}
				style={{ minWidth: 24, padding: 4 }}
			/>
		);
	}
	return <i className="material-icons">favorite_border</i>;
};

export default class SaveIndicator extends React.PureComponent {
	render() {
		const { saveForLater, onClick, saveForLaterIsActive } = this.props;
		return (
			<span className="cart-button save-for-later-button" onClick={onClick}>
				<CartIcon saveForLaterIsActive={saveForLaterIsActive} />
				<CartCount saveForLater={saveForLater} />
			</span>
		);
	}
}
