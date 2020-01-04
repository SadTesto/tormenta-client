import {
    FETCH_TOURNAMENT_INFO,
    TOURNAMENT_INFO_FETCHED,
    ERROR_IN_TOURNAMENT_INFO_FETCH
} from './types';
import axios from 'axios';

const API_URL = 'http://dev.tronweb.it/tormenta-server';

export const fetchTournamentInfo = () => dispatch => {
    dispatch({
        type: FETCH_TOURNAMENT_INFO,
        payload: 'info'
    });

    return new Promise((resolve, reject) =>
        axios.get(`${API_URL}/error.php`)
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
                    err.message = response.data.message;
                }
                dispatch({
                    type: ERROR_IN_TOURNAMENT_INFO_FETCH,
                    payload: 'info'
                });
                reject(err);
            })
    );
};