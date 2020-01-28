import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	fetchGroups,
	generateGroups,
	fetchTeams,
	updateMatchResults
} from '../../actions/tournamentActions';
import { Row, Col, Modal, message } from 'antd';
import HelpCard from '../Admin/HelpCard';
import GroupsListCard from '../Admin/GroupsListCard';
import MatchesTable from '../Admin/MatchesTable';
import LoadingPage from '../Admin/LoadingPage';
import GenGroupCard from '../Admin/GenGroupCard/';
import axios from 'axios';

const Matches = ({
	tournament,
	fetchGroups,
	fetchTeams,
	generateGroups,
	updateMatchResults
}) => {
	const [activeGroup, setActiveGroup] = useState({
		id: null,
		name: null,
		action: null,
		fetched: false
	});
	const [fetchResult, setFetchResult] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchMatches(activeGroup) {
			try {
				setLoading(true);
				const resp = await axios.get(
					`http://dev.tronweb.it/tormenta-server/${activeGroup.action}.php?group_id=${activeGroup.id}`
				);
				const { data, response } = resp;
				setLoading(false);
				setActiveGroup({ ...activeGroup, fetched: true });
				if (data && data.code === 1) {
					if (activeGroup.action === 'get_matches') {
						setFetchResult(data.matches);
					} else if (activeGroup.action === 'get_ranking') {
						setFetchResult(data.ranking);
					}
				} else {
					let errorMessage = 'Errore inaspettato';
					if (response && response.data && response.data.message) {
						errorMessage = response.data.message;
					}
					Modal.error({
						title: 'Errore',
						content: errorMessage
					});
				}
			} catch (e) {
				Modal.error({
					title: 'Errore',
					content: e.message
				});
			}
		}
		if (activeGroup.id !== null && activeGroup.fetched === false) {
			fetchMatches(activeGroup);
		}
	}, [activeGroup, fetchResult]);

	const { groups, teams, pendings } = tournament;

	if (pendings.groups === undefined) {
		fetchGroups().catch(({ message }) =>
			Modal.error({ title: 'Errore', content: message })
		);
	}
	if (pendings.groups === undefined) {
		fetchTeams().catch(({ message }) =>
			Modal.error({ title: 'Errore', content: message })
		);
	}

	if (pendings.groups === false && pendings.teams === false) {
		return (
			<Row>
				<Col xs={24} lg={10} xl={6}>
					{groups.length === 0 ? (
						<GenGroupCard
							onSubmit={values =>
								generateGroups(+values.groups)
									.then(() =>
										message.success(
											'Gironi generati con successo'
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
					) : (
						<GroupsListCard
							groups={groups.map(group =>
								group.id === activeGroup.id
									? { ...group, active: true }
									: group
							)}
							setActive={setActiveGroup}
							action={activeGroup.action}
						/>
					)}
				</Col>
				<Col xs={24} lg={14} xl={12}>
					<MatchesTable
						groupName={activeGroup.name}
						teams={teams}
						matches={fetchResult.map((match, index) => ({
							key: index + 1,
							...match
						}))}
						updateResult={updateMatchResults}
						action={activeGroup.action}
						loading={loading}
					/>
				</Col>
				<Col xs={24} xl={6}>
					<HelpCard message={['To Do']} />
				</Col>
			</Row>
		);
	} else {
		return <LoadingPage />;
	}
};

Matches.propTypes = {
	tournament: PropTypes.object.isRequired,
	fetchGroups: PropTypes.func.isRequired,
	fetchTeams: PropTypes.func.isRequired,
    generateGroups: PropTypes.func.isRequired,
    updateMatchResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, {
	fetchGroups,
	fetchTeams,
    generateGroups,
    updateMatchResults
})(Matches);
