import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createInfo } from '../../../actions/tournamentActions';
import { Col, Card, Modal } from 'antd';
import TournamentForm from '../TournamentForm/';
import HelpCard from '../HelpCard';

const Info = ({ nextStep, setLoading, createInfo }) => (
	<Fragment>
		<Col span={24} md={10}>
			<Card title="Informazioni" bordered={true}>
				<TournamentForm
					handleSubmit={(values, { setSubmitting }) => {
						setLoading(true);
						createInfo(values.title, values.teams)
							.then(() => nextStep())
							.catch(err =>
								Modal.error({
									title: 'Errore',
									content: err.message
								})
							)
							.finally(() => {
								setSubmitting(false);
								setLoading(false);
							});
					}}
				/>
			</Card>
		</Col>
		<Col span={24} md={10}>
			<HelpCard
				message={[
					'Per iniziare inserisci le informazioni di base quali titolo del ' +
                    'torneo e numero totale di squadre partecipanti (fonamentale per ' +
                    'poter generare i gironi e le partite del torneo).',
					'Potrai selezionare il tipo di gironi in seguito.'
				]}
			/>
		</Col>
	</Fragment>
);

Info.propTypes = {
	nextStep: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
	createInfo: PropTypes.func.isRequired
};

export default connect(() => ({}), { createInfo })(Info);
