import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import tournamentReducer from './tournamentReducer';

export default combineReducers({
    admin: adminReducer,
    tournament: tournamentReducer
});