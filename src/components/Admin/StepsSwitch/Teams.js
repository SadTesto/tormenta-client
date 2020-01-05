import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Card, Modal } from 'antd';
import HelpCard from '../HelpCard';
import TeamsTable from '../TeamsTable';
import TeamModal from '../TeamModal/';

const Teams = ({ nextStep }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalTeam, setModalTeam] = useState({
		id: null,
		name: null
	});

	return (
		<Fragment>
			<TeamModal
				title={(modalTeam.id ? "Modifica" : "Nuova") + " squadra"}
				visible={modalVisible}
				team={modalTeam}
				onOk={() => alert('OK')}
				showModal={setModalVisible}
			/>
			<Col span={24} md={10}>
				<TeamsTable
					editTeam={team => {
						setModalTeam(team);
						setModalVisible(true);
					}}
					deleteTeam={teamId => {
						alert('Delete team ' + teamId);
					}}
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
							/*team.length > 0*/ true
								? nextStep()
								: Modal.warning({
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
                        'Per aggiungere una nuova squadra clicca sul pulsante '+
                        'blu "Aggiungi". Dopo aver inserito il nome della squadra '+
                        'e aver confermato, la squadra apparira\' nella tabella qui '+
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
	nextStep: PropTypes.func.isRequired
};

export default Teams;
