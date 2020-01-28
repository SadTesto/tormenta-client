import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Table, Empty, Modal, message } from 'antd';
import MatchModal from './MatchModal/';

const MatchesTable = ({
	groupName,
	matches,
	teams,
	action,
	updateResult,
	loading
}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [activeMatch, setActiveMatch] = useState({
		id: null,
		teamA: null,
		teamB: null
	});

	return (
		<Fragment>
			<MatchModal
				match={activeMatch}
				showModal={setModalVisible}
				visible={modalVisible}
				onSubmit={values =>
					updateResult(
						values.id,
						values.teamA_score,
						values.teamB_score
					)
						.then(() => {
							setModalVisible(false);
							setActiveMatch({ teamA: null, teamB: null });
							message.success(
								'Risultato aggiornato con successo'
							);
						})
						.catch(({ message }) => {
							setModalVisible(false);
							setActiveMatch({ teamA: null, teamB: null });
							Modal.error({
								title: 'Errore',
								content: message
							});
						})
				}
			/>
			<Card
				title={
					groupName ? `Partite - ${groupName}` : 'Seleziona un girone'
				}
				bordered={true}
				bodyStyle={{ padding: 0 }}
			>
				{action ? (
					<Table
						size="small"
						pagination={{
							pageSize: 10
						}}
						dataSource={matches ? matches.map(match => {
							let teamA = teams.find(
								({ id }) => id === match.teamA
							);
							let teamB = teams.find(
								({ id }) => id === match.teamB
							);
							return {
								...match,
								teamA: teamA
									? teamA.name
									: 'Squadra non trovata',
								teamB: teamB
									? teamB.name
									: 'Squadra non trovata'
							};
						}) : []}
						columns={
							action === 'get_matches'
								? [
										{
											title: '#',
											dataIndex: 'key',
											key: 'key'
										},
										{
											title: 'Squadra A',
											dataIndex: 'teamA',
											key: 'teamA'
                                        },
                                        {
											title: 'Punti A',
											dataIndex: 'scoreA',
                                            key: 'scoreA',
                                            render: (text, record) => record.played ? text : '-'
										},
										{
											render: () => 'vs'
										},
										{
											title: 'Squadra B',
											dataIndex: 'teamB',
											key: 'teamB'
                                        },
                                        {
											title: 'Punti B',
											dataIndex: 'scoreB',
                                            key: 'scoreB',
                                            render: (text, record) => record.played ? text : '-'
										},
										{
											title: 'Azioni',
											render: (text, record) => (
												<span>
													<Button
														type="link"
														onClick={() => {
															setActiveMatch(record);
															setModalVisible(
																true
															);
														}}
													>
														{record.played ? 'Modifica' : 'Risultato'}
													</Button>
												</span>
											)
										}
								  ]
								: [
										{
											title: '#',
											dataIndex: 'key',
											key: 'key'
										},
										{
											title: 'Nome Squadra',
											dataIndex: 'name',
											key: 'name'
										},
										{
											title: 'Punteggio',
											dataIndex: 'score_group',
											key: 'score_group'
										}
								  ]
						}
						locale={{
							emptyText: (
								<Empty
									image={Empty.PRESENTED_IMAGE_SIMPLE}
									description="Nessuna squadra trovata"
								/>
							)
						}}
						loading={loading === true}
					/>
				) : (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description=""
					/>
				)}
			</Card>
		</Fragment>
	);
};

MatchesTable.propTypes = {
	groupName: PropTypes.string,
	matches: PropTypes.array.isRequired,
	teams: PropTypes.array.isRequired,
    action: PropTypes.string,
    updateResult: PropTypes.func.isRequired,
	loading: PropTypes.bool
};

export default MatchesTable;
