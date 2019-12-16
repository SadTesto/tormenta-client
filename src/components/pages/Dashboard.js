import React from 'react';
import { Row, Col, Card, Table } from 'antd';

const Dashboard = () => (
    <Row>
        <Col span={24} md={10}>
            <Card title="Gironi" bordered={true}>
                <p>Content</p>
            </Card>
        </Col>
        <Col span={24} md={4}>
            <Card
                title="Classifica"
                bordered={true}
                bodyStyle={{ padding: 0 }}
            >
                <Table
                    pagination={false}
                    dataSource={[
                        {
                            key: '1',
                            name: 'Dream Team',
                            p: 32
                        },
                        {
                            key: '2',
                            name: 'Another Team',
                            p: 21
                        }
                    ]}
                    columns={[
                        {
                            title: 'Team',
                            dataIndex: 'name',
                            key: 'name'
                        },
                        {
                            title: 'P',
                            dataIndex: 'p',
                            key: 'p'
                        }
                    ]}
                />
            </Card>
        </Col>
        <Col span={24} md={10}>
            <Card title="Playoff" bordered={true}>
                <div className="c1">
                    <div className="team">1</div>
                    <div className="team">2</div>
                    <div className="team">3</div>
                    <div className="team">4</div>
                </div>
                <div className="c2">
                    <div className="block first">1</div>
                    <div className="block">4</div>
                </div>
                <div className="c3">
                    <div className="block">final</div>
                </div>

                <div className="c4">
                    <div className="block">winner</div>
                </div>
            </Card>
        </Col>
    </Row>
);

export default Dashboard;
