import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Modal } from 'antd';
import MatchForm from './MachForm';

const MatchModal = ({ match, visible, onSubmit, showModal }) => (
    <Formik
        initialValues={{
            id: match.id,
            teamA: match.teamA,
            teamB: match.teamB,
            teamA_score: match.scoreA || 0,
            teamB_score: match.scoreB || 0,
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
                title="Risultato"
                visible={visible}
                onCancel={() => showModal(false)}
                onOk={() => submitForm()}
                cancelText="Annulla"
                okText="Salva"
            >
                <MatchForm
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

MatchModal.propTypes = {
    match: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired
};

export default MatchModal;