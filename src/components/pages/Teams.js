import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchGroups,
	fetchTeams,
	createTeam,
	editTeam,
	deleteTeam
} from '../../actions/tournamentActions';
import { Row, Modal } from 'antd';
import TeamsWrapper from '../Admin/TeamsWrapper';
import LoadingPage from '../Admin/LoadingPage';

const Teams = ({
    tournament,
    fetchGroups,
	fetchTeams,
	createTeam,
	editTeam,
	deleteTeam
}) => {
	const { pendings } = tournament;
	if (pendings.teams === undefined) {
		fetchTeams().catch(({ message }) =>
			Modal.error({ title: 'Errore', content: message })
		);
    } else if (pendings.groups === undefined) {
		fetchGroups().catch(({ message }) =>
			Modal.error({ title: 'Errore', content: message })
		);
	}

	if (pendings.info === false && pendings.teams === false && pendings.groups === false) {
		return (
			<Row>
				<TeamsWrapper
					tournament={tournament}
					createTeam={createTeam}
					editTeam={editTeam}
					deleteTeam={deleteTeam}
				/>
			</Row>
		);
	} else {
		return <LoadingPage />;
	}
};

Teams.propTypes = {
    tournament: PropTypes.object.isRequired,
    fetchGroups: PropTypes.func.isRequired,
	fetchTeams: PropTypes.func.isRequired,
	createTeam: PropTypes.func.isRequired,
	editTeam: PropTypes.func.isRequired,
	deleteTeam: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, {
    fetchGroups,
	fetchTeams,
	createTeam,
	editTeam,
	deleteTeam
})(Teams);
