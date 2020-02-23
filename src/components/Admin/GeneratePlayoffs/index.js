import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generatePlayoffGroups } from '../../../actions/tournamentActions';
import { Col, Card, Tree, message } from 'antd';
import StartTeamsCard from './StartTeamsCard';
import SelectExtraTeamsForm from './SelectExtraTeamsForm';
import GroupsList from '../GroupsList';

const { TreeNode } = Tree;

const GeneratePlayoffsCard = ({ tournament, generatePlayoffGroups }) => {
	const [poTeams, setPoTeams] = useState(null);
	const [fetching, setFetching] = useState(false);

    const { teams, groups } = tournament;
    if (poTeams !== null) {
        return (
            <Fragment>
                <Col span={24} lg={6}>
                    <Card title="Genera Playoff">
                        <p>
                            Squadre selezionate automaticamente in base alla
                            classifica dei singoli gironi:
                        </p>
                        <Tree showLine defaultExpandAll>
                            {Object.keys(poTeams.teams).map(groupID => (
                                <TreeNode
                                    title={groups.find(g => g.id === groupID).name}
                                    key={groupID}
                                >
                                    {poTeams.teams[groupID].map(teamID => (
                                        <TreeNode
                                            title={
                                                teams.find(t => t.id === teamID).name
                                            }
                                            key={teamID}
                                        />
                                    ))}
                                </TreeNode>
                            ))}
                        </Tree>
                        <SelectExtraTeamsForm
                            allTeams={teams}
                            baseTeams={Object.values(poTeams.teams).flat()}
                            required={poTeams.required}
                            onSubmit={values => {
                                setFetching(true);
                                generatePlayoffGroups(poTeams.startNum, values.teams)
                                    .catch(err => {
                                        setFetching(false);
                                        message.error(err.message);
                                    })
                            }}
                            backStage={() => setPoTeams(null)}
                            loading={fetching}
                        />
                    </Card>
                </Col>
                <GroupsList
                    teams={teams}
                    groupsNoPo={groups.filter(g => g.is_po === false)}
                    groupButtons={['ranking']}
                />
            </Fragment>
        );
    } else {
        return (
            <Col span={24} xl={6}>
                <StartTeamsCard setPoTeams={setPoTeams} />
            </Col>
        );
    }
};

GeneratePlayoffsCard.propTypes = {
    tournament: PropTypes.object.isRequired,
    generatePlayoffGroups: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	tournament: state.tournament
});

export default connect(mapStateToProps, { generatePlayoffGroups })(GeneratePlayoffsCard);
