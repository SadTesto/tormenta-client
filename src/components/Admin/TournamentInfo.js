import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Descriptions } from 'antd';

const TournamentInfo = ({ tournament, loading }) => (
    <Card 
        title="Informazioni" 
        bordered={true}
        loading={loading}
    >
        {tournament.id ? (
            <Fragment>
                <Descriptions>
                    <Descriptions.Item label="Titolo">{tournament.title}</Descriptions.Item>
                    <Descriptions.Item label="Squadre">{tournament.teams.length}</Descriptions.Item>
                </Descriptions>
                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" style={{ marginRight: 10 }}>Modifica</Button>
                    <Button type="danger">Elimina</Button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <span style={{ display: 'block', textAlign: 'center', marginBottom: '20px'}}>
                    Nessun torneo trovato
                </span>
                <div style={{ textAlign: 'center' }}>
                    <Link to={{ pathname: '/nuovo' }}>
                        <Button type="primary" block style={{ maxWidth: '200px'}}>
                            Crea nuovo torneo
                        </Button>
                    </Link>
                </div>
            </Fragment>
        )}
    </Card>
);

TournamentInfo.propTypes = {
    tournament: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

export default TournamentInfo;