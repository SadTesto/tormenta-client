import React from 'react';
import { Row, Col, Card, Descriptions } from 'antd';

const Settings = () => (
	<Row>
		<Col span={24} md={9}>
			<Card title='Impostazioni sito' bordered={true}>
				<p>Content</p>
			</Card>
		</Col>
		<Col span={24} md={9}>
			<Card title='Impostazioni utente' bordered={true}>
				<p>Content</p>
			</Card>
		</Col>
		<Col span={24} md={6}>
			<Card title='Info e versione' bordered={true}>
				<Descriptions>
					<Descriptions.Item label='Versione' span={3}>
						Alpha 0.0.1
					</Descriptions.Item>
					<Descriptions.Item label='PHP' span={3}>
						Nessuna presenza
					</Descriptions.Item>
				</Descriptions>
			</Card>
		</Col>
	</Row>
);

export default Settings;
