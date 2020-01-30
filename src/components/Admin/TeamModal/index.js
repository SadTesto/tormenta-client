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
    <Modal
        title={title}
        visible={visible}
        onCancel={() => showModal(false)}
        onOk={() => {
            console.log("ok")
            showModal(false);
        }}
        okText="Salva"
        cancelText="Annulla"
    >
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
            {({ values, errors, handleSubmit, handleReset, handleChange }) => (
                <TeamForm
                    values={values}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                    handleChange={handleChange}
                />
            )}
        </Formik>
    </Modal>
);

TeamModal.propTypes = {
	title: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	team: PropTypes.object,
	onSubmit: PropTypes.func.isRequired,
	showModal: PropTypes.func.isRequired
};

export default TeamModal;
