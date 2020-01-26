import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Modal, message, Form } from 'antd';

const TournamentInfo = ({ info, deleteTournament, setEditing }) => (
	<Form
		labelCol={{
			xs: { span: 24 },
			sm: { span: 8 }
		}}
		wrapperCol={{
			xs: { span: 24 },
			sm: { span: 16 }
		}}
	>
		<Form.Item label="Titolo del torneo" style={{ marginBottom: 5 }}>
			<span style={{ padding: 12 }}>{info.title}</span>
		</Form.Item>
		<Form.Item label="Numero di squadre" style={{ marginBottom: 10 }}>
			<span style={{ padding: 12 }}>{info.teams}</span>
		</Form.Item>
		<Row>
			<Col span={24} style={{ textAlign: 'right' }}>
				<Button
					type="primary"
					style={{ marginRight: 10 }}
					onClick={() => setEditing(true)}
				>
					Modifica
				</Button>
				<Button
					type="danger"
					onClick={e =>
						Modal.confirm({
							title: 'Sicuro di voler eliminare questo torneo',
							okText: 'Si',
							okType: 'danger',
							cancelText: 'No',
							onOk() {
								deleteTournament()
									.then(() =>
										message.success(
											'Torneo eliminato con successo'
										)
									)
									.catch(({ message }) =>
										Modal.error({
											title: 'Errore',
											content: message
										})
									);
							}
						})
					}
				>
					Elimina
				</Button>
			</Col>
		</Row>
	</Form>
);

TournamentInfo.propTypes = {
	info: PropTypes.object.isRequired,
	setEditing: PropTypes.func.isRequired,
	deleteTournament: PropTypes.func.isRequired
};

export default TournamentInfo;
