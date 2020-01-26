import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Checkbox, Button } from 'antd';

const LoginForm = ({
	values,
	errors,
	handleChange,
    handleSubmit,
    isSubmitting
}) => (
    <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item
            style={{ marginBottom: 5 }}
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username || ''}
        >
            <Input
                id="username"
                name="username"
                prefix={
                    <Icon
                        type="user"
                        style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                }
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                disabled={isSubmitting}
            />
        </Form.Item>
        <Form.Item 
            style={{ marginBottom: 10 }}
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password || ''}
        >
            <Input
                id="password"
                name="password"
                prefix={
                    <Icon
                        type="lock"
                        style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                }
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                disabled={isSubmitting}
            />
        </Form.Item>
        <Form.Item style={{ margin: 0 }}>
            <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={values.rememberMe}
                onChange={handleChange}
                disabled={isSubmitting}
            >
                Ricordami
            </Checkbox>
            <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ float: 'right' }}
                loading={isSubmitting}
            >
                Entra
            </Button>
        </Form.Item>
    </Form>
);

LoginForm.propTypes = {
    values: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired
};

export default LoginForm;
