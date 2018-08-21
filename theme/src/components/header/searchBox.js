import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

export default class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			hasFocus: false,
			suggest: []
		};
	}

	handleChange = event => {
		this.setState({ value: event.target.value });
		console.log('changes for the key');
		console.log(this.state.value);
		console.log(event.target.value);
		fetch(
			`https://indiarush.com/irapi/search/getSearchSuggestion/?query=${
				event.target.value
			}&version=3.84`
		)
			.then(result => {
				return result.json();
			})
			.then(jsonResult => {
				this.setState({ suggest: jsonResult.data.suggestions });
			});
	};

	handleKeyPress = e => {
		if (e.keyCode === 13 || e.which === 13) {
			this.handleSearch();
		}
	};

	handleKeyDown = e => {
		if (e.keyCode === 27) {
			this.handleClear();
		}
	};

	handleSearch = () => {
		this.props.onSearch(this.state.value);
	};

	handleClear = () => {
		this.setState({ value: '' });
		this.props.onSearch('');
	};

	handleFocus = () => {
		this.setState({ hasFocus: true });
	};

	handleBlur = () => {
		this.setState({ hasFocus: false });
	};

	render() {
		const { hasFocus, suggest } = this.state;
		const placeholderText =
			themeSettings.search_placeholder &&
			themeSettings.search_placeholder.length > 0
				? themeSettings.search_placeholder
				: text.searchPlaceholder;
		console.log('logging state suggest');
		console.log(this.state.suggest);
		let suggestions = [];
		console.log(suggest);
		if (suggest.length > 0) {
			console.log('inside');
			suggestions = suggest.map(suggestion => (
				<Suggest key={suggestion} suggestion={suggestion} />
			));
		}

		return (
			<Fragment>
				<div
					className={
						'search-box ' +
						this.props.className +
						(hasFocus ? ' has-focus' : '')
					}
				>
					<input
						className="search-input"
						type="text"
						placeholder={placeholderText}
						value={this.state.value}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
						onKeyDown={this.handleKeyDown}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
					/>
					<img
						className="search-icon-search"
						src="/assets/images/search.svg"
						alt={text.search}
						title={text.search}
						onClick={this.handleSearch}
					/>
					{this.state.value &&
						this.state.value !== '' && (
							<img
								className="search-icon-clear"
								src="/assets/images/close.svg"
								onClick={this.handleClear}
							/>
						)}
				</div>
				<div>{suggestions}</div>
			</Fragment>
		);
	}
}

const Suggest = ({ suggestion }) => {
	return <div>{suggestion}</div>;
};
