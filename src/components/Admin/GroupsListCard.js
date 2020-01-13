import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Icon, Empty, Card } from 'antd';

const GroupsListCard = ({ groups, setActive }) => (
    <Card title="Gironi" bordered={true} bodyStyle={{ padding: '0 10px' }}>
        <List
            dataSource={groups}
            renderItem={group => (
                <List.Item
                    actions={[
                        <Button 
                            type="link" 
                            block 
                            onClick={() => setActive(group)}
                            style={group.active === true ? { color: '#fff' } : null}
                        >
                            Vedi
                            <Icon type="right" />
                        </Button>
                    ]}
                    style={{
                        paddingLeft: 20,
                        backgroundColor: group.active === true ? '#188fff' : 'transparent',
                        color: group.active === true ? '#fff' : '#000'
                    }}
                >
                    {group.name}
                </List.Item>
            )}
            locale={{
                emptyText: (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Nessun girone trovato"
                    />
                )
            }}
        />
    </Card>
);

GroupsListCard.propTypes = {
	groups: PropTypes.array.isRequired,
	setActive: PropTypes.func.isRequired
};

export default GroupsListCard;
