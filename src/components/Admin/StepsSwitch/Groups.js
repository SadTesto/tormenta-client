import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGroups, generateGroups } from '../../../actions/tournamentActions';
import { Col, Card, Button, Modal, message, Typography } from 'antd';
import HelpCard from '../HelpCard';
import GenGroupCard from '../GenGroupCard/';
import TinyGroupsListCard from '../GroupsListCard/Tiny';

const { Text } = Typography;

const Groups = ({ tournament, fetchGroups, generateGroups, nextStep }) => {
    const { pendings, groups } = tournament;
    
    if (pendings.groups === undefined) {
        fetchGroups().catch(({ message }) => (
            <Modal
                title="Errore"
                content={message}
            />
        ));
    }

	return (
		<Fragment>
			<Col span={24} md={7}>
				{groups.length === 0 ? (
					<GenGroupCard
						onSubmit={values =>
							generateGroups(values.groups)
								.then(() =>
									message.success(
										'Gironi generati con successo'
									)
								)
								.catch(({ message }) =>
									Modal.error({
										title: 'Errore',
										content: message
									})
								)
						}
					/>
				) : (
					<TinyGroupsListCard groups={groups} />
				)}
			</Col>
			<Col span={24} md={7}>
				<Card
					title="Playoff"
					bordered={true}
					bodyStyle={{ textAlign: 'center' }}
				>
					<Text disabled>Coming Soon.</Text>
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
				<HelpCard message={['To do']} />
			</Col>
		</Fragment>
	);
};

Groups.propTypes = {
    tournament: PropTypes.object.isRequired,
    generateGroups: PropTypes.func.isRequired,
    fetchGroups: PropTypes.func.isRequired,
	nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, { fetchGroups, generateGroups })(Groups);
