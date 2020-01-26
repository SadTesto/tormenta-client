import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Button } from 'antd';

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
            sm: { span: 8 },
        }}
        wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 },
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
        <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
            {buttons.map(({ type, text, ...rest }, index) =>
                <Button 
                    key={index} 
                    type={type} 
                    style={{ marginLeft: 8, ...rest.style}}
                    {...rest} 
                >
                    {text}
                </Button>
            )}
            </Col>
        </Row>
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