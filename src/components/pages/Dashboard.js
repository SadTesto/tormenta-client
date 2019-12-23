import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Card, Alert } from 'antd';
import TournamentInfo from '../Admin/TournamentInfo';

const Dashboard = ({ tournament }) => {
    const [error, setError] = useState(null);
    return (
        <Fragment>
            {error ? (
                <Row>
                    <Col span={24}>
                        <Alert
                            message="Errore"
                            description={error}
                            type="error"
                            showIcon
                        />
                    </Col>
                </Row>
            ) : null}
            <Row>
                <Col span={24} md={10}>
                    <TournamentInfo
                        tournament={tournament}
                        setError={setError}
                    />
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
        </Fragment>
    );
};

Dashboard.propTypes = {
    tournament: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tournament: state.tournament
});

export default connect(mapStateToProps)(Dashboard);
