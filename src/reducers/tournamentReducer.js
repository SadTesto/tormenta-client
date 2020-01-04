import {
    FETCH_TOURNAMENT_INFO,
    TOURNAMENT_INFO_FETCHED,
    ERROR_IN_TOURNAMENT_INFO_FETCH
} from '../actions/types';

const initialState = {
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
                pendings: {
                    ...state.pendings,
                    info: false
                }
            };
        case ERROR_IN_TOURNAMENT_INFO_FETCH:
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