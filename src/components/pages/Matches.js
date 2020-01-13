import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGroups, generateGroups } from '../../actions/tournamentActions';
import { Row, Col, Modal } from 'antd';
import HelpCard from '../Admin/HelpCard';
import GroupsListCard from '../Admin/GroupsListCard';
import MatchesTable from '../Admin/MatchesTable';
import LoadingPage from '../Admin/LoadingPage';
import GenGroupCard from '../Admin/GenGroupCard/';

const Matches = ({ tournament, fetchGroups, generateGroups }) => {
	const [activeGroup, setActiveGroup] = useState({
		id: null,
		name: null,
		matches: []
	});

	const { groups, teams, pendings } = tournament;

	if (pendings.groups === undefined) {
		fetchGroups().catch(({ message }) =>
			Modal.error({ title: 'Errore', content: message })
		);
    }
    
    if (pendings.groups === false) {
        return (
            <Row>
                <Col xs={24} lg={10} xl={6}>
                    {groups.length === 0 ? (
                        <GenGroupCard 
                            onSubmit={(values) =>
                                generateGroups(values.groups)
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
                        />
                    )}
                </Col>
                <Col xs={24} lg={14} xl={12}>
                    <MatchesTable teams={teams} group={activeGroup} />
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
    generateGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, { fetchGroups, generateGroups })(Matches);
