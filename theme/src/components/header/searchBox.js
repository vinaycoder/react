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
		this.handleSuggest = this.handleSuggest.bind(this);
	}

	handleChange = event => {
		this.setState({ value: event.target.value });
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

	handleSuggest = suggest => {
		this.setState({ value: suggest });
		this.props.onSearch(suggest);
		this.setState({ suggest: '' });
	};

	handleClear = () => {
		this.setState({ value: '' });
		this.setState({ suggest: '' });
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
		let suggestions = [];
		if (suggest.length > 0) {
			suggestions = suggest.map(suggestion => (
				<Suggest
					key={suggestion}
					suggestion={suggestion}
					handleSuggest={this.handleSuggest}
				/>
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
class Suggest extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		this.props.handleSuggest(this.props.suggestion);
	}
	render() {
		return <div onClick={this.onClick}>{this.props.suggestion}</div>;
	}
}
