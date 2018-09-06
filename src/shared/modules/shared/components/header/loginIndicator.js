import React from 'react';
import { NavLink } from 'react-router-dom';
import { text } from '../../../../lib/settings';

const LoginIcon = ({ loginIsActive, loginPost }) => {
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
		const { onClick, loginIsActive, loginPost, currentPage } = this.props;
		// const { isLoggedIn, statsCookieId, customerDetails } = this.state;
		const showLoginMenuIcon = currentPage.type === 'product';
		return (
			<span
				className={
					'cart-button is-hidden-mobile' + (showLoginMenuIcon ? '' : '')
				}
				onClick={onClick}
			>
				<LoginIcon loginIsActive={loginIsActive} loginPost={loginPost} />
			</span>
		);
	}
}
