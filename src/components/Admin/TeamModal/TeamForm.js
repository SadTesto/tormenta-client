import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

const TeamForm = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    handleReset
}) => (
    <Form onSubmit={handleSubmit} onReset={handleReset}>
        <Form.Item
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name || ''}
        >
            <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nome"
                onChange={handleChange}
                value={values.name}
            />
        </Form.Item>
        <Form.Item style={{float:'right'}}>
            <Button type="danger" htmlType="reset" style={{marginRight: 10}}>
                Annulla
            </Button>
            <Button type="primary" htmlType="submit">
                Salva
            </Button>
        </Form.Item>
    </Form>
);

TeamForm.propTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired
};

export default TeamForm;