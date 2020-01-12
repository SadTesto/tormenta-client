import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	fetchTeams,
	createTeam,
	editTeam,
	deleteTeam
} from '../../../actions/tournamentActions';
import { Button, Modal } from 'antd';
import TeamsWrapper from '../TeamsWrapper';

const Teams = ({
	tournament,
	fetchTeams,
	createTeam,
	editTeam,
	deleteTeam,
	nextStep
}) => {
	const { info, teams, pendings } = tournament;

	const nextStepCheck = (teamsLen, max) => {
		if (teamsLen < 3) {
			Modal.warn({
				title: 'Attenzione',
				content: 'Devi inserire almeno 3 squadre prima di poter continuare'
			});
		} else if (teamsLen > max) {
			Modal.warn({
				title: 'Attenzione',
				content: 'Numero massimo di squadre raggiunto'
			});
		} else {
			nextStep();
		}
	};

	if (pendings.teams === undefined && teams.length === 0) {
		fetchTeams().catch(({ message }) =>
			Modal.error({
				title: 'Errore',
				content: message
			})
		);
	}

	return (
		<TeamsWrapper
			tournament={tournament}
			createTeam={createTeam}
			editTeam={editTeam}
			deleteTeam={deleteTeam}
			extraButtons={
				<Button
					block
					onClick={() => nextStepCheck(teams.length, info.teams)}
				>
					Avanti
				</Button>
			}
		/>
	);
};

Teams.propTypes = {
	tournament: PropTypes.object.isRequired,
	fetchTeams: PropTypes.func.isRequired,
	createTeam: PropTypes.func.isRequired,
	editTeam: PropTypes.func.isRequired,
	deleteTeam: PropTypes.func.isRequired,
	nextStep: PropTypes.func.isRequired
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
