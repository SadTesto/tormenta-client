import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	fetchTeams,
	createTeam,
	editTeam,
	deleteTeam
} from '../../actions/tournamentActions';
import { Row, Modal } from 'antd';
import TeamsWrapper from '../Admin/TeamsWrapper';

const Teams = ({
	tournament,
	fetchTeams,
	createTeam,
	editTeam,
	deleteTeam
}) => {
	if (tournament.pendings.teams === undefined) {
		fetchTeams().catch(({ message }) =>
			Modal.error({ title: 'Errore', content: message })
		);
	}

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
