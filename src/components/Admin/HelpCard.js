import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Typography, Icon } from 'antd';

const { Paragraph } = Typography;

const HelpCard = ({ message }) => {
    const [hidden, setHidden] = useState(false);
    const hide = () => setHidden(true);
    return hidden ? (
        <Fragment></Fragment>
    ) : (
        <Card 
            title="Aiuto" 
            bordered={true}
            extra={(
                <Button 
                    onClick={hide} 
                    type="link"
                >
                    <Icon type="close" />
                </Button>
            )}
        >
            {message.map(msg => (
                <Paragraph>{msg}</Paragraph>
            ))}
        </Card>
    );
};

HelpCard.propTypes = {
    message: PropTypes.array.isRequired
};

export default HelpCard;