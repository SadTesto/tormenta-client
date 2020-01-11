import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createInfo } from '../../../actions/tournamentActions';
import { Col, Card, Modal } from 'antd';
import TournamentForm from '../TournamentForm/';
import HelpCard from '../HelpCard';

const Info = ({ tournament, nextStep, setLoading, createInfo }) => {
	if (tournament.exists === true) {
		nextStep();
		return <Fragment></Fragment>;
	} else {
		return (
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
							buttons={[
								{
									text: 'Avanti',
									type: 'primary',
									htmlType: 'submit'
								}
							]}
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
	}
};

Info.propTypes = {
	tournament: PropTypes.object.isRequired,
	nextStep: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
	createInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, { createInfo })(Info);
