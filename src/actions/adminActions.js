import {
    AUTH_ADMIN_PENDING,
    ADMIN_AUTHED,
    ERROR_IN_ADMIN_AUTH,
    ADMIN_LOGOUT
} from './types';
import axios from 'axios';

const API_URL = 'http://dev.tronweb.it/tormenta-server';

export const authAdmin = (username, password) => dispatch => {
    dispatch({
        type: AUTH_ADMIN_PENDING,
        payload: 'auth'
    });

    return new Promise((resolve, reject) =>
        axios.post(`${API_URL}/auth.php`, {
            username,
            password
        })
            .then(({ data }) => {
                if (data.code === 1) {
                    dispatch({
                        type: ADMIN_AUTHED,
                        payload: data.user
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
                    type: ERROR_IN_ADMIN_AUTH,
                    payload: 'auth'
                });
                reject(err);
            })
    );
};

export const logout = () => dispatch => dispatch({
    type: ADMIN_LOGOUT,
    payload: null
});