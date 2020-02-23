import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Form, Button, Select, Icon } from 'antd';

const { Option } = Select;

const SelectExtraTeamsForm = ({
	allTeams,
	baseTeams,
	required,
	loading,
	backStage,
	onSubmit
}) => (
	<Fragment>
        {required > 0 ? (
            <p style={{ margin: '1rem 0 0.5rem 0' }}>
                Seleziona {required} {required > 1 ? 'squadre' : 'squadra'} da
                aggiungere a quelle già selezionate automaticamente
            </p>
        ) : (
            <p style={{ margin: 0, marginTop: '1rem' }}>
                Nessuna squadra da aggiungere a quelle già selezionate automaticamente
            </p>
        )}
		<Formik
			initialValues={{ teams: [] }}
			validateOnChange={true}
			validate={values => {
				const errors = {};
				if (values.teams && values.teams.length > required) {
					errors.teams = 'Hai selezionato troppe squadre';
				}
				return errors;
			}}
			onSubmit={onSubmit}
		>
			{({ values, errors, setFieldValue, handleSubmit }) => (
				<Form onSubmit={handleSubmit}>
                    {required > 0 ? (
                        <Form.Item
                            style={{ marginBottom: '1rem' }}
                            validateStatus={errors.teams ? 'error' : 'validating'}
                            hasFeedback={errors.teams !== undefined}
                            help={errors.teams}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Seleziona le squadre"
                                value={values.teams}
                                onChange={val => setFieldValue('teams', val)}
                            >
                                {allTeams
                                    .filter(({ id }) => !baseTeams.includes(id))
                                    .map(team => (
                                        <Option value={team.id} key={team.id}>
                                            {team.name}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    ) : null}
					<Form.Item style={{ marginBottom: 0 }}>
						<Button
							type="link"
							htmlType="button"
							style={{ marginLeft: -20 }}
							onClick={backStage}
						>
							<Icon type="left" />
							Indietro
						</Button>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
							style={{ float: 'right' }}
						>
							Genera
						</Button>
					</Form.Item>
				</Form>
			)}
		</Formik>
	</Fragment>
);

SelectExtraTeamsForm.propTypes = {
	allTeams: PropTypes.array.isRequired,
	baseTeams: PropTypes.array.isRequired,
	required: PropTypes.number.isRequired,
	backStage: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default SelectExtraTeamsForm;
