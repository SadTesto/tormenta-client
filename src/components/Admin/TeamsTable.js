import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Button, Divider, Popconfirm, Empty } from 'antd';

const TeamsTable = ({ teams, editTeam, deleteTeam, loading }) => {
	const columns = [
		{
			title: '#',
			dataIndex: 'id'
		},
		{
			title: 'Nome',
			dataIndex: 'name'
		},
		{
			title: 'Azioni',
			dataIndex: 'actions',
			render: (text, record) => (
				<span>
					<Button
						type="link"
						onClick={() =>
							editTeam({
								id: record.id,
								name: record.name
							})
						}
					>
						Modifica
					</Button>
					<Divider type="vertical" />
					<Popconfirm
						title="Confermi?"
						okText="Si"
						cancelText="No"
						onConfirm={() => deleteTeam(record.id)}
					>
						<Button type="link">Elimina</Button>
					</Popconfirm>
				</span>
			)
		}
	];

	return (
		<Card title="Squadre" bordered={true} bodyStyle={{ padding: 0 }}>
			<Table
				columns={columns}
				dataSource={teams}
				pagination={{
					pageSize: 5
				}}
				size="small"
				locale={{
					emptyText: (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description="Nessuna squadra trovata"
						/>
					)
                }}
                loading={loading === true}
			/>
		</Card>
	);
};

TeamsTable.propTypes = {
	teams: PropTypes.array.isRequired,
	editTeam: PropTypes.func.isRequired,
    deleteTeam: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default TeamsTable;
