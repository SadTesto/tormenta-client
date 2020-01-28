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
        fetchTeams().catch(err => message.error(err.message))
    }

	if (pendings.info === false && pendings.teams === false) {
		return (
			<Fragment>
				<Row>
					<Col span={24} lg={10}>
						<TournamentInfoCard
							info={info}
							exists={exists}
							deleteTournament={deleteTournament}
							editTournament={editTournament}
						/>
					</Col>
                    {exists === true ? (
                        <Col span={24} lg={8}>
                            <NextMatchesCard tournament={tournament} />
                        </Col>
                    ) : null}
                    {exists === true ? (
                        <Col span={24} lg={6}>
                            <Card bordered={true} title="Esporta">
                                Esporta rapido in csv
                            </Card>
                        </Col>
                    ) : null}
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
