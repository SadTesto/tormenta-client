import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Modal } from 'antd';
import EditGroupForm from './EditGroupForm';

const EditGroupModal = ({ group, visible, onSubmit, showModal }) => (
    <Formik
        initialValues={{
            id: group.id,
            name: group.name
        }}
        onSubmit={onSubmit}
        enableReinitialize={true}
    >
        {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleReset,
            submitForm
        }) => (
            <Modal
                title="Modifica girone"
                visible={visible}
                onCancel={() => showModal(false)}
                onOk={() => submitForm()}
                cancelText="Annulla"
                okText="Salva"
            >
                <EditGroupForm
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                />
            </Modal>
        )}
    </Formik>
);

EditGroupModal.propTypes = {
    group: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired
};

export default EditGroupModal;