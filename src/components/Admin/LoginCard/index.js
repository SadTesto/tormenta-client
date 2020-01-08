import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import LoginForm from './LoginForm';

const LoginCard = ({ authAdmin }) => (
	<Formik
		initialValues={{
			username: '',
			password: '',
			rememberMe: false
        }}
        validateOnChange={false}
        validate={values => {
            let errors = {};
            if (!values.username) {
                errors.username = "Username richiesto";
            }
			if (!values.password) {
				errors.password = "Password richiesta";
            }
			return errors;
		}}
		onSubmit={(values, { setSubmitting, setErrors }) => {
            authAdmin(values.username, values.password)
                .catch(err => setErrors({ username: err.message }))
                .finally(() => setSubmitting(false));
		}}
	>
		{({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
			<LoginForm
				values={values}
				errors={errors}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		)}
	</Formik>
);

LoginCard.propTypes = {
    authAdmin: PropTypes.func.isRequired
};

export default LoginCard;
