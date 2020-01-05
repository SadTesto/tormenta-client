import React, { Fragment, useState } from 'react';
import { Row, Col, Steps, Icon } from 'antd';
import StepsSwitch from '../Admin/StepsSwitch/';

const { Step } = Steps;

const NewTournament = () => {
	const [step, setStep] = useState(0);
	const [loading, setLoading] = useState(false);
	return (
		<Fragment>
			<Row>
				<Col span={24}>
					<Steps current={step}>
						<Step
							title="Informazioni"
							description="Inserisci le informazioni di base"
							icon={
								loading && step === 0 ? (
									<Icon type="loading" />
								) : null
							}
						/>
						<Step
							title="Squadre"
                            description="Inserisci le squadre"
                            icon={
								loading && step === 1 ? (
									<Icon type="loading" />
								) : null
							}
						/>
						<Step
							title="Partite"
                            description="Genera gironi e partite"
                            icon={
								loading && step === 2 ? (
									<Icon type="loading" />
								) : null
							}
						/>
					</Steps>
				</Col>
			</Row>
			<Row>
				<StepsSwitch
					step={step}
					nextStep={() => setStep(step + 1)}
					setLoading={setLoading}
				/>
			</Row>
		</Fragment>
	);
};

export default NewTournament;
