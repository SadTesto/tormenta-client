import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Result, Button } from 'antd';

const NotFound = () => (
    <Row>
        <Col span={24}>
            <Card bordered={true}>
                <Result
                    status="404"
                    title="404"
                    subTitle="La pagina che stai cercando non esiste o non è più disponibile"
                    extra={(
                        <Link to={{ pathname: '/' }}>
                            <Button type="primary">Dashboard</Button>
                        </Link>
                    )}
                />
            </Card>
        </Col>
    </Row>
);

export default NotFound;