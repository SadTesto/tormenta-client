import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { Formik } from 'formik';
import TeamForm from './TeamForm';

const TeamModal = ({
	title,
	visible,
	team = { id: null, name: null },
	onSubmit,
	showModal
}) => (
    <Formik
        initialValues={{
            id: team.id || '',
            name: team.name || ''
        }}
        onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
            onSubmit(values, { setSubmitting, setErrors, resetForm });
            showModal(false);
        }}
        onReset={(values, { resetForm }) => {
            resetForm();
            showModal(false);
        }}
        enableReinitialize={true}
    >
        {({ values, errors, handleSubmit, handleReset, handleChange, submitForm, resetForm }) => (
            <Modal
                title={title}
                visible={visible}
                onCancel={() => {
                    resetForm();
                    showModal(false);
                }}
                onOk={() => submitForm()}
                okText="Salva"
                cancelText="Annulla"
            >
                <TeamForm
                    values={values}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                    handleChange={handleChange}
                />
            </Modal>
        )}
    </Formik>
);

TeamModal.propTypes = {
	title: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	team: PropTypes.object,
	onSubmit: PropTypes.func.isRequired,
	showModal: PropTypes.func.isRequired
};

export default TeamModal;
