import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const GroupTable = ({ teams }) => (
    <Table 
        dataSource={teams} 
        columns={[
            {
                title: 'Nome',
                dataIndex: 'name',
                key: 'name'
            }
        ]}
    />
);

GroupTable.propTypes = {
    teams: PropTypes.array
};

export default GroupTable;