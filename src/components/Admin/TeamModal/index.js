import React, { Fragment } from 'react';
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
		footer={<Fragment></Fragment>}
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
            onReset={() => showModal(false)}
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
