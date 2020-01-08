import {
	FETCH_TOURNAMENT_INFO,
	TOURNAMENT_INFO_FETCHED,
	TOURNAMENT_NOT_FOUND,
	ERROR_IN_TOURNAMENT_INFO_FETCH,
	CREATE_INFO_PENDING,
	INFO_CREATED,
    ERROR_IN_INFO_CREATE,
    FETCH_TOURNAMENT_TEAMS,
    TOURNAMENT_TEAMS_FETCHED,
    ERROR_IN_TOURNAMENT_TEAMS_FETCH,
    CREATE_TEAM_PENDING,
    TEAM_CREATED,
    ERROR_IN_TEAM_CREATE,
    EDIT_TEAM_PENDING,
    TEAM_EDITED,
    ERROR_IN_TEAM_EDIT,
    DELETE_TEAM_PENDING,
    TEAM_DELETED,
    ERROR_IN_TEAM_DELETE,
    FETCH_TOURNAMENT_GROUPS,
    TORUNAMENT_GROUPS_FETCHED,
    ERROR_IN_TOURNAMENT_GROUPS_FETCH,
    GENERATE_TOURNAMENT_GROUP_PENDING,
    TOURNAMENT_GROUP_GENERATED,
    ERROR_IN_GENERATE_TOURNAMENT_GROUPS
} from './types';
import store from '../store';
import axios from 'axios';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const API_URL = 'http://dev.tronweb.it/tormenta-server';

export const fetchInfo = () => dispatch => {
	dispatch({
		type: FETCH_TOURNAMENT_INFO,
		payload: 'info'
	});

	return new Promise((resolve, reject) =>
		axios
			.get(`${API_URL}/get_tournament.php`)
			.then(({ data }) => {
				if (data.code === 1) {
					dispatch({
						type: TOURNAMENT_INFO_FETCHED,
						payload: data.tournament
					});
					resolve();
				} else {
					throw new Error(data.message || 'Errore sconosciuto');
				}
			})
			.catch(err => {
				const { response } = err;
				if (response && response.data && response.data.message) {
					const { data } = response;
					if (data && data.message) {
						err.message = data.message;
						if (data.code === 0) {
							dispatch({
								type: TOURNAMENT_NOT_FOUND,
								payload: { id: null, title: null }
							});
							resolve();
						}
					}
				}
				dispatch({
					type: ERROR_IN_TOURNAMENT_INFO_FETCH,
					payload: 'info'
				});
				reject(err);
			})
	);
};

export const createInfo = (title, teams) => dispatch => {
	dispatch({
		type: CREATE_INFO_PENDING,
		payload: 'create_info'
	});

	return new Promise((resolve, reject) =>
		axios
			.post(`${API_URL}/new_tournament.php`, {
				title,
				teams
			})
			.then(({ data }) => {
				if (data.code === 1) {
					dispatch({
						type: INFO_CREATED,
						payload: data.tournament
					});
					resolve();
				} else {
					throw new Error(data.message || 'Errore sconosciuto');
				}
			})
			.catch(err => {
				const { response } = err;
				if (response && response.data && response.data.message) {
					err.message = response.data.message;
				}
				dispatch({
					type: ERROR_IN_INFO_CREATE,
					payload: 'create_info'
				});
				reject(err);
			})
	);
};

export const fetchTeams = () => dispatch => {
    dispatch({
        type: FETCH_TOURNAMENT_TEAMS,
        payload: 'teams'
    });

    return new Promise((resolve, reject) => 
        axios.get(`${API_URL}/get_teams.php`)
            .then(({ data }) => {
                if (data.code === 1) {
                    dispatch({
                        type: TOURNAMENT_TEAMS_FETCHED,
                        payload: data.teams
                    });
                    resolve();
                } else {
                    throw new Error(data.message || 'Errore sconosciuto');
                }
            })
            .catch(err => {
                const { response } = err;
				if (response && response.data && response.data.message) {
					err.message = response.data.message;
				}
				dispatch({
					type: ERROR_IN_TOURNAMENT_TEAMS_FETCH,
					payload: 'teams'
				});
				reject(err);
            })
    );
};

export const createTeam = name => dispatch => {
    dispatch({
        type: CREATE_TEAM_PENDING,
        payload: 'new_team'
    });

    const { teams } = store.getState().tournament;

    return new Promise((resolve, reject) => 
        axios.post(`${API_URL}/new_team.php`, { name })
            .then(({ data }) => {
                if (data.code === 1) {
                    dispatch({
                        type: TEAM_CREATED,
                        payload: {
                            list: [ ...teams, data.team ],
                            pend: 'new_team'
                        }
                    });
                    resolve();
                } else {
                    throw new Error(data.message || 'Errore sconosciuto');
                }
            })
            .catch(err => {
				const { response } = err;
				if (response && response.data && response.data.message) {
					err.message = response.data.message;
				}
				dispatch({
					type: ERROR_IN_TEAM_CREATE,
					payload: 'new_team'
				});
				reject(err);
			})
    );
};

export const editTeam = (id, name) => dispatch => {
    dispatch({
        type: EDIT_TEAM_PENDING,
        payload: 'edit_team'
    });

    const { teams } = store.getState().tournament;

    return new Promise((resolve, reject) => 
        axios.post(`${API_URL}/edit_team.php`, { id, name })
            .then(({ data }) => {
                if (data.code === 1) {
                    dispatch({
                        type: TEAM_EDITED,
                        payload: {
                            list: teams.map(team => {
                                if (team.id === data.team.id) {
                                    return data.team;
                                }
                                return team;
                            }),
                            pend: 'edit_team'
                        }
                    });
                    resolve();
                } else {
                    throw new Error(data.message || 'Errore sconosciuto');
                }
            })
            .catch(err => {
				const { response } = err;
				if (response && response.data && response.data.message) {
					err.message = response.data.message;
				}
				dispatch({
					type: ERROR_IN_TEAM_EDIT,
					payload: 'edit_team'
				});
				reject(err);
			})
    );
};

export const deleteTeam = id => dispatch => {
    dispatch({
        type: DELETE_TEAM_PENDING,
        payload: 'delete_team'
    });

    const { teams } = store.getState().tournament;

    return new Promise((resolve, reject) => 
        axios.post(`${API_URL}/delete_team.php`, { id })
            .then(({ data }) => {
                if (data.code === 1) {
                    dispatch({
                        type: TEAM_DELETED,
                        payload: {
                            list: teams.filter(team => team.id !== data.team.id),
                            pend: 'delete_team'
                        }
                    });
                    resolve();
                } else {
                    throw new Error(data.message || 'Errore sconosciuto');
                }
            })
            .catch(err => {
				const { response } = err;
				if (response && response.data && response.data.message) {
					err.message = response.data.message;
				}
				dispatch({
					type: ERROR_IN_TEAM_DELETE,
					payload: 'delete_team'
				});
				reject(err);
			})
    );
};

export const fetchGroups = () => dispatch => {
    dispatch({
        type: FETCH_TOURNAMENT_GROUPS,
        payload: 'groups'
    });

    return new Promise((resolve, reject) => 
        axios.get(`${API_URL}/get_groups.php`)
            .then(({ data }) => {
                if (data.code === 1) {
                    dispatch({
                        type: TORUNAMENT_GROUPS_FETCHED,
                        payload: data.groups,
                    });
                    resolve();
                } else {
                    throw new Error(data.message || 'Errore sconosciuto');
                }
            })
            .catch(err => {
				const { response } = err;
				if (response && response.data && response.data.message) {
					err.message = response.data.message;
				}
				dispatch({
					type: ERROR_IN_TOURNAMENT_GROUPS_FETCH,
					payload: 'groups'
				});
				reject(err);
			})
    );
};

export const generateGroups = groups => dispatch => {
    dispatch({
        type: GENERATE_TOURNAMENT_GROUP_PENDING,
        payload: 'groups'
    });

    return new Promise((resolve, reject) => 
        axios.post(`${API_URL}/generate_groups.php`, { groups })
            .then(({ data }) => {
                if (data.code === 1) {
                    dispatch({
                        type: TOURNAMENT_GROUP_GENERATED,
                        payload: data.groups,
                    });
                    resolve();
                } else {
                    throw new Error(data.message || 'Errore sconosciuto');
                }
            })
            .catch(err => {
				const { response } = err;
				if (response && response.data && response.data.message) {
					err.message = response.data.message;
				}
				dispatch({
					type: ERROR_IN_GENERATE_TOURNAMENT_GROUPS,
					payload: 'groups'
				});
				reject(err);
			})
    );
};