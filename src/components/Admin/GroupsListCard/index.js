import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, Collapse } from 'antd';

const { Panel } = Collapse;

const GroupsListCard = ({ groups, setActive, action, buttons }) => (
	<Card
		title="Gironi"
		bordered={true}
		bodyStyle={{ padding: 0, paddingTop: 1 }}
	>
		<Collapse style={{ border: 'none' }}>
			{groups.map((group, index) => (
				<Panel header={group.name} key={index}>
					<Row>
                        {buttons.includes('ranking') ? (
                            <Col span={24} xxl={buttons.length > 1 ? 12 : 24}>
                                <Button
                                    type={
                                        group.active && action === 'get_ranking'
                                            ? 'primary'
                                            : 'default'
                                    }
                                    block
                                    onClick={() =>
                                        setActive({
                                            ...group,
                                            fetched: false,
                                            action: 'get_ranking'
                                        })
                                    }
                                >
                                    Visualizza classifica
                                </Button>
                            </Col>
                        ) : null}
                        {buttons.includes('matches') ? (
                            <Col span={24} xxl={buttons.length > 1 ? 12 : 24}>
                                <Button
                                    type={
                                        group.active && action === 'get_matches'
                                            ? 'primary'
                                            : 'default'
                                    }
                                    block
                                    onClick={() =>
                                        setActive({
                                            ...group,
                                            fetched: false,
                                            action: 'get_matches'
                                        })
                                    }
                                >
                                    Visualizza Partite
                                </Button>
                            </Col>
                        ) : null}
					</Row>
				</Panel>
			))}
		</Collapse>
	</Card>
);

GroupsListCard.propTypes = {
	groups: PropTypes.array.isRequired,
	setActive: PropTypes.func.isRequired,
	action: PropTypes.string,
	buttons: PropTypes.array.isRequired
};

export default GroupsListCard;
