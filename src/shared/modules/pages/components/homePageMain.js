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
	}

	getHomePageDetails() {
		const version = 3.81;
		const id = 4;
		const p = 1;
		const image = 300;

		return fetch(
			`https://indiarush.com/irapi/promotion/getPromotionData/?id=${id}&p=${p}&image=${image}&version=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				return jsonResult;
			});
	}

	getHomePageRecommendationDetails() {
		const version = 3.81;
		const customerId = 1296751;

		return fetch(
			`https://indiarush.com/irapi/product/getRecommendation/?customer_id=${customerId}&version=${version}`
		)
			.then(result => result.json())
			.then(jsonResult => {
				return jsonResult.data;
			});
	}

	getAllHomePageDetails() {
		const version = 3.81;
		const id = 4;
		const p = 1;
		const image = 300;
		const customerId = 1296751;

		return Promise.all([
			fetch(
				`https://indiarush.com/irapi/promotion/getPromotionData/?id=${id}&p=${p}&image=${image}&version=${version}`
			)
				.then(result => result.json())
				.then(jsonResult => {
					return jsonResult;
				}),
			fetch(
				`https://indiarush.com/irapi/product/getRecommendation/?customer_id=${customerId}&version=${version}`
			)
				.then(result => result.json())
				.then(jsonResult => {
					return jsonResult.data;
				})
		]).then(([getHomePageDetails, getHomePageRecommendationDetails]) => {
			if (Object.keys(this.props.pageDetails.getHomePageDetails).length <= 0) {
				this.props.pageDetails.getHomePageDetails = getHomePageDetails;
			}

			if (
				Object.keys(this.props.pageDetails.getHomePageRecommendationDetails)
					.length <= 0
			) {
				this.props.pageDetails.getHomePageRecommendationDetails = getHomePageRecommendationDetails;
			}

			return {
				getHomePageDetails,
				getHomePageRecommendationDetails
			};
		});
	}

	async componentDidMount(): Promise<void> {
		if (Object.keys(this.props.pageDetails.getHomePageDetails).length <= 0) {
			let getAllHomePageDetails = this.getAllHomePageDetails();
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
			Object.keys(this.props.pageDetails.getHomePageRecommendationDetails)
				.length > 0
		) {
			this.props.pageDetails.getHomePageRecommendationDetails.map(
				getHomePageRecommendationDetail =>
					getHomePageRecommendationDetail.head_title === 'Trending BestSeller'
						? trendingBestSeller.push(getHomePageRecommendationDetail)
						: trendingBestSeller.push()
			);

			this.props.pageDetails.getHomePageRecommendationDetails.map(
				getHomePageRecommendationDetail =>
					getHomePageRecommendationDetail.head_title ===
					"Sold In 24 Hours, Don't Miss Out On These"
						? soldIn24hours.push(getHomePageRecommendationDetail)
						: soldIn24hours.push()
			);

			this.props.pageDetails.getHomePageRecommendationDetails.map(
				getHomePageRecommendationDetail =>
					getHomePageRecommendationDetail.head_title === 'Most Loved Kurtis'
						? categoryRecommendation.push(getHomePageRecommendationDetail)
						: categoryRecommendation.push()
			);

			this.props.pageDetails.getHomePageRecommendationDetails.map(
				getHomePageRecommendationDetail =>
					getHomePageRecommendationDetail.head_title ===
					'You may also interested in the following producs'
						? otherRecommendation.push(getHomePageRecommendationDetail)
						: otherRecommendation.push()
			);
		}

		return (
			<div>
				{this.props.pageDetails.getHomePageDetails.slider && (
					<HomeSlider
						products={this.props.pageDetails.getHomePageDetails.slider}
					/>
				)}
				{trendingBestSeller && (
					<HomeProductSlider recommendations={trendingBestSeller} />
				)}
				{this.props.pageDetails.getHomePageDetails.promotion && (
					<DealofDay
						promotions={this.props.pageDetails.getHomePageDetails.promotion}
					/>
				)}
				{this.props.pageDetails.getHomePageDetails.bestPick && (
					<BestPick
						promotions={this.props.pageDetails.getHomePageDetails.bestPick}
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
