import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import HomeSlider from './homeSlider';
import DealofDay from './dealofDay';
import BestPick from './bestPick';
import HomeProductSlider from './homeProductSlider';

import HomeWhybuyfromUs from './homeWhybuyfromUs';
import HomeWhatweDo from './homeWhatweDo';
import HomeTopBrands from './homeTopBrands';
import HomePerfectProduct from './homePerfectProduct';

class HomePageMain extends Component {
	constructor(props) {
		super(props);
		this.state={getHomePageDetails:[],getHomePageRecommendationDetails:[]};
		this.getHomePageDetails=this.getHomePageDetails.bind(this);
		this.getHomePageRecommendationDetails = this.getHomePageRecommendationDetails.bind(this);

	}

	async getHomePageDetails() {
		const version = 3.81;
		const id = 4;
		const p = 1;
		const image = 300;
	return	await fetch(
			`https://indiarush.com/irapi/promotion/getPromotionData/?id=${id}&p=${p}&image=${image}&version=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				return jsonResult;
			});
	}

	async getHomePageRecommendationDetails() {
		const version = 3.81;
		const customerId = 1296751;

	return	await fetch(
			`https://indiarush.com/irapi/product/getRecommendation/?customer_id=${customerId}&version=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				return jsonResult.data;
			});
	}


	async componentDidMount(): Promise<void> {
		if (Object.keys(this.props.pageDetails.getHomePageDetails).length <= 0) {
				const homepageDetails=await this.getHomePageDetails();
			this.setState({getHomePageDetails:homepageDetails});
		}
		else {
			this.setState({getHomePageDetails:this.props.pageDetails.getHomePageDetails});
		}

		if (Object.keys(this.props.pageDetails.getHomePageRecommendationDetails).length <= 0) {
			const Remondad = await this.getHomePageRecommendationDetails();
			this.setState({getHomePageRecommendationDetails:Remondad});
		}
		else {
			this.setState({getHomePageRecommendationDetails:this.props.pageDetails.getHomePageRecommendationDetails});
		}
	}

	render() {
		const { settings, pageDetails } = this.props;

		const trendingBestSeller = [];
		const soldIn24hours = [];
		const categoryRecommendation = [];
		const otherRecommendation = [];

		const isTrendingBestSeller = 0;
		const isSoldIn24hours = 0;
		const isCategoryRecommendation = 0;
		const isOtherRecommendation = 0;

		if (
			Object.keys(this.state.getHomePageRecommendationDetails)
				.length > 0
		) {
			this.state.getHomePageRecommendationDetails.map(
				getHomePageRecommendationDetail =>
					getHomePageRecommendationDetail.head_title === 'Trending BestSeller'
						? trendingBestSeller.push(getHomePageRecommendationDetail)
						: trendingBestSeller.push()
			);

			this.state.getHomePageRecommendationDetails.map(
				getHomePageRecommendationDetail =>
					getHomePageRecommendationDetail.head_title ===
					"Sold In 24 Hours, Don't Miss Out On These"
						? soldIn24hours.push(getHomePageRecommendationDetail)
						: soldIn24hours.push()
			);

			this.state.getHomePageRecommendationDetails.map(
				getHomePageRecommendationDetail =>
					getHomePageRecommendationDetail.head_title === 'Most Loved Kurtis'
						? categoryRecommendation.push(getHomePageRecommendationDetail)
						: categoryRecommendation.push()
			);

			this.state.getHomePageRecommendationDetails.map(
				getHomePageRecommendationDetail =>
					getHomePageRecommendationDetail.head_title ===
					'You may also interested in the following producs'
						? otherRecommendation.push(getHomePageRecommendationDetail)
						: otherRecommendation.push()
			);
		}

		return (
			<div>
				{this.state.getHomePageDetails.slider && (
					<HomeSlider
						products={this.state.getHomePageDetails.slider}
					/>
				)}
				{trendingBestSeller && (
					<HomeProductSlider recommendations={trendingBestSeller} />
				)}
				{this.state.getHomePageDetails.promotion && (
					<DealofDay
						promotions={this.state.getHomePageDetails.promotion}
					/>
				)}
				{this.state.getHomePageDetails.bestPick && (
					<BestPick
						promotions={this.state.getHomePageDetails.bestPick}
					/>
				)}
				{soldIn24hours && <HomeProductSlider recommendations={soldIn24hours} />}
				{categoryRecommendation && (
					<HomeProductSlider recommendations={categoryRecommendation} />
				)}
				<HomeWhybuyfromUs />
				<HomeWhatweDo />
				{/*<HomeTopBrands />*/}
				<HomePerfectProduct />

				{/*otherRecommendation && <HomeProductSlider recommendations={otherRecommendation} />*/}
			</div>
		);
	}
}

export default HomePageMain;
