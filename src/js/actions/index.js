import { ADD_TEAM, DELETE_TEAM, FETCH_GAMES_BEGIN, FETCH_GAMES_FAILURE, FETCH_GAMES_SUCCESS } from "../constants/action-types";
const addTeam = team => ({ type: ADD_TEAM, payload: team });
const deleteTeam = team => ({ type: DELETE_TEAM, payload: team});
const fetchGamesBegin = () => ({ type: FETCH_GAMES_BEGIN });
const fetchGamesSuccess = games => ({ type: FETCH_GAMES_SUCCESS, payload: games });
const fetchGamesFailure = error => ({ type: FETCH_GAMES_FAILURE, payload: error });

export {
    addTeam,
    deleteTeam,
    fetchGamesBegin,
    fetchGamesSuccess,
    fetchGamesFailure
}