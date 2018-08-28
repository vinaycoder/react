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
Shipping
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
			cart: []
		};
		this.saveForLater = this.saveForLater.bind(this);
		this.shoppingCartDetails = this.shoppingCartDetails.bind(this);
		this.removeSaveForLater = this.removeSaveForLater.bind(this);
		this.moveSaveForLaterToCart = this.moveSaveForLaterToCart.bind(this);
	}
saveForLater(productId,itemId)
{
	const quoteId = cookie.load('userQuoteId');
	const statsCookieId = cookie.load('statsCookieId');
	fetch('https://indiarush.com/irapi/cart/moveToSaveforLater?pincode=""'+'&item_id='+itemId+'&product_id='+productId+'&quote_id='+quoteId+'&customer_id='+statsCookieId+'&version=3.99')
		.then(result => {
			return result.json();
		})
		.then(jsonResult => {
			this.getSaveFOrLaterDetails();
			this.shoppingCartDetails();
		});
		console.log('check props');
		console.log(this.props);
}

getSaveFOrLaterDetails()
{
	  const statsCookieId = cookie.load('statsCookieId');
		fetch('https://indiarush.com/irapi/customer/getSaveForLaterDetailsByCustomerId?customer_id='+statsCookieId+'&version=3.99')
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				console.log('vinay in save for later detials');
				this.props.state.saveForLater = jsonResult;
			});
}

shoppingCartDetails()
{
	const quoteId = cookie.load('userQuoteId');
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

moveSaveForLaterToCart(productId)
{
	const { addCartItem } = this.props;
	const item = {
		product_id: productId,
		quantity: 1,
		type:'addCart'
	};
	console.log('vinay in move to cart');
	addCartItem(item);
	this.shoppingCartDetails();
	this.removeSaveForLater(productId);
}

removeSaveForLater(productId)
{
	const statsCookieId = cookie.load('statsCookieId');
	fetch('https://indiarush.com/irapi/cart/RemovefromSaveLater/?customer_id='+statsCookieId+'&product_id='+productId+'&version=3.99')
		.then(result => {
			return result.json();
		})
		.then(jsonResult => {
			this.getSaveFOrLaterDetails();
			this.shoppingCartDetails();
		});
}

	componentDidMount() {
		this.shoppingCartDetails();
		this.getSaveFOrLaterDetails();
	}

	componentWillReceiveProps(nextProps) {
		if (
			this.props.state.cart !== nextProps.state.cart &&
			this.props.state.currentPage.path !== '/checkout'
		) {
			this.showCart();
		}
	}

	menuToggle = () => {
		this.setState({
			mobileMenuIsActive: !this.state.mobileMenuIsActive,
			cartIsActive: false,
			saveForLaterIsActive: false
		});
		document.body.classList.toggle('noscroll');
	};

	searchToggle = () => {
		this.setState({
			mobileSearchIsActive: !this.state.mobileSearchIsActive
		});
		document.body.classList.toggle('search-active');
	};

	menuClose = () => {
		this.setState({ mobileMenuIsActive: false });
		document.body.classList.remove('noscroll');
	};

	closeAll = () => {
		this.setState({
			cartIsActive: false,
			mobileMenuIsActive: false,
			saveForLaterIsActive: false
		});
		document.body.classList.remove('noscroll');
	};

	cartToggle = () => {
		this.setState({
			cartIsActive: !this.state.cartIsActive,
			mobileMenuIsActive: false,
			saveForLaterIsActive: false
		});
		document.body.classList.toggle('noscroll');
	};

	saveForLaterToggle = () => {
		this.setState({
			saveForLaterIsActive: !this.state.saveForLaterIsActive,
			mobileMenuIsActive: false,
			cartIsActive: false
		});
		document.body.classList.toggle('noscroll');
	};

	showCart = () => {
		this.setState({
			cartIsActive: true,
			mobileMenuIsActive: false,
			saveForLaterIsActive: false
		});
		document.body.classList.add('noscroll');
	};
	saveForLaterShow = () => {
		this.setState({
			cartIsActive: false,
			mobileMenuIsActive: false,
			saveForLaterIsActive: false
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
			productFilter,
			saveForLater
		} = this.props.state;
		const classToggle = this.state.mobileMenuIsActive
			? 'navbar-burger is-hidden-tablet is-active'
			: 'navbar-burger is-hidden-tablet';
		const showBackButton = currentPage.type === 'product'; //&& location.hasHistory;
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
								<SaveIndicator
									saveForLater={saveForLater}
									onClick={this.saveForLaterToggle}
									saveForLaterIsActive={this.state.saveForLaterIsActive}
								/>
								<div
									className={
										this.state.saveForLaterIsActive ? 'mini-cart-open' : ''
									}
								>
									<SaveForLater
										saveForLater={saveForLater}
										settings={settings}
										saveForLaterToggle={this.saveForLaterToggle}
										moveSaveForLaterToCart={this.moveSaveForLaterToCart}
										removeFromSaveForLater={this.removeSaveForLater}
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
										saveForLater={this.saveForLater}
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
						this.state.saveForLaterIsActive
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
