import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Button, Divider, Popconfirm } from 'antd';

const TeamsTable = ({ editTeam, deleteTeam }) => {
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
	const data = [
		{
			key: '1',
			id: 1,
			name: 'John Brown'
		},
		{
			key: '2',
			id: 2,
			name: 'Jim Green'
		},
		{
			key: '3',
			id: 3,
			name: 'Joe Black'
		},
		{
			key: '4',
			id: 4,
			name: 'Joe Black'
		},
		{
			key: '5',
			id: 5,
			name: 'Joe Black'
		},
		{
			key: '6',
			id: 6,
			name: 'Joe Black'
		},
		{
			key: '7',
			id: 7,
			name: 'Joe Black'
		},
		{
			key: '8',
			id: 8,
			name: 'Joe Black'
		},
		{
			key: '9',
			id: 9,
			name: 'Joe Black'
		},
		{
			key: '10',
			id: 10,
			name: 'Joe Black'
		},
		{
			key: '11',
			id: 11,
			name: 'Joe Black'
		},
		{
			key: '12',
			id: 12,
			name: 'Joe Black'
		},
		{
			key: '13',
			id: 13,
			name: 'Joe Black'
		},
		{
			key: '14',
			id: 14,
			name: 'Joe Black'
		},
		{
			key: '15',
			id: 15,
			name: 'Joe Black'
		},
		{
			key: '16',
			id: 16,
			name: 'Joe Black'
		},
		{
			key: '17',
			id: 17,
			name: 'Joe Black'
		},
		{
			key: '18',
			id: 18,
			name: 'Joe Black'
		},
		{
			key: '19',
			id: 19,
			name: 'Joe Black'
		},
		{
			key: '20',
			id: 20,
			name: 'Joe Black'
		},
		{
			key: '21',
			id: 21,
			name: 'Joe Black'
		},
		{
			key: '22',
			id: 22,
			name: 'Joe Black'
		},
		{
			key: '23',
			id: 23,
			name: 'Joe Black'
		},
		{
			key: '24',
			id: 24,
			name: 'Joe Black'
		},
		{
			key: '25',
			id: 25,
			name: 'Joe Black'
		},
		{
			key: '26',
			id: 26,
			name: 'Joe Black'
		},
		{
			key: '27',
			id: 27,
			name: 'Joe Black'
		},
		{
			key: '28',
			id: 28,
			name: 'Joe Black'
		},
		{
			key: '29',
			id: 29,
			name: 'Joe Black'
		},
		{
			key: '30',
			id: 30,
			name: 'Joe Black'
		},
		{
			key: '31',
			id: 31,
			name: 'Joe Black'
		},
		{
			key: '32',
			id: 32,
			name: 'Joe Black'
		},
		{
			key: '33',
			id: 33,
			name: 'Joe Black'
		},
		{
			key: '34',
			id: 34,
			name: 'Joe Black'
		},
		{
			key: '35',
			id: 35,
			name: 'Joe Black'
		},
		{
			key: '36',
			id: 36,
			name: 'Joe Black'
		},
		{
			key: '37',
			id: 37,
			name: 'Joe Black'
		},
		{
			key: '38',
			id: 38,
			name: 'Joe Black'
		},
		{
			key: '39',
			id: 39,
			name: 'Joe Black'
		},
		{
			key: '40',
			id: 40,
			name: 'Joe Black'
		}
	];

	return (
		<Card title="Squadre" bordered={true} bodyStyle={{ padding: 0 }}>
			<Table
				columns={columns}
				dataSource={data}
				pagination={{
					pageSize: 5
				}}
				size="small"
			/>
		</Card>
	);
};

TeamsTable.propTypes = {
	editTeam: PropTypes.func.isRequired,
	deleteTeam: PropTypes.func.isRequired
};

export default TeamsTable;
