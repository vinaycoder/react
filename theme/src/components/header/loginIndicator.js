import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

const LoginIcon = ({ loginIsActive }) => {
	if (loginIsActive) {
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
	return <i className="material-icons icon">people</i>;
};

export default class LoginIndicator extends React.PureComponent {
	render() {
		const { onClick, loginIsActive } = this.props;
		return (
			<span className="cart-button" onClick={onClick}>
				<LoginIcon loginIsActive={loginIsActive} />
			</span>
		);
	}
}
