import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../../../lib/settings';

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
			attributeId,
			valueId,
			setFilterAttribute,
			unsetFilterAttribute
		} = this.props;
		const checked = event.target.checked;

		this.setState({ checked: checked });

		if (checked) {
			setFilterAttribute(attributeId, valueId);
		} else {
			unsetFilterAttribute(attributeId, valueId);
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

class AttributeSet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			truncated: 1
		};
	}

	onExpand = event => {
		this.setState({ truncated: 0 });
	};
	onCollapse = event => {
		this.setState({ truncated: 1 });
	};

	values = (): void => {
		const { attribute, setFilterAttribute, unsetFilterAttribute } = this.props;
		const values = attribute.sub_label.map(value => (
			<AttributeValue
				key={value.value}
				attributeName={attribute.label}
				attributeId={attribute.id}
				valueId={value.value}
				valueName={value.label}
				checked={value.checked}
				count={value.count}
				setFilterAttribute={setFilterAttribute}
				unsetFilterAttribute={unsetFilterAttribute}
			/>
		));
		let newValues = values;
		let showMoreCount = 1;
		if (this.state.truncated === 1) {
			newValues = values.slice(0, 10);
		} else {
			showMoreCount = 0;
		}
		return [newValues, values.length - 10, showMoreCount];
	};

	render() {
		const { attribute, setFilterAttribute, unsetFilterAttribute } = this.props;
		const [value, valueCount, showMoreCount] = this.values();
		return (
			<div className="attribute">
				<div className="attribute-title">{attribute.label}</div>
				{value}
				{valueCount > 0 &&
					showMoreCount === 1 && (
						<div onClick={this.onExpand}>Show More {valueCount}</div>
					)}
				{valueCount > 0 &&
					showMoreCount === 0 && <div onClick={this.onCollapse}>Show Less</div>}
			</div>
		);
	}
}

const AttributeFilter = ({
	attributes,
	setFilterAttribute,
	unsetFilterAttribute
}) => {
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
