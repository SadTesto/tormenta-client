import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Card, Form, Button, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const StartTeamsCard = ({ setPoTeams }) => {
	const [fetching, setFetching] = useState(false);

	return (
		<Card title="Genera Playoff">
			<p style={{ marginBottom: '0.5rem' }}>
				Seleziona il numero di squadre di partenza per i playoff
			</p>
			<Formik
				initialValues={{ teams: 2 }}
				onSubmit={values => {
					setFetching(true);
					axios.get('https://dev.tronweb.it/tormenta-server/get_po_teams.php?teams=' +
                            values.teams)
						.then(({ data }) => {
							if (data.code === 1) {
								setPoTeams({
									teams: data.start_teams,
									required: data.extra_teams,
									startNum: values.teams
								});
								setFetching(false);
							} else {
								throw new Error(
									data.message || 'Errore sconosciuto'
								);
							}
						})
						.catch(err => {
							const { response } = err;
							if (
								response &&
								response.data &&
								response.data.message
							) {
								err.message = response.data.message;
							}
							setFetching(false);
							message.error(err.message);
						});
				}}
			>
				{({ values, setFieldValue, handleSubmit }) => (
					<Form layout="inline" onSubmit={handleSubmit}>
						<Form.Item>
							<Select
								style={{ width: 200 }}
								value={values.teams}
								onChange={val => setFieldValue('teams', val)}
							>
								<Option value={2}>2</Option>
								<Option value={4}>4</Option>
								<Option value={8}>8</Option>
								<Option value={16}>16</Option>
								<Option value={32}>32</Option>
							</Select>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={fetching}
							>
								Invia
							</Button>
						</Form.Item>
					</Form>
				)}
			</Formik>
		</Card>
	);
};

StartTeamsCard.propTypes = {
    setPoTeams: PropTypes.func.isRequired
};

export default StartTeamsCard;
