import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generatePlayoffGroups } from '../../../actions/tournamentActions';
import { Card, Tree, message } from 'antd';
import GetPoTeamsForm from './GetPoTeamsForm';
import SelectExtraTeamsForm from './SelectExtraTeamsForm';
import axios from 'axios';

const { TreeNode } = Tree;

const GeneratePlayoffsCard = ({ tournament, generatePlayoffGroups }) => {
	const [poTeams, setPoTeams] = useState(null);
	const [fetching, setFetching] = useState(false);

	const { teams, groups } = tournament;
	return (
		<Card title="Genera Playoff">
			{poTeams !== null ? (
				<>
					<p>
						Squadre selezionate automaticamente in base alla
						classifica dei singoli gironi:
					</p>
					<Tree showLine defaultExpandAll>
						{Object.keys(poTeams.teams).map(groupID => (
							<TreeNode
								title={groups.find(g => g.id === groupID).name}
								key={groupID}
							>
								{poTeams.teams[groupID].map(teamID => (
									<TreeNode
										title={
											teams.find(t => t.id === teamID).name
										}
										key={teamID}
									/>
								))}
							</TreeNode>
						))}
					</Tree>
					<SelectExtraTeamsForm
						allTeams={teams}
						baseTeams={Object.values(poTeams.teams).flat()}
						required={poTeams.required}
						onSubmit={values => {
                            setFetching(true);
                            generatePlayoffGroups(poTeams.startNum, values.teams)
                                .catch(err => {
                                    setFetching(false);
                                    message.error(err.message);
                                })
                        }}
                        backStage={() => setPoTeams(null)}
						loading={fetching}
					/>
				</>
			) : (
				<GetPoTeamsForm
					loading={fetching}
					onSubmit={values => {
						setFetching(true);
						axios
							.get(
								'http://dev.tronweb.it/tormenta-server/get_po_teams.php?teams=' +
									values.teams
							)
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
				/>
			)}
		</Card>
	);
};

GeneratePlayoffsCard.propTypes = {
    tournament: PropTypes.object.isRequired,
    generatePlayoffGroups: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, { generatePlayoffGroups })(GeneratePlayoffsCard);
