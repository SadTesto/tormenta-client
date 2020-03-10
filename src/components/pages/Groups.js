import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	fetchGroups,
	generateGroups,
	fetchTeams,
    updateMatchResults,
    editGroup
} from '../../actions/tournamentActions';
import { Row, Col, message } from 'antd';
import HelpCard from '../Admin/HelpCard';
import LoadingPage from '../Admin/LoadingPage';
import GenGroupCard from '../Admin/GenGroupCard/';
import GroupsList from '../Admin/GroupsList/';

const Groups = ({
	tournament,
	fetchGroups,
	fetchTeams,
	generateGroups,
    updateMatchResults,
    editGroup
}) => {

    const { pendings, groups } = tournament;
	if (pendings.groups === undefined) {
		fetchGroups().catch(err =>
			message.error(err.message)
		);
	}
	if (pendings.groups === undefined) {
		fetchTeams().catch(err =>
			message.error(err.message)
		);
    }
    
    const groupsNoPo = groups.filter(g => g.is_po === false);
    const poGroups = groups.filter(g => g.is_po === true);

	if (pendings.groups === false && pendings.teams === false) {
		return (
			<Row>
                {groupsNoPo.length === 0 ? (
                    <GenGroupCard
                        onSubmit={values =>
                            generateGroups(+values.groups)
                                .then(() =>
                                    message.success(
                                        'Gironi generati con successo'
                                    )
                                )
                                .catch(err =>
                                    message.error(err.message)
                                )
                        }
                    />
                ) : (
                    <GroupsList
                        teams={tournament.teams}
                        groupsNoPo={groupsNoPo}
                        groupButtons={['edit', 'ranking', 'matches']}
                        updateMatchResults={poGroups.length > 0 ? null : updateMatchResults}
                        editGroup={editGroup}
                    >
                        <Col span={24} xl={6}>
                            <HelpCard 
                                message={[
                                    'In questa pagina puoi: visualizzare le partite di ogni '+
                                    'girone e modificarne il risultato, controllare la classifica'+
                                    ' dei gironi, modificare il nome di ogni girone.',
                                    'Una volta generate le partite dei playoff i risultati non '+
                                    'saranno più modificabili, ma potrai comunque visualizzare i '+
                                    'risultati delle singole partite e visionare la classifica '+
                                    'di ogni girone.',
                                    'Per iniziare clicca sul nome di un girone.'
                                ]} 
                            />
                        </Col>
                    </GroupsList>
                )}
			</Row>
		);
	} else {
		return <LoadingPage />;
	}
};

Groups.propTypes = {
	tournament: PropTypes.object.isRequired,
	fetchGroups: PropTypes.func.isRequired,
	fetchTeams: PropTypes.func.isRequired,
    generateGroups: PropTypes.func.isRequired,
    updateMatchResults: PropTypes.func.isRequired,
    editGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, {
	fetchGroups,
	fetchTeams,
    generateGroups,
    updateMatchResults,
    editGroup
})(Groups);
