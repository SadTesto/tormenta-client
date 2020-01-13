import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateGroups } from '../../../actions/tournamentActions';
import { Col, Card, Button, Modal, Typography } from 'antd';
import HelpCard from '../HelpCard';
import GenGroupCard from '../GenGroupCard/';
import GroupsListCard from '../GroupsListCard';

const { Text } = Typography;

const Groups = ({ tournament, generateGroups, nextStep }) => {
    const { groups } = tournament;

    return (
        <Fragment>
            <Col span={24} md={7}>
                {groups.length === 0 ? (
                    <GenGroupCard 
                        onSubmit={(values) =>
                            generateGroups(values.groups)
                                .catch(({ message }) => 
                                    Modal.error({
                                        title: 'Errore',
                                        content: message
                                    })
                                )
                        }
                    />
                ) : (
                    <GroupsListCard
                        groups={groups}
                        setActive={() => null}
                    />
                )}
            </Col>
            <Col span={24} md={7}>
                <Card title="Playoff" bordered={true} bodyStyle={{ textAlign: 'center' }}>
                    <Text disabled>Coming Soon.</Text>
                </Card>
            </Col>
            <Col span={24} md={4}>
                <Card bordered={true}>
                    <Button type="primary" block onClick={nextStep}>
                        Fine
                    </Button>
                </Card>
            </Col>
            <Col span={24} md={6}>
                <HelpCard
                    message={['To do']}
                />
            </Col>
        </Fragment>
    );
};

Groups.propTypes = {
    generateGroups: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tournament: state.tournament
});

export default connect(mapStateToProps, { generateGroups })(Groups);
