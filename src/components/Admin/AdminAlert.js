import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert } from 'antd';

const AdminAlert = ({ display = true, title, message, type }) => 
    display === true ? (
        <Row>
            <Col span={24}>
                <Alert
                    message={title}
                    description={message}
                    type={type}
                    showIcon
                />
            </Col>
        </Row>
    ) : null;

AdminAlert.propTypes = {
    display: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string.isRequired
};

export default AdminAlert;