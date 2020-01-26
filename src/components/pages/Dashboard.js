import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	editTournament,
	deleteTournament
} from '../../actions/tournamentActions';
import { Row, Col } from 'antd';
import TournamentInfoCard from '../Admin/TournamentInfoCard/';
import LoadingPage from '../Admin/LoadingPage';

const Dashboard = ({ tournament, editTournament, deleteTournament }) => {
    const { pendings, info, exists } = tournament;

	if (pendings.info === false) {
		return (
			<Fragment>
				<Row>
					<Col span={24} md={10}>
						<TournamentInfoCard
							info={info}
							exists={exists}
							deleteTournament={deleteTournament}
							editTournament={editTournament}
						/>
					</Col>
					{/* <Col span={24} md={10}>
						<Card title="Playoff" bordered={true}>
							<div className="c1">
								<div className="team">1</div>
								<div className="team">2</div>
								<div className="team">3</div>
								<div className="team">4</div>
							</div>
							<div className="c2">
								<div className="block first">1</div>
								<div className="block">4</div>
							</div>
							<div className="c3">
								<div className="block">final</div>
							</div>

							<div className="c4">
								<div className="block">winner</div>
							</div>
						</Card>
					</Col> */}
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
	deleteTournament: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, { editTournament, deleteTournament })(
	Dashboard
);
