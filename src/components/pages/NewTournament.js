import React, { Fragment, useState } from 'react';
import { Row, Col, Steps } from 'antd';
import StepsSwitch from '../Admin/StepsSwitch/';

const { Step } = Steps;

const NewTournament = () => {
    const [step, setStep] = useState(0);
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
                <StepsSwitch step={step} nextStep={() => setStep(step + 1)} />
            </Row>
        </Fragment>
    );
};

export default NewTournament;