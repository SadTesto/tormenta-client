import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

const TForm = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    buttons,
    disabled
}) => (
    <Form 
        onSubmit={handleSubmit}
        labelCol={{
            xs: { span: 24 },
            md: { span: 6 },
        }}
        wrapperCol={{
            xs: { span: 24 },
            md: { span: 18 },
        }}
    >
        <Form.Item
            style={{ marginBottom: 5 }}
            validateStatus={errors.title ? 'error' : ''}
            help={errors.title || ''}
            label="Titolo del torneo"
        >
            <Input
                id="title"
                name="title"
                type="text"
                placeholder="Titolo"
                value={values.title}
                onChange={handleChange}
                disabled={disabled}
            />
        </Form.Item>
        <Form.Item 
            style={{ marginBottom: 10 }}
            validateStatus={errors.teams ? 'error' : ''}
            help={errors.teams || ''}
            label="Numero di squadre"
        >
            <Input 
                id="teams"
                name="teams"
                type="number"
                min={3} 
                max={40} 
                value={values.teams}
                onChange={handleChange}
                disabled={disabled}
            />
        </Form.Item>
        <Form.Item style={{ margin: 0, float: 'right' }}>
            {buttons.map(({ type, text, ...rest }, index) =>
                <Button key={index} type={type} {...rest}>
                    {text}
                </Button>
            )}
        </Form.Item>
    </Form>
);

TForm.propTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    buttons: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default TForm;