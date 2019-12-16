import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import LoginForm from './LoginForm';

const LoginCard = props => (
	<Formik
		initialValues={{
			username: '',
			password: '',
			rememberMe: false
        }}
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
            setErrors({ username: 'idk lol just stfu'});
            console.log(values);
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

export default LoginCard;
