import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	editTournament,
	deleteTournament,
	fetchTeams
} from '../../actions/tournamentActions';
import { Row, Col, message, Card } from 'antd';
import TournamentInfoCard from '../Admin/TournamentInfoCard/';
import NextMatchesCard from '../Admin/NextMatchesCard';
import LoadingPage from '../Admin/LoadingPage';

const Dashboard = ({
	tournament,
	editTournament,
	deleteTournament,
	fetchTeams
}) => {
	const { pendings, info, exists } = tournament;

	if (pendings.teams === undefined) {
		fetchTeams().catch(err => message.error(err.message));
	}

	if (pendings.info === false && pendings.teams === false) {
		return (
			<Fragment>
				<Row>
					<Col span={24} lg={14} xl={10}>
						<TournamentInfoCard
							info={info}
							exists={exists}
							deleteTournament={deleteTournament}
							editTournament={editTournament}
						/>
					</Col>
					{exists === true ? (
						<Col span={24} lg={10} xl={8}>
							<NextMatchesCard tournament={tournament} />
						</Col>
					) : null}
					{exists === true ? (
						<Col span={24} xl={6}>
							<Card bordered={true} title="Esporta">
								<a href="http://dev.tronweb.it/tormenta-server/export_matches.php">
									Esporta rapido in csv
								</a>
							</Card>
						</Col>
					) : null}
				</Row>
			</Fragment>
		);
	} else {
		return <LoadingPage />;
	}
};

Dashboard.propTypes = {
	tournament: PropTypes.object.isRequired,
	editTournament: PropTypes.func.isRequired,
	deleteTournament: PropTypes.func.isRequired,
	fetchTeams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, {
	editTournament,
	deleteTournament,
	fetchTeams
})(Dashboard);
