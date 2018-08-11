import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

class AttributeValue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: props.checked
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.checked !== this.props.checked) {
			this.setState({ checked: nextProps.checked });
		}
	}

	onChange = event => {
		const {
			attributeName,
			valueName,
			setFilterAttribute,
			unsetFilterAttribute
		} = this.props;
		const checked = event.target.checked;

		this.setState({ checked: checked });

		if (checked) {
			setFilterAttribute(attributeName, valueName);
		} else {
			unsetFilterAttribute(attributeName, valueName);
		}
	};

	render() {
		const { valueName, count } = this.props;
		const isDisabled = count === 0;
		const classChecked = this.state.checked ? 'attribute-checked' : '';
		const classDisabled = isDisabled ? 'attribute-disabled' : '';

		return (
			<label className={classChecked + ' ' + classDisabled}>
				<input
					type="checkbox"
					disabled={isDisabled}
					onChange={this.onChange}
					checked={this.state.checked}
				/>
				{valueName} ({count})
			</label>
		);
	}
}

const AttributeSet = ({
	attribute,
	setFilterAttribute,
	unsetFilterAttribute
}) => {
	const values = attribute.sub_label.map(value => (
		<AttributeValue
			key={value.value}
			attributeName={attribute.label}
			valueName={value.label}
			checked={value.checked}
			count={value.count}
			setFilterAttribute={setFilterAttribute}
			unsetFilterAttribute={unsetFilterAttribute}
		/>
	));

	return (
		<div className="attribute">
			<div className="attribute-title">{attribute.label}</div>
			{values}
		</div>
	);
};

const AttributeFilter = ({
	attributes,
	setFilterAttribute,
	unsetFilterAttribute
}) => {
	console.log('logging attribute list');
	console.log(attributes);
	const attributeSets = attributes.map(attribute => (
		<AttributeSet
			key={attribute.id}
			attribute={attribute}
			setFilterAttribute={setFilterAttribute}
			unsetFilterAttribute={unsetFilterAttribute}
		/>
	));

	return <div className="attribute-filter">{attributeSets}</div>;
};

export default AttributeFilter;
