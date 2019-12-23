import React from 'react';
import { Row, Col, Card } from 'antd';

const NotFound = () => (
    <Row>
        <Col span={24}>
            <Card title="Pagina non trovata" bordered={true}>
                <p>La pagina che stai cercando non esiste o non è più disponibile</p>
            </Card>
        </Col>
    </Row>
);

export default NotFound;