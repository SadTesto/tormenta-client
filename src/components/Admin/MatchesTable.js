import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Table, Empty } from 'antd';
import MatchModal from './MatchModal/';

const MatchesTable = ({ matches, teams, loading }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeMatch, setActiveMatch] = useState({ teamA: null, teamB: null });

    return (
        <Fragment>
            <MatchModal
                match={activeMatch}
                showModal={setModalVisible}
                visible={modalVisible}
                onSubmit={(values) => {
                    setModalVisible(false);
                    setActiveMatch({ teamA: null, teamB: null });
                }}
            />
            <Card title="Partite" bordered={true} bodyStyle={{ padding: 0 }}>
                <Table
                    size="small"
                    pagination={{
                        pageSize: 10
                    }}
                    dataSource={matches.map(match => {
                        let teamA = teams.find(({ id }) => id === match.teamA);
                        let teamB = teams.find(({ id }) => id === match.teamB);
                        return {
                            ...match,
                            teamA: teamA ? teamA.name : 'Squadra non trovata',
                            teamB: teamB ? teamB.name : 'Squadra non trovata'
                        };
                    })}
                    columns={[
                        {
                            title: '#',
                            dataIndex: 'key',
                            key: 'key'
                        },
                        {
                            title: 'Squadra A',
                            dataIndex: 'teamA',
                            key: 'teamA'
                        },
                        {
                            render: () => 'vs'
                        },
                        {
                            title: 'Squadra B',
                            dataIndex: 'teamB',
                            key: 'teamB'
                        },
                        {
                            title: 'Azioni',
                            render: (text, record) => (
                                <span>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            setActiveMatch({
                                                teamA: record.teamA,
                                                teamB: record.teamB
                                            });
                                            setModalVisible(true);
                                        }}
                                    >
                                        Risultato
                                    </Button>
                                </span>
                            )
                        }
                    ]}
                    locale={{
                        emptyText: (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="Nessuna squadra trovata"
                            />
                        )
                    }}
                    loading={loading === true}
                />
            </Card>
        </Fragment>
    );
};

MatchesTable.propTypes = {
    matches: PropTypes.array.isRequired,
    teams: PropTypes.array.isRequired,
    loading: PropTypes.bool
};

export default MatchesTable;
