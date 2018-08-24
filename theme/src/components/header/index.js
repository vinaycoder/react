import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import Cart from './cart';
import CartIndicator from './cartIndicator';
import SearchBox from './searchBox';
import HeadMenu from './headMenu';
import cookie from 'react-cookies';
import SaveIndicator from './SaveIndicator';
import SaveForLater from './saveForLater';
import LoginWrapper from './login';
import LoginIndicator from './loginIndicator';

const Logo = ({ src, onClick, alt }) => (
	<NavLink className="logo-image" to="/" onClick={onClick}>
		<span className="sprites mobileLogo " alt={alt} />
	</NavLink>
);

const BurgerButton = ({ onClick, className }) => (
	<span className={className} onClick={onClick}>
		<span />
		<span />
		<span />
	</span>
);

const BackButton = ({ onClick }) => (
	<span
		className="navbar-item is-hidden-tablet is-flex-mobile"
		onClick={onClick}
	>
		<img
			className="icon"
			src="/assets/images/arrow_back.svg"
			style={{ width: 18 }}
		/>
	</span>
);

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileMenuIsActive: false,
			mobileSearchIsActive: false,
			cartIsActive: false,
			saveForLaterIsActive: false,
			loginIsActive: false,
			cart: []
		};
	}

	componentDidMount() {
		const quoteId = cookie.load('userQuoteId');
		const statsCookieId = cookie.load('statsCookieId');
		const isLoggedIn = cookie.load('isLoggedIn');

		fetch(
			'https://indiarush.com/irapi/cart/getShoppingCartInfo?quote_id=' +
				quoteId +
				'&pincode=""' +
				'&reset_payment=1' +
				'&version=' +
				'99.99'
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				this.props.state.cart = jsonResult.data;
				this.setState({
					cart: jsonResult.data
				});
			});
	}

	componentWillReceiveProps(nextProps) {
		if (
			this.props.state.cart !== nextProps.state.cart &&
			this.props.state.currentPage.path !== '/checkout'
		) {
			this.showCart();
			this.defaultcartItem();
		}
	}

	menuToggle = () => {
		this.setState({
			mobileMenuIsActive: !this.state.mobileMenuIsActive,
			cartIsActive: false,
			saveForLaterIsActive: false,
			loginIsActive: false
		});
		document.body.classList.toggle('noscroll');
	};
	defaultcartItem = () => {
		this.setState({
			cart: false
		});
	};

	searchToggle = () => {
		this.setState({
			mobileSearchIsActive: !this.state.mobileSearchIsActive,
			loginIsActive: false
		});
		document.body.classList.toggle('search-active');
	};

	menuClose = () => {
		this.setState({ mobileMenuIsActive: false, loginIsActive: false });
		document.body.classList.remove('noscroll');
	};

	closeAll = () => {
		this.setState({
			cartIsActive: false,
			mobileMenuIsActive: false,
			saveForLaterIsActive: false,
			loginIsActive: false
		});
		document.body.classList.remove('noscroll');
	};

	cartToggle = () => {
		this.setState({
			cartIsActive: !this.state.cartIsActive,
			mobileMenuIsActive: false,
			saveForLaterIsActive: false,
			loginIsActive: false
		});
		document.body.classList.toggle('noscroll');
	};

	saveForLaterToggle = () => {
		this.setState({
			saveForLaterIsActive: !this.state.saveForLaterIsActive,
			mobileMenuIsActive: false,
			cartIsActive: false,
			loginIsActive: false
		});
		document.body.classList.toggle('noscroll');
	};

	loginToggle = () => {
		this.setState({
			loginIsActive: !this.state.loginIsActive,
			mobileMenuIsActive: false,
			cartIsActive: false
		});
		document.body.classList.toggle('noscroll');
	};

	showCart = () => {
		this.setState({
			cartIsActive: true,
			mobileMenuIsActive: false,
			saveForLaterIsActive: false,
			loginIsActive: false
		});
		document.body.classList.add('noscroll');
	};
	saveForLaterShow = () => {
		this.setState({
			cartIsActive: false,
			mobileMenuIsActive: false,
			saveForLaterIsActive: false,
			loginIsActive: false
		});
		document.body.classList.add('noscroll');
	};

	loginWrapperShow = () => {
		this.setState({
			cartIsActive: false,
			mobileMenuIsActive: false,
			saveForLaterIsActive: false,
			loginIsActive: true
		});
		document.body.classList.add('noscroll');
	};

	handleSearch = search => {
		if (this.props.state.currentPage.path === '/search') {
			this.props.setSearch(search);
		} else {
			if (search && search !== '') {
				this.props.setLocation('/search?search=' + search);
			}
		}
	};

	handleGoBack = () => {
		this.closeAll();
		this.props.goBack();
	};

	render() {
		const {
			categories,
			cart,
			settings,
			currentPage,
			location,
			productFilter
		} = this.props.state;
		const classToggle = this.state.mobileMenuIsActive
			? 'navbar-burger is-hidden-tablet is-active'
			: 'navbar-burger is-hidden-tablet';
		const showBackButton =
			currentPage.type === 'product' && location.hasHistory;
		return (
			<Fragment>
				<header
					className={this.state.mobileSearchIsActive ? 'search-active' : ''}
				>
					<div className="container">
						<div className="columns is-gapless is-mobile header-container">
							<div className="column is-hidden-tablet">
								{!showBackButton && (
									<BurgerButton
										onClick={this.menuToggle}
										className={classToggle}
									/>
								)}
								{showBackButton && <BackButton onClick={this.handleGoBack} />}
							</div>

							<div className="column has-text-left">
								<Logo src={settings.logo} onClick={this.closeAll} alt="logo" />
							</div>
							<div className="column">
								<SearchBox
									value={productFilter.search}
									onSearch={this.handleSearch}
									className={
										this.state.mobileSearchIsActive ? 'search-active' : ''
									}
								/>
							</div>
							<div className="column has-text-right header-block-right">
								<span
									className="icon icon-search is-hidden-tablet"
									onClick={this.searchToggle}
								>
									<img
										src="/assets/images/search.svg"
										alt={text.search}
										title={text.search}
										style={{ minWidth: 24 }}
									/>
								</span>

								<LoginIndicator
									onClick={this.loginToggle}
									loginIsActive={this.state.loginIsActive}
								/>
								<div
									className={this.state.loginIsActive ? 'mini-cart-open' : ''}
								>
									<LoginWrapper
										settings={settings}
										loginToggle={this.loginToggle}
									/>
								</div>

								<SaveIndicator
									cart={cart}
									onClick={this.saveForLaterToggle}
									cartIsActive={this.state.saveForLaterIsActive}
								/>
								<div
									className={
										this.state.saveForLaterIsActive ? 'mini-cart-open' : ''
									}
								>
									<SaveForLater
										cart={cart}
										deleteCartItem={this.props.deleteCartItem}
										settings={settings}
										cartToggle={this.saveForLaterToggle}
									/>
								</div>

								<CartIndicator
									cart={cart}
									onClick={this.cartToggle}
									cartIsActive={this.state.cartIsActive}
								/>

								<div
									className={this.state.cartIsActive ? 'mini-cart-open' : ''}
								>
									<Cart
										cart={cart}
										deleteCartItem={this.props.deleteCartItem}
										settings={settings}
										cartToggle={this.cartToggle}
										updateCartItemQuantiry={this.props.updateCartItemQuantiry}
									/>
								</div>
							</div>
						</div>

						<div className="primary-nav is-hidden-mobile">
							<HeadMenu
								categories={categories}
								location={location}
								isMobile={false}
							/>
						</div>
					</div>
				</header>

				<div
					className={
						this.state.mobileMenuIsActive ||
						this.state.cartIsActive ||
						this.state.saveForLaterIsActive ||
						this.state.loginIsActive
							? 'dark-overflow'
							: ''
					}
					onClick={this.closeAll}
				/>
				<div
					className={
						'mobile-nav is-hidden-tablet' +
						(this.state.mobileMenuIsActive ? ' mobile-nav-open' : '')
					}
				>
					<HeadMenu
						isMobile={true}
						categories={categories}
						location={location}
						onClick={this.menuClose}
					/>
				</div>
			</Fragment>
		);
	}
}
