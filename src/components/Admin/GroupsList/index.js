import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, message } from 'antd';
import GroupsListCard from '../GroupsListCard';
import MatchesTable from '../MatchesTable';
import axios from 'axios';

const Groups = ({
    teams,
    groupsNoPo,
    updateMatchResults,
    groupButtons,
    children
}) => {
	const [activeGroup, setActiveGroup] = useState({
		id: null,
		name: null,
		action: null,
		fetched: false
	});
	const [fetchResult, setFetchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const refreshResults = () => setActiveGroup({ ...activeGroup, fetched: false })

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
                    throw new Error(errorMessage);
				}
			} catch (e) {
				message.error(e.message);
			}
		}
		if (activeGroup.id !== null && activeGroup.fetched === false) {
			fetchMatches(activeGroup);
		}
	}, [activeGroup, fetchResult]);

	return (
        <>
            <Col xs={24} lg={10} xl={6}>
                <GroupsListCard
                    groups={groupsNoPo.map(group =>
                        group.id === activeGroup.id
                            ? { ...group, active: true }
                            : group
                    )}
                    setActive={setActiveGroup}
                    action={activeGroup.action}
                    buttons={groupButtons}
                />
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
                    refreshResults={refreshResults}
                    loading={loading}
                />
            </Col>
            {children}
        </>
    );
};

Groups.propTypes = {
    teams: PropTypes.object.isRequired,
    groupsNoPo: PropTypes.array.isRequired,
    groupButtons: PropTypes.array.isRequired,
    updateMatchResults: PropTypes.func,
    children: PropTypes.any
};

export default Groups;