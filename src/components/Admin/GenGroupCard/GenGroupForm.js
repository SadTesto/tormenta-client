import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Select, Button } from 'antd';

const { Option } = Select;

const GenGroupForm = ({ options, values, setFieldValue, handleSubmit }) => (
	<Form
		onSubmit={handleSubmit}
		layout="inline"
		wrapperCol={{ xs: { span: 24 } }}
	>
		<Row>
			<Col xs={24} md={18}>
				<Form.Item style={{ display: 'block' }}>
					<Select
						id="groups"
                        name="groups"
                        type="select"
						htmlType="select"
						onChange={val => setFieldValue("groups", val)}
						value={values.groups}
					>
						{options.map((opt, index) => (
							<Option value={index} key={index}>
								{opt}
							</Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} md={6}>
				<Form.Item style={{ display: 'block' }}>
					<Button type="primary" htmlType="submit">
						Genera
					</Button>
				</Form.Item>
			</Col>
		</Row>
	</Form>
);

GenGroupForm.propTypes = {
	options: PropTypes.array.isRequired,
	values: PropTypes.object.isRequired,
	setFieldValue: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default GenGroupForm;
