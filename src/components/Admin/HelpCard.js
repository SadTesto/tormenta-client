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
            <Paragraph>
                Per iniziare inserisci le informazioni di base quali titolo del 
                torneo e numero totale di squadre partecipanti (fonamentale per 
                poter generare i gironi e le partite del torneo)
            </Paragraph>
        </Card>
    );
};

HelpCard.propTypes = {
    message: PropTypes.string.isRequired
};

export default HelpCard;