import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { Card, Table, Button } from 'antd';

const TeamsTable = () => {
	const columns = [
		{
			title: '#',
            dataIndex: 'number'
		},
		{
			title: 'Nome',
            dataIndex: 'name'
		},
		{
			title: 'Azioni',
            dataIndex: 'actions',
            render: () => (
                <Fragment>
                    <Button type="link">Modifica</Button>
                    <Button type="link">Elimina</Button>
                </Fragment>
            )
		}
	];
	const data = [
		{
			key: '1',
			number: 1,
			name: 'John Brown'
		},
		{
			key: '2',
			number: 2,
			name: 'Jim Green'
		},
		{
			key: '3',
			number: 3,
			name: 'Joe Black'
		},
		{
			key: '4',
			number: 4,
			name: 'Joe Black'
		},
		{
			key: '5',
			number: 5,
			name: 'Joe Black'
		},
		{
			key: '6',
			number: 6,
			name: 'Joe Black'
		},
		{
			key: '7',
			number: 7,
			name: 'Joe Black'
		},
		{
			key: '8',
			number: 8,
			name: 'Joe Black'
		},
		{
			key: '9',
			number: 9,
			name: 'Joe Black'
		},
		{
			key: '10',
			number: 10,
			name: 'Joe Black'
		},
		{
			key: '11',
			number: 11,
			name: 'Joe Black'
		},
		{
			key: '12',
			number: 12,
			name: 'Joe Black'
		},
		{
			key: '13',
			number: 13,
			name: 'Joe Black'
		},
		{
			key: '14',
			number: 14,
			name: 'Joe Black'
		},
		{
			key: '15',
			number: 15,
			name: 'Joe Black'
		},
		{
			key: '16',
			number: 16,
			name: 'Joe Black'
		},
		{
			key: '17',
			number: 17,
			name: 'Joe Black'
		},
		{
			key: '18',
			number: 18,
			name: 'Joe Black'
		},
		{
			key: '19',
			number: 19,
			name: 'Joe Black'
		},
		{
			key: '20',
			number: 20,
			name: 'Joe Black'
		},
		{
			key: '21',
			number: 21,
			name: 'Joe Black'
		},
		{
			key: '22',
			number: 22,
			name: 'Joe Black'
		},
		{
			key: '23',
			number: 23,
			name: 'Joe Black'
		},
		{
			key: '24',
			number: 24,
			name: 'Joe Black'
		},
		{
			key: '25',
			number: 25,
			name: 'Joe Black'
		},
		{
			key: '26',
			number: 26,
			name: 'Joe Black'
		},
		{
			key: '27',
			number: 27,
			name: 'Joe Black'
		},
		{
			key: '28',
			number: 28,
			name: 'Joe Black'
		},
		{
			key: '29',
			number: 29,
			name: 'Joe Black'
		},
		{
			key: '30',
			number: 30,
			name: 'Joe Black'
		},
		{
			key: '31',
			number: 31,
			name: 'Joe Black'
		},
		{
			key: '32',
			number: 32,
			name: 'Joe Black'
		},
		{
			key: '33',
			number: 33,
			name: 'Joe Black'
		},
		{
			key: '34',
			number: 34,
			name: 'Joe Black'
		},
		{
			key: '35',
			number: 35,
			name: 'Joe Black'
		},
		{
			key: '36',
			number: 36,
			name: 'Joe Black'
		},
		{
			key: '37',
			number: 37,
			name: 'Joe Black'
		},
		{
			key: '38',
			number: 38,
			name: 'Joe Black'
		},
		{
			key: '39',
			number: 39,
			name: 'Joe Black'
		},
		{
			key: '40',
			number: 40,
			name: 'Joe Black'
		}
	];

	return (
        <Card 
            title="Squadre" 
            bordered={true}
            bodyStyle={{ padding: 0 }}
        >
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

TeamsTable.propTypes = {};

export default TeamsTable;