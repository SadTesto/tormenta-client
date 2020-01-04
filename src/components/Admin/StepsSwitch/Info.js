import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Card } from 'antd';
import TournamentForm from '../TournamentForm/';
import HelpCard from '../HelpCard';

const Info = ({ nextStep }) => (
	<Fragment>
		<Col span={24} md={10}>
			<Card title="Informazioni" bordered={true}>
				<TournamentForm afterSubmit={nextStep} />
			</Card>
		</Col>
		<Col span={24} md={10}>
			<HelpCard
				message={
					'Per iniziare inserisci le informazioni di base quali titolo del ' +
					'torneo e numero totale di squadre partecipanti (fonamentale per ' +
					'poter generare i gironi e le partite del torneo).' +
					"Non preoccuparti dell'identificativo del toreo, verra' generato " +
					'in un secondo momento.'
				}
			/>
		</Col>
	</Fragment>
);

Info.propTypes = {
    nextStep: PropTypes.func.isRequired
};

export default Info;
