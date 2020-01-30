import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGroups, fetchTeams } from '../../actions/tournamentActions';
import { Row, Col, Card, Modal, Alert } from 'antd';
import MatchModal from '../Admin/MatchModal/';
import BracketScheme from '../Admin/BracketScheme/';

const PlayOffs = ({ tournament, fetchGroups, fetchTeams }) => {
	const { pendings } = tournament;

	const [modalVisible, setModalVisible] = useState(false);
	const [activeMatch, setActiveMatch] = useState({
		id: null,
		teamA: null,
		teamB: null
	});

	if (pendings.groups === undefined) {
		fetchGroups().catch(({ message }) =>
			Modal.error({ title: 'Errore', content: message })
		);
	}
	if (pendings.groups === undefined) {
		fetchTeams().catch(({ message }) =>
			Modal.error({ title: 'Errore', content: message })
		);
	}

	return (
		<Row>
			<Col span={24}>
				<Alert
                    type="error"
                    showIcon={true}
                    message="Attenzione"
					description="Questa pagina e' attualmente sotto sviluppo quindi potrebbe non funzionare correttamente"
				/>
			</Col>
			<MatchModal
				match={activeMatch}
				visible={modalVisible}
				showModal={setModalVisible}
				onSubmit={values => {
					console.log(values);
					setModalVisible(false);
				}}
			/>
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
						/>
					</div>
				</Card>
			</Col>
		</Row>
	);
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
