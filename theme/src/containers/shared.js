import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Footer from '../components/footer';

const SharedContainer = props => {
	const {
		children,
		state: { currentPage, settings }
	} = props;
	const hideFooter =
		currentPage.path === '/checkout-success' ||
		currentPage.path === '/checkout';

	return (
		<Fragment>
			<Header {...props} />
			{children}
			{!hideFooter && <Footer settings={settings} />}
		</Fragment>
	);
};

SharedContainer.propTypes = {
	children: PropTypes.element.isRequired,
	state: PropTypes.shape({
		currentPage: PropTypes.shape({}),
		settings: PropTypes.shape({})
	}).isRequired
};

export default SharedContainer;
