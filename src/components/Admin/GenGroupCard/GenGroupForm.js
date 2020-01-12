import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Select, Button } from 'antd';

const { Option } = Select;

const GenGroupForm = ({
	options,
	values,
	handleChange,
	handleSubmit
}) => (
	<Form onSubmit={handleSubmit} layout="inline" wrapperCol={{ xs: { span: 24 }}}>
        <Row>
            <Col xs={24} md={18}>
                <Form.Item style={{display: 'block'}}>
                    <Select onChange={handleChange} value={values.groups}>
                        {options.map((opt, index) => (
                            <Option 
                                value={opt} 
                                key={index}
                            >{opt + ' giron' + (opt === 1 ? 'e' : 'i')}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={24} md={6}>
                <Form.Item style={{display: 'block'}}>
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
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default GenGroupForm;
