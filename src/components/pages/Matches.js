import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	fetchGroups,
	generateGroups,
	fetchTeams
} from '../../actions/tournamentActions';
import { Row, Col, Modal } from 'antd';
import HelpCard from '../Admin/HelpCard';
import GroupsListCard from '../Admin/GroupsListCard';
import MatchesTable from '../Admin/MatchesTable';
import LoadingPage from '../Admin/LoadingPage';
import GenGroupCard from '../Admin/GenGroupCard/';
import axios from 'axios';

const Matches = ({ tournament, fetchGroups, fetchTeams, generateGroups }) => {
	const [activeGroup, setActiveGroup] = useState({
		id: null,
		name: null,
		matches_fetched: false
	});
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchMatches(activeGroup) {
			try {
                setLoading(true);
				const resp = await axios.get(
					`http://dev.tronweb.it/tormenta-server/get_matches.php?group_id=${activeGroup.id}`
				);
                const { data, response } = resp;
                setLoading(false);
				setActiveGroup({ ...activeGroup, matches_fetched: true });
				if (data && data.code === 1) {
					setMatches(data.matches);
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
		if (activeGroup.id !== null && activeGroup.matches_fetched === false) {
			fetchMatches(activeGroup);
		}
	}, [activeGroup, matches]);

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
								generateGroups(values.groups).catch(
									({ message }) =>
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
						/>
					)}
				</Col>
				<Col xs={24} lg={14} xl={12}>
					<MatchesTable
						teams={teams}
						matches={matches.map((match, index) => ({
							key: (index + 1),
							...match
                        }))}
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
	generateGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, {
	fetchGroups,
	fetchTeams,
	generateGroups
})(Matches);
