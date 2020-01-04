import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Form from './Form';

const TournamentForm = () => (
	<Formik
        initialValues={{
            id: '',
            title: '',
            teams: 3
        }}
        validate={values => {
            let errors = {};
            if (!values.title) {
                errors.title = "Titolo del torneo richiesto";
            }
            if (!values.teams) {
                errors.teams = "Numero di squadre richiesto";
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
            // authAdmin(values.username, values.password)
            //     .catch(err => setErrors({ username: err.message }))
            //     .finally(() => setSubmitting(false));
            alert("Submitting for " + values.title);
        }}
    >
		{({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
			<Form
				values={values}
				errors={errors}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				isSubmitting={isSubmitting}
			/>
		)}
	</Formik>
);

export default TournamentForm;