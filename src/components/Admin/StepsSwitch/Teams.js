import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Card, Modal } from 'antd';
import HelpCard from '../HelpCard';
import TeamsTable from '../TeamsTable';
import NewTeamModal from '../NewTeamModal/';

const Teams = ({ nextStep }) => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<Fragment>
			<NewTeamModal
				title="Nuova squadra"
				visible={modalVisible}
				onOk={() => alert('OK')}
				showModal={setModalVisible}
			/>
			<Col span={24} md={10}>
				<TeamsTable />
			</Col>
			<Col span={24} md={4}>
				<Card bordered={true}>
					<Button
						type="primary"
						block
						style={{ marginBottom: 10 }}
						onClick={() => setModalVisible(true)}
					>
						Aggiungi
					</Button>
					<Button
						block
						onClick={() =>
							/*team.length > 0*/ true
								? nextStep()
								: Modal.warning({
										title: 'Errore',
                                        content: 'Devi inserire almeno ' +
                                        'una squadra prima di poter continuare'
								  })
						}
					>
						Avanti
					</Button>
				</Card>
			</Col>
			<Col span={24} md={10}>
				<HelpCard message={'To do'} />
			</Col>
		</Fragment>
	);
};

Teams.propTypes = {
	nextStep: PropTypes.func.isRequired
};

export default Teams;
