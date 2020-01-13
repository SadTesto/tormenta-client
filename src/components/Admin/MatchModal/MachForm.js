import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const MatchForm = ({
	values,
	errors,
	handleChange,
	handleReset,
	handleSubmit
}) => (
	<Form onSubmit={handleSubmit} onReset={handleReset}>
		<Form.Item
			style={{ marginBottom: 5 }}
			validateStatus={errors.teamA_score ? 'error' : ''}
			help={errors.teamA_score || ''}
			label={values.teamA}
		>
			<Input
				id="teamA_score"
				name="teamA_score"
				type="number"
				value={values.teamA_score}
				onChange={handleChange}
			/>
		</Form.Item>
		<Form.Item
			style={{ marginBottom: 0 }}
			validateStatus={errors.teamB_score ? 'error' : ''}
			help={errors.teamB_score || ''}
			label={values.teamB}
		>
			<Input
				id="teamB_score"
				name="teamB_score"
				type="number"
				value={values.teamB_score}
				onChange={handleChange}
			/>
		</Form.Item>
	</Form>
);

MatchForm.propTypes = {
	values: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	handleReset: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default MatchForm;
