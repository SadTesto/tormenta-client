import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	createTeam,
	editTeam,
	deleteTeam
} from '../../../actions/tournamentActions';
import { Col, Button, Card, Modal } from 'antd';
import HelpCard from '../HelpCard';
import TeamsTable from '../TeamsTable';
import TeamModal from '../TeamModal/';

const Teams = ({ 
    tournament, 
    createTeam, 
    editTeam, 
    deleteTeam, 
    nextStep 
}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalTeam, setModalTeam] = useState({
		id: null,
		name: null
    });
    
    const { teams } = tournament;

	return (
		<Fragment>
			<TeamModal
				title={(modalTeam.id ? 'Modifica' : 'Nuova') + ' squadra'}
				visible={modalVisible}
				team={modalTeam}
				onSubmit={(values, { setSubmitting }) => {
					if (values.id) {
						editTeam(values.id, values.name)
							.catch(({ message }) =>
								Modal.error({
									title: 'Errore',
									content: message
								})
							)
							.finally(() => setSubmitting(false));
					} else {
						createTeam(values.name)
							.catch(({ message }) =>
								Modal.error({
									title: 'Errore',
									content: message
								})
							)
							.finally(() => setSubmitting(false));
					}
				}}
				showModal={setModalVisible}
			/>
			<Col span={24} md={10}>
				<TeamsTable
					editTeam={team => {
						setModalTeam(team);
						setModalVisible(true);
					}}
					deleteTeam={teamId =>
						deleteTeam(teamId).catch(({ message }) =>
							Modal.error({
								title: 'Errore',
								content: message
							})
						)
					}
				/>
			</Col>
			<Col span={24} md={4}>
				<Card bordered={true}>
					<Button
						type="primary"
						block
						style={{ marginBottom: 10 }}
						onClick={() => {
							setModalTeam({
								id: null,
								name: null
							});
							setModalVisible(true);
						}}
					>
						Aggiungi
					</Button>
					<Button
						block
						onClick={() =>
							teams.length > 0
								? nextStep()
								: Modal.error({
										title: 'Errore',
										content:
											'Devi inserire almeno ' +
											'3 squadre prima di poter continuare'
								  })
						}
					>
						Avanti
					</Button>
				</Card>
			</Col>
			<Col span={24} md={10}>
				<HelpCard
					message={[
						'Per aggiungere una nuova squadra clicca sul pulsante ' +
                        'blu "Aggiungi". Dopo aver inserito il nome della squadra ' +
                        'e aver confermato, la squadra apparira\' nella tabella qui ' +
                        'accanto.',
						'Per modificare o eliminare una squadra utilizza gli appositi ' +
                        'pulsanti nella tabella.',
						'Ricorda di inserire un minimo di 3 squadre e un massimo di 40.'
					]}
				/>
			</Col>
		</Fragment>
	);
};

Teams.propTypes = {
    tournament: PropTypes.object.isRequired,
    createTeam: PropTypes.func.isRequired,
    editTeam: PropTypes.func.isRequired, 
    deleteTeam: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tournament: state.tournament
});

export default connect(mapStateToProps, { createTeam, editTeam, deleteTeam })(Teams);
