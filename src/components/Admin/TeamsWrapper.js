import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Card, Modal, Alert, message } from 'antd';
import HelpCard from './HelpCard';
import TeamsTable from './TeamsTable';
import TeamModal from './TeamModal/';

const TeamsWrapper = ({
	tournament,
	createTeam,
	editTeam,
	deleteTeam,
	extraButtons
}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalTeam, setModalTeam] = useState({
		id: null,
		name: null
	});
	const [loading, setLoading] = useState(false);

    const { info, teams } = tournament;
    
	return (
		<Fragment>
			<TeamModal
				title={(modalTeam.id ? 'Modifica' : 'Nuova') + ' squadra'}
				visible={modalVisible}
				team={modalTeam}
				onSubmit={(values, { resetForm }) => {
					setModalTeam({
						id: null,
						name: null
					});
					setLoading(true);
					if (values.id) {
						editTeam(values.id, values.name)
							.then(() => {
                                setLoading(false);
                                resetForm();
                            })
							.catch(({ message }) => {
                                setLoading(false);
                                resetForm();
								Modal.error({
									title: 'Errore',
									content: message
								});
							});
					} else {
						createTeam(values.name)
							.then(name => {
                                setLoading(false);
                                resetForm();
								message.success(
									`Squadra "${name}" creata con successo`
                                );
							})
							.catch(({ message }) => {
                                setLoading(false);
                                resetForm();
								Modal.error({
									title: 'Errore',
									content: message
                                });
							});
					}
				}}
				showModal={setModalVisible}
			/>
			<Col span={24} lg={16} xl={12}>
				<TeamsTable
					teams={teams}
					editTeam={team => {
						setModalTeam(team);
						setModalVisible(true);
					}}
					deleteTeam={teamId =>
						deleteTeam(teamId)
							.then(name =>
								message.success(
									`Squadra "${name}" eliminata con successo`
								)
							)
							.catch(({ message }) =>
								Modal.error({
									title: 'Errore',
									content: message
								})
							)
					}
				/>
			</Col>
			<Col span={24} lg={8} xl={4}>
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
						loading={loading}
						disabled={info.teams === teams.length}
					>
						Aggiungi
					</Button>
					{info.teams === teams.length ? (
						<Alert
							message="Numero massimo di squadre raggiunto"
							type="warning"
							showIcon={true}
							style={{ marginBottom: 10 }}
						/>
					) : null}
					{extraButtons}
				</Card>
			</Col>
			<Col span={24} xl={8}>
				<HelpCard
					message={[
						'Per aggiungere una nuova squadra clicca sul pulsante ' +
                        'blu "Aggiungi". Dopo aver inserito il nome della squadra ' +
                        "e aver confermato, la squadra apparira' nella tabella qui " +
                        'accanto.',
						'Per modificare o eliminare una squadra utilizza gli appositi ' +
                        'pulsanti nella tabella.',
						`Ricorda di inserire un minimo di 3 squadre e un massimo di ${info.teams}.`
					]}
				/>
			</Col>
		</Fragment>
	);
};

TeamsWrapper.propTypes = {
	tournament: PropTypes.object.isRequired,
	createTeam: PropTypes.func.isRequired,
	editTeam: PropTypes.func.isRequired,
	deleteTeam: PropTypes.func.isRequired,
	extraButtons: PropTypes.element
};

export default TeamsWrapper;
