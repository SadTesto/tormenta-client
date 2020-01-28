import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const TinyGroupsListCard = ({ groups }) => (
	<Card
		title="Gironi"
		bordered={true}
		bodyStyle={{ padding: 0 }}
	>
        <ul style={{ marginTop: 20 }}>
            {groups.map(group => <li>{group.name}</li>)}
        </ul>
	</Card>
);

TinyGroupsListCard.propTypes = {
	groups: PropTypes.array.isRequired
};

export default TinyGroupsListCard;
