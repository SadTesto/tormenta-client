import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { Formik } from 'formik';
import NewTeamForm from './NewTeamForm';

const NewTeamModal = ({ title, visible, onOk, showModal }) => (
	<Modal
		title={title}
		visible={visible}
		onOk={onOk}
        onCancel={() => showModal(false)}
        footer={<Fragment></Fragment>}
	>
		<Formik
			initialValues={{
				name: ''
			}}
			onSubmit={(values, { setSubmitting, setErrors }) => {
                alert('Added new team');
				showModal(false);
			}}
			onReset={() => showModal(false)}
		>
			{({ values, errors, handleSubmit, handleReset, handleChange }) => (
				<NewTeamForm
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

NewTeamModal.propTypes = {
	title: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	onOk: PropTypes.func.isRequired,
	showModal: PropTypes.func.isRequired
};

export default NewTeamModal;
