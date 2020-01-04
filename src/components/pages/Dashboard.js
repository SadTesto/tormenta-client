import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import TournamentInfo from '../Admin/TournamentInfo';

const Dashboard = ({ tournament }) => {
    return (
        <Fragment>
            <Row>
                <Col span={24} md={10}>
                    <TournamentInfo
                        tournament={tournament}
                        loading={tournament.pendings.info === true}
                    />
                </Col>
                {/* <Col span={24} md={10}>
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
                </Col> */}
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
