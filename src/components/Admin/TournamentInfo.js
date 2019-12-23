import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Descriptions } from 'antd';

const TournamentInfo = ({ tournament }) => (
    <Card 
        title="Torneo" 
        bordered={true}
    >
        {tournament.id ? (
            <Fragment>
                <Descriptions title="User Info">
                    <Descriptions.Item label="Titolo">{tournament.title}</Descriptions.Item>
                    <Descriptions.Item label="Squadre">{tournament.teams.length}</Descriptions.Item>
                </Descriptions>
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" style={{ marginRight: 10 }}>Modifica</Button>
                    <Button type="danger">Elimina</Button>
                </div>
            </Fragment>
        ) : "Nessun torneo trovato"}
    </Card>
);

TournamentInfo.propTypes = {
    tournament: PropTypes.object.isRequired
};

export default TournamentInfo;