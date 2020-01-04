import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Button, Typography } from 'antd';
import HelpCard from '../HelpCard';

const { Paragraph } = Typography;

const Groups = ({ nextStep }) => (
	<Fragment>
		<Col span={24} md={10}>
			<Card title="Partite e gironi" bordered={true}>
				Coming Soon.
			</Card>
		</Col>
		<Col span={24} md={4}>
			<Card bordered={true}>
				<Paragraph>
					Il torneo e' gia' stato creato, questa pagina e' solo un
					sommario. Se pensi di aver fatto qualche errore potrai
					comunque modificare le squadre o il nome del torneo dalle
					apposite sezioni.
				</Paragraph>
				<Button type="primary" block onClick={nextStep}>
					Conferma
				</Button>
			</Card>
		</Col>
		<Col span={24} md={10}>
			<HelpCard
				message={'To do'}
			/>
		</Col>
	</Fragment>
);

Groups.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default Groups;
