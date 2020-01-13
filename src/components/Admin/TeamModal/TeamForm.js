import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const TeamForm = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    handleReset
}) => (
    <Form onSubmit={handleSubmit} onReset={handleReset} layout="vertical">
        <Form.Item
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name || ''}
            label="Nome della squadra"
            style={{ marginBottom: 0 }}
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