import {
    FETCH_TOURNAMENT_INFO,
    TOURNAMENT_INFO_FETCHED,
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
    ERROR_IN_TOURNAMENT_GROUPS_FETCH,
    TORUNAMENT_GROUPS_FETCHED,
    GENERATE_TOURNAMENT_GROUP_PENDING,
    ERROR_IN_GENERATE_TOURNAMENT_GROUPS,
    TOURNAMENT_GROUP_GENERATED,
    DELETE_TOURNAMENT_PENDING,
    TOURNAMENT_DELETED,
    ERROR_IN_TORUNAMENT_DELETE,
    EDIT_TOURNAMENT_PENDING,
    TOURNAMENT_EDITED,
    ERROR_IN_TOURNAMENT_EDIT,
    UPDATE_MATCH_RESULT_PENDING,
	MATCH_RESULT_UPDATED,
    ERROR_IN_MATCH_RESULT_UPDATE,
    EDIT_GROUP_PENDING,
    GROUP_EDITED,
    ERROR_IN_GROUP_EDIT,
} from '../actions/types';

const initialState = {
    exists: false,
    info: {},
    teams: [],
    groups: [],
    pendings: {}
};

export default function (state = initialState, { payload, type }) {
    switch (type) {
        case FETCH_TOURNAMENT_INFO:
        case FETCH_TOURNAMENT_TEAMS:
        case CREATE_TEAM_PENDING:
        case EDIT_TEAM_PENDING:
        case DELETE_TEAM_PENDING:
        case CREATE_INFO_PENDING:
        case FETCH_TOURNAMENT_GROUPS:
        case GENERATE_TOURNAMENT_GROUP_PENDING:
        case DELETE_TOURNAMENT_PENDING:
        case EDIT_TOURNAMENT_PENDING:
        case UPDATE_MATCH_RESULT_PENDING:
        case EDIT_GROUP_PENDING:
            return {
                ...state,
                pendings: {
                    ...state.pendings,
                    [payload]: true
                }
            };
        case TOURNAMENT_INFO_FETCHED:
            return {
                ...state,
                exists: true,
                info: {
                    id: payload.id,
                    title: payload.title,
                    teams: payload.teams
                },
                pendings: {
                    ...state.pendings,
                    info: false
                }
            };
        case TOURNAMENT_TEAMS_FETCHED:
            return {
                ...state,
                teams: payload,
                pendings: {
                    ...state.pendings,
                    teams: false
                }
            };
        case INFO_CREATED:
            return {
                ...state,
                exists: true,
                info: {
                    id: payload.id,
                    title: payload.title,
                    teams: payload.teams
                },
                pendings: {
                    ...state.pendings,
                    create_info: true
                }
            };
        case TEAM_CREATED:
        case TEAM_EDITED:
        case TEAM_DELETED:
        case MATCH_RESULT_UPDATED:
            return {
                ...state,
                teams: payload.list,
                pendings: {
                    ...state.pendings,
                    [payload.pend]: false
                }
            };
        case GROUP_EDITED:
            return {
                ...state,
                groups: payload,
                pendings: {
                    ...state.pendings,
                    'edit_group': false
                }
            };
        case TORUNAMENT_GROUPS_FETCHED:
        case TOURNAMENT_GROUP_GENERATED:
            return {
                ...state,
                groups: payload,
                pendings: {
                    ...state.pendings,
                    groups: false
                }
            };
        case TOURNAMENT_DELETED:
            return {
                ...initialState,
                pendings: {
                    ...state.pendings,
                    delete_tournament: false
                }
            };
        case TOURNAMENT_EDITED:
            return {
                ...state,
                info: payload,
                pendings: {
                    ...state.pendings,
                    edit_info: false
                }
            };
        case ERROR_IN_TOURNAMENT_INFO_FETCH:
        case ERROR_IN_TOURNAMENT_TEAMS_FETCH:
        case ERROR_IN_TEAM_CREATE:
        case ERROR_IN_TEAM_EDIT:
        case ERROR_IN_TEAM_DELETE:
        case ERROR_IN_INFO_CREATE:
        case ERROR_IN_TOURNAMENT_GROUPS_FETCH:
        case ERROR_IN_GENERATE_TOURNAMENT_GROUPS:
        case ERROR_IN_TORUNAMENT_DELETE:
        case ERROR_IN_TOURNAMENT_EDIT:
        case ERROR_IN_MATCH_RESULT_UPDATE:
        case ERROR_IN_GROUP_EDIT:
            return {
                ...state,
                pendings: {
                    ...state.pendings,
                    [payload]: false
                }
            };
        default:
            return state;
    }
};