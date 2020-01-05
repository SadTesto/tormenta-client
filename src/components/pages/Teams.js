import React from 'react';
import { Row, Col, Card } from 'antd';
import TeamsTable from '../Admin/TeamsTable';

const Teams = () => (
    <Row>
        <Col span={24} md={16}>
            <TeamsTable
                editTeam={team => {
                    alert('Edit team ' + team.name);
                }}
                deleteTeam={teamId => {
                    alert('Delete team ' + teamId);
                }}
            />
        </Col>
        <Col span={24} md={8}>
            <Card bordered={true}>
                Pagina in costruzione.
            </Card>
        </Col>
    </Row>
);

export default Teams;