import React, { Fragment, useState } from 'react';
import { Row, Col, Card, Steps, Button } from 'antd';
import TournamentForm from '../Admin/TournamentForm/';
import HelpCard from '../Admin/HelpCard';

const { Step } = Steps;

const NewTournament = () => {
    const [step, setStep] = useState(0);
    const moveOn = () => setStep(step + 1);
    return (
        <Fragment>
            <Row>
                <Col span={24}>
                    <Steps current={step}>
                        <Step title="Informazioni" description="Inserisci le informazioni di base" />
                        <Step title="Squadre" description="Inserisci le squadre" />
                        <Step title="Partite" description="Genera gironi e partite" />
                    </Steps>
                </Col>
            </Row>
            <Row>
                <Col span={24} md={10}>
                    <Card 
                        title="Informazioni" 
                        bordered={true}
                    >
                        <TournamentForm />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <HelpCard
                        message={
                            'Per iniziare inserisci le informazioni di base quali titolo del '+
                            'torneo e numero totale di squadre partecipanti (fonamentale per ' +
                            'poter generare i gironi e le partite del torneo)'
                        }
                    />
                </Col>
            </Row>
            <Button onClick={moveOn}>Next</Button>
        </Fragment>
    );
};

export default NewTournament;