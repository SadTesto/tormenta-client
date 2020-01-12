import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Modal, message } from 'antd';

const TournamentInfo = ({ info, exists, deleteTournament, loading }) => (
    <Card 
        title="Informazioni" 
        bordered={true}
        loading={loading}
    >
        {exists === true ? (
            <Fragment>
                <Row>
                    <Col 
                        md={8} 
                        xs={24} 
                        className="ant-form-item-label"
                    >
                        <label title="Titolo del torneo">Titolo del torneo</label>
                    </Col>
                    <Col 
                        md={16} 
                        xs={24} 
                        className="ant-form-item-control-wrapper"
                    >
                        <div className="ant-form-item-control">
                            <span className="ant-form-item-children">         
                                {info.title}
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col 
                        md={8} 
                        xs={24} 
                        className="ant-form-item-label"
                    >
                        <label title="Titolo del torneo">Numero di squadre</label>
                    </Col>
                    <Col 
                        md={16} 
                        xs={24} 
                        className="ant-form-item-control-wrapper"
                    >
                        <div className="ant-form-item-control">
                            <span className="ant-form-item-children">         
                                {info.teams}
                            </span>
                        </div>
                    </Col>
                </Row>
                <div style={{ textAlign: 'center' }}>
                    <Button 
                        type="primary" 
                        style={{ marginRight: 10 }}
                        onClick={() => alert('Edit info')}
                    >Modifica</Button>
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
                                            message.success('Torneo eliminato con successo')
                                        )
                                        .catch(({ message }) => (
                                            Modal.error({
                                                title: 'Errore',
                                                content: message
                                            })
                                        ));
                                }
                            })
                        }
                    >Elimina</Button>
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
    info: PropTypes.object.isRequired,
    exists: PropTypes.bool.isRequired,
    deleteTournament: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default TournamentInfo;