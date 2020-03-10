import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Menu } from 'antd';

const { SubMenu } = Menu;

const GroupsListCard = ({ groups, setActive, action, buttons }) => {
	const [open, setOpen] = useState([]);

	const rootSubmenuKeys = groups.map((g, index) => 'sub' + index);
	const onOpenChange = openKeys => {
		const latestOpenKey = openKeys.find(
			key => openKeys.indexOf(key) === -1
		);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpen(openKeys);
		} else {
			if (latestOpenKey) {
				setOpen([latestOpenKey]);
			} else {
				setOpen([]);
			}
		}
	};

	return (
		<Card
			title="Gironi"
			bordered={true}
			bodyStyle={{ padding: 0, paddingTop: 1 }}
		>
			<Menu
				mode="inline"
				openKeys={open}
				onOpenChange={onOpenChange}
				style={{ border: 'none' }}
			>
				{groups.map((group, index) => (
					<SubMenu title={group.name} key={'sub' + index}>
                        {buttons.includes('edit') ? (
							<Menu.Item
								key="1"
								onClick={() =>
									setActive({
										...group,
										fetched: false,
										action: 'edit'
									})
								}
							>
								Modifica
							</Menu.Item>
						) : null}
						{buttons.includes('ranking') ? (
							<Menu.Item
								key="2"
								onClick={() =>
									setActive({
										...group,
										fetched: false,
										action: 'get_ranking'
									})
								}
							>
								Visualizza Classifica
							</Menu.Item>
						) : null}
						{buttons.includes('matches') ? (
							<Menu.Item
								key="3"
								onClick={() =>
									setActive({
										...group,
										fetched: false,
										action: 'get_matches'
									})
								}
							>
								Visualizza Partite
							</Menu.Item>
						) : null}
					</SubMenu>
				))}
			</Menu>
		</Card>
	);
};

GroupsListCard.propTypes = {
	groups: PropTypes.array.isRequired,
	setActive: PropTypes.func.isRequired,
	action: PropTypes.string,
	buttons: PropTypes.array.isRequired
};

export default GroupsListCard;
