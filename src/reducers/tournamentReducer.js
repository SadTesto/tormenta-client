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
    TOURNAMENT_GROUP_GENERATED
} from '../actions/types';

const initialState = {
    exists: false,
    id: null,
    title: null,
    teams: [],
    groups: [],
    matches: [],
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
                id: payload.id,
                title: payload.title,
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
                id: payload.id,
                title: payload.title,
                pendings: {
                    ...state.pendings,
                    create_info: true
                }
            };
        case TEAM_CREATED:
        case TEAM_EDITED:
        case TEAM_DELETED:
            return {
                ...state,
                teams: payload.list,
                pendings: {
                    ...state.pendings,
                    [payload.pend]: false
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
        case ERROR_IN_TOURNAMENT_INFO_FETCH:
        case ERROR_IN_TOURNAMENT_TEAMS_FETCH:
        case ERROR_IN_TEAM_CREATE:
        case ERROR_IN_TEAM_EDIT:
        case ERROR_IN_TEAM_DELETE:
        case ERROR_IN_INFO_CREATE:
        case ERROR_IN_TOURNAMENT_GROUPS_FETCH:
        case ERROR_IN_GENERATE_TOURNAMENT_GROUPS:
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