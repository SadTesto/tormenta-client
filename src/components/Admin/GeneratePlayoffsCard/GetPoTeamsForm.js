import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Form, Button, Select } from 'antd';

const { Option } = Select;

const GetPoTeamsForm = ({ loading, onSubmit }) => (
	<Fragment>
		<p style={{ marginBottom: '0.5rem' }}>Seleziona il numero di squadre di partenza per i playoff</p>
		<Formik initialValues={{ teams: 2 }} onSubmit={onSubmit}>
			{({ values, setFieldValue, handleSubmit }) => (
				<Form layout="inline" onSubmit={handleSubmit}>
					<Form.Item>
						<Select
							style={{ width: 200 }}
							value={values.teams}
							onChange={val => setFieldValue('teams', val)}
						>
							<Option value={2}>2</Option>
							<Option value={4}>4</Option>
							<Option value={8}>8</Option>
							<Option value={16}>16</Option>
							<Option value={32}>32</Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
						>
							Invia
						</Button>
					</Form.Item>
				</Form>
			)}
		</Formik>
	</Fragment>
);

GetPoTeamsForm.propTypes = {
    loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default GetPoTeamsForm;
