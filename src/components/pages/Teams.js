import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	fetchTeams,
	createTeam,
	editTeam,
	deleteTeam
} from '../../actions/tournamentActions';
import { Row, Col, Card, Modal, Button, message, Alert } from 'antd';
import TeamsTable from '../Admin/TeamsTable';
import TeamModal from '../Admin/TeamModal/';

const Teams = ({
	tournament,
	fetchTeams,
	createTeam,
	editTeam,
	deleteTeam
}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalTeam, setModalTeam] = useState({
		id: null,
		name: null
    });
    const [loading, setLoading] = useState(false);

	const { teams, pendings } = tournament;

	if (pendings.teams === undefined) {
		fetchTeams().catch(({ message }) =>
			Modal.error({ title: 'Errore', content: message })
		);
    }

	return (
		<Fragment>
			<TeamModal
				title={(modalTeam.id ? 'Modifica' : 'Nuova') + ' squadra'}
				visible={modalVisible}
				team={modalTeam}
				onSubmit={(values, { setSubmitting }) => {
                    setLoading(true);
					if (values.id) {
						editTeam(values.id, values.name)
							.catch(({ message }) =>
								Modal.error({
									title: 'Errore',
									content: message
								})
							)
							.finally(() => {
                                setSubmitting(false);
                                setLoading(false);
                            });
					} else {
                        createTeam(values.name)
                            .then(name => {
                                setSubmitting(false);
                                setLoading(false);
                                message.success(
                                    `Squadra "${name}" creata con successo`
                                );
                            })
							.catch(({ message }) => {
                                setSubmitting(false);
                                setLoading(false);
								Modal.error({
									title: 'Errore',
									content: message
								});
                            });
					}
				}}
				showModal={setModalVisible}
			/>
			<Row>
				<Col span={24} md={16}>
					<TeamsTable
						teams={teams}
						editTeam={team => {
							setModalTeam(team);
							setModalVisible(true);
						}}
						deleteTeam={teamId =>
                            deleteTeam(teamId)
                                .then(name => {
                                    message.success(
                                        `Squadra "${name}" eliminata con successo`
                                    );
                                })
                                .catch(({ message }) =>
                                    Modal.error({
                                        title: 'Errore',
                                        content: message
                                    })
                                )
                        }
                        loading={pendings.teams}
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
                                console.log(modalTeam);
								setModalVisible(true);
                            }}
                            loading={loading}
                            disabled={tournament.info.teams === teams.length}
						>
							Aggiungi
						</Button>
                        {tournament.info.teams === teams.length ? (
                            <Alert 
                                message="Numero massimo di squadre raggiunto"
                                type="warning"
                                showIcon={true}
                            />
                        ) : null}
					</Card>
				</Col>
				{/* <Col span={24} md={10}>
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
                </Col> */}
			</Row>
		</Fragment>
	);
};

Teams.propTypes = {
	tournament: PropTypes.object.isRequired,
	fetchTeams: PropTypes.func.isRequired,
	createTeam: PropTypes.func.isRequired,
	editTeam: PropTypes.func.isRequired,
	deleteTeam: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, {
	fetchTeams,
	createTeam,
	editTeam,
	deleteTeam
})(Teams);
