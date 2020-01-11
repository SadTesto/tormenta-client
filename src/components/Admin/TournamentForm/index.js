import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Form from './Form';

const TournamentForm = ({ info, buttons, handleSubmit, disabled }) => (
	<Formik
        initialValues={{
            id: info ? info.id : '',
            title: info ? info.title : '',
            teams: info ? info.teams : 3
        }}
        enableReinitialize={true}
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
        onSubmit={handleSubmit}
    >
		{({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
			<Form
				values={values}
				errors={errors}
				handleChange={handleChange}
                handleSubmit={handleSubmit}
                buttons={buttons}
                disabled={disabled === true}
			/>
		)}
	</Formik>
);

TournamentForm.propTypes = {
    info: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    buttons: PropTypes.array.isRequired,
    disabled: PropTypes.bool
};

export default TournamentForm;