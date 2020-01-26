import React from 'react';
import { Row, Col, Card, Typography } from 'antd';

const { Text } = Typography;

const Settings = () => (
	<Row>
		<Col span={24} md={9}>
			<Card title='Impostazioni sito' bordered={true} bodyStyle={{ textAlign: 'center' }}>
				<Text disabled>Coming Soon</Text>
			</Card>
		</Col>
	</Row>
);

export default Settings;
