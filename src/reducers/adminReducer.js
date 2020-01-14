import {
    AUTH_ADMIN_PENDING,
    ADMIN_AUTHED,
    ERROR_IN_ADMIN_AUTH,
    ADMIN_LOGOUT
} from '../actions/types';

const initialState = {
    authed: false,
    id: null,
    username: null,
    pendings: {}
};

export default function (state = initialState, { payload, type }) {
    switch (type) {
        case AUTH_ADMIN_PENDING:
            return {
                ...state,
                pendings: {
                    ...state.pendings,
                    [payload]: true
                }
            };
        case ADMIN_AUTHED:
            return {
                ...state,
                authed: true,
                id: payload.id,
                username: payload.username,
                pendings: {
                    ...state.pendings,
                    auth: false
                }
            };
        case ERROR_IN_ADMIN_AUTH:
            return {
                ...state,
                pendings: {
                    ...state.pendings,
                    [payload]: false
                }
            };
        case ADMIN_LOGOUT:
            return initialState;
        default:
            return state;
    }
};