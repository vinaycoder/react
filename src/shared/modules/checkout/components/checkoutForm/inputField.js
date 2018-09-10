import React from 'react';

const InputField = field => (
	<div className={field.className}>
		<label htmlFor={field.id}>
			{field.label}
			{field.meta.touched &&
				field.meta.error && <span className="error">{field.meta.error}</span>}
		</label>
		<input
			{...field.input}
			placeholder={field.placeholder}
			type={field.type}
			id={field.id}
			readOnly={field.readOnly}
			className={field.meta.touched && field.meta.error ? 'invalid' : ''}
			value={field.value}
		/>
	</div>
);

export default InputField;
