import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Button, Typography } from 'antd';
import HelpCard from '../HelpCard';
import GenGroupCard from '../GenGroupCard/';

const { Paragraph } = Typography;

const Groups = ({ nextStep }) => (
	<Fragment>
		<Col span={24} md={7}>
			<GenGroupCard />
		</Col>
        <Col span={24} md={7}>
			<Card title="Playoff" bordered={true}>
				Coming Soon.
			</Card>
		</Col>
		<Col span={24} md={4}>
			<Card bordered={true}>
				<Button type="primary" block onClick={nextStep}>
					Fine
				</Button>
			</Card>
		</Col>
		<Col span={24} md={6}>
			<HelpCard
				message={['To do']}
			/>
		</Col>
	</Fragment>
);

Groups.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default Groups;
