import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGroups, fetchTeams } from '../../actions/tournamentActions';
import { Row, Col, Card, message } from 'antd';
import MatchModal from '../Admin/MatchModal/';
import BracketScheme from '../Admin/BracketScheme/';
import GeneratePlayoffs from '../Admin/GeneratePlayoffs';
import LoadingPage from '../Admin/LoadingPage';

const PlayOffs = ({ tournament, fetchGroups, fetchTeams }) => {
	const { pendings, groups } = tournament;

	const [modalVisible, setModalVisible] = useState(false);
	const [activeMatch, setActiveMatch] = useState({
		id: null,
		teamA: null,
		teamB: null
	});

	if (pendings.groups === undefined) {
		fetchGroups().catch(err =>
			message.error({ title: 'Errore', content: err.message })
		);
	}
	if (pendings.groups === undefined) {
		fetchTeams().catch(err =>
			message.error({ title: 'Errore', content: err.message })
		);
    }

	if (pendings.info === false && pendings.groups === false && pendings.groups === false) {
        const playoffGroups = groups.filter(({ is_po }) => is_po);

		return (
			<Row>
				<MatchModal
					match={activeMatch}
					visible={modalVisible}
					showModal={setModalVisible}
					onSubmit={values => {
						setModalVisible(false);
					}}
				/>
                {playoffGroups.length > 0 ? (
                    <Col span={24} lg={20}>
                        <Card
                            bordered={true}
                            title="Tabellone"
                            className="card-bracket"
                        >
                            <div className="bracket-wrapper">
                                <BracketScheme
                                    setMatch={match => {
                                        setActiveMatch(match);
                                        setModalVisible(true);
                                    }}
                                    groups={playoffGroups}
                                />
                            </div>
                        </Card>
                    </Col>
                ) : (
                    <GeneratePlayoffs />
                )}
			</Row>
		);
	} else {
		return <LoadingPage />;
	}
};

PlayOffs.propTypes = {
	tournament: PropTypes.object.isRequired,
	fetchGroups: PropTypes.func.isRequired,
	fetchTeams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, { fetchGroups, fetchTeams })(PlayOffs);
