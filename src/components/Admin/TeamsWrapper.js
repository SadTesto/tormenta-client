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

    const { info, teams, groups } = tournament;
    
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
			<Col span={24} lg={16} xxl={12}>
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
                    deleteDisabled={groups.length > 0}
				/>
			</Col>
			<Col span={24} lg={8} xxl={4}>
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
							type="info"
							showIcon={true}
							style={{ marginBottom: 10 }}
						/>
					) : null}
                    {groups.length > 0 ? (
                        <Alert
                            message={"I gironi sono gia' stati generati, "+
                            "quindi sara' possibile solo modificare il nome delle squadre"}
							type="info"
							showIcon={true}
							style={{ marginBottom: 10 }}
						/>
                    ) : null}
					{extraButtons}
				</Card>
			</Col>
			<Col span={24} xxl={8}>
				<HelpCard
					message={[
                        'In questa pagina puoi aggiungere, modificare o eliminare '+
                        'ogni squadra del torneo.',
                        'Una volta generate le partite non sarà più possibile eliminare'+
                        ' le squadre, ma solo rinominarle.',
                        `Questo torneo opita ${info.teams} squadre.`
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
