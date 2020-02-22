import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Modal } from 'antd';
import TournamentForm from '../TournamentForm';
import TournamentInfo from './TournamentInfo';

const TournamentInfoCard = ({ info, exists, editTournament, deleteTournament }) => {
    const [editing, setEditing] = useState(false);

    return (
        <Card 
            title="Informazioni" 
            bordered={true}
        >
            {exists === true ? (
                <Fragment>
                    {editing === true ? (
                        <TournamentForm
                            info={info}
                            handleSubmit={(values, { setSubmitting }) => {
                                editTournament(values.title, values.teams)
                                    .then(() => {
                                        setSubmitting(false);
                                        setEditing(false);
                                    })
                                    .catch(({ message }) => {
                                        setSubmitting(false);
                                        Modal.error({
                                            title: 'Errore nel modificare le informazioni',
                                            content: message
                                        });
                                    });
                            }}
                            buttons={[
                                {
                                    htmlType: 'submit',
                                    type: 'primary',
                                    text: 'Salva'
                                },
                                {
                                    onClick: () => setEditing(false),
                                    htmlType: 'button',
                                    text: 'Annulla'
                                }
                            ]}
                        />
                    ) : (
                        <TournamentInfo 
                            info={info} 
                            exists={exists}
                            setEditing={setEditing} 
                            deleteTournament={deleteTournament}
                            editTournament={editTournament}
                        />
                    )}
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
};

TournamentInfo.propTypes = {
    info: PropTypes.object.isRequired,
    exists: PropTypes.bool.isRequired,
    editTournament: PropTypes.func.isRequired,
    deleteTournament: PropTypes.func.isRequired
};

export default TournamentInfoCard;