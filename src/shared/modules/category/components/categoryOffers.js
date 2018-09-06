import React from 'react';
import PropTypes from 'prop-types';
import IrCategoryOfferHtml from './irCategoryOfferHtml';

class CategoryOffers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryOffersResult: [],
			finalcategoryOffersResult: [],
			finalcategoryOffersResultTest: [],
			finalcategoryOffersResultTestData: []
		};
	}

	// static propTypes = {
	// 	currentCategory: PropTypes.shape({}).isRequired
	// };

	componentDidMount() {
		fetch(
			`https://indiarush.com/irapi/category/getDiscountBanner/?category_id=${
				this.props.currentCategory.id
			}&version=3.82`
		)
			.then(result => result.json())
			.then(jsonResult => {
				this.state.categoryOffersResult.push(jsonResult.data);

				this.state.categoryOffersResult.map((actualoption, index) => {
					actualoption.map((optionObj, index) => {
						// this.state.finalcategoryOffersResult.push(optionObj);
						// this.setState({ finalcategoryOffersResultTest : jsonResult.data });
						this.setState({ finalcategoryOffersResult: actualoption });
					});
				});

				console.log('test data');
				console.log(this.state.finalcategoryOffersResult);
			});
	}

	render() {
		if (this.state.finalcategoryOffersResult) {
			return (
				<IrCategoryOfferHtml offers={this.state.finalcategoryOffersResult} />
			);
		}
		return null;
	}
}

export default CategoryOffers;
