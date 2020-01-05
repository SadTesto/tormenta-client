import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Info from './Info';
import Teams from './Teams';
import Groups from './Groups';

const StepsSwitch = ({ step, nextStep, setLoading }) => {
	if (step === 0) {
		return <Info nextStep={nextStep} setLoading={setLoading} />;
	} else if (step === 1) {
		return <Teams nextStep={nextStep} />;
	} else if (step === 2) {
		return <Groups nextStep={nextStep} />;
	} else {
		return <Redirect to={{ pathname: '/' }} />;
	}
};

StepsSwitch.propTypes = {
	step: PropTypes.number.isRequired,
	nextStep: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired
};

export default StepsSwitch;
