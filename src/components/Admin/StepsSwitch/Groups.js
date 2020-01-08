import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateGroups } from '../../../actions/tournamentActions';
import { Col, Card, Button, Modal } from 'antd';
import HelpCard from '../HelpCard';
import GenGroupCard from '../GenGroupCard/';

const Groups = ({ tournament, generateGroups, nextStep }) => (
	<Fragment>
		<Col span={24} md={7}>
            {tournament.groups.length === 0 ? (
                <GenGroupCard 
                    onSubmit={(values, { setSubmitting }) => {
                        generateGroups(values.groups)
                            .catch(({ message }) => 
                                Modal.error({
                                    title: 'Errore',
                                    content: message
                                })
                            )
                            .finally(() => setSubmitting(false));
                    }}
                />
            ) : (
                tournament.groups.map((group, index) => (
                    <b key={index}>{group.name}</b>
                ))
            )}
		</Col>
        <Col span={24} md={7}>
			<Card title="Playoff" bordered={true}>
				Coming Soon.
			</Card>
		</Col>
		<Col span={24} md={4}>
			<Card bordered={true}>
				<Button type="primary" block onClick={nextStep}>
					Fine
				</Button>
			</Card>
		</Col>
		<Col span={24} md={6}>
			<HelpCard
				message={['To do']}
			/>
		</Col>
	</Fragment>
);

Groups.propTypes = {
    generateGroups: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tournament: state.tournament
});

export default connect(mapStateToProps, { generateGroups })(Groups);
