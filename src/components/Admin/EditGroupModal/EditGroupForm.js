import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const EditGroupForm = ({
	values,
	errors,
	handleChange,
	handleReset,
	handleSubmit
}) => (
	<Form onSubmit={handleSubmit} onReset={handleReset}>
		<Form.Item
			style={{ marginBottom: 0 }}
			validateStatus={errors.name ? 'error' : ''}
			help={errors.name || ''}
			label="Nome"
		>
			<Input
				id="name"
				name="name"
				type="text"
				value={values.name}
				onChange={handleChange}
			/>
		</Form.Item>
	</Form>
);

EditGroupForm.propTypes = {
	values: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	handleReset: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default EditGroupForm;
