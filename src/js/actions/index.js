import { ADD_TEAM, DELETE_TEAM, FETCH_GAMES_BEGIN, FETCH_GAMES_FAILURE, FETCH_GAMES_SUCCESS } from "../constants/action-types";
import { USERNAME, PASSWORD } from "../utils/apikeys";
import { dateToString } from "../utils/date";

const addTeam = team => ({ type: ADD_TEAM, payload: team });
const deleteTeam = team => ({ type: DELETE_TEAM, payload: team});
const fetchGamesBegin = () => ({ type: FETCH_GAMES_BEGIN });
const fetchGamesSuccess = games => ({ type: FETCH_GAMES_SUCCESS, payload: games });
const fetchGamesFailure = error => ({ type: FETCH_GAMES_FAILURE, payload: error });

function fetchGames(date, teams) {
    return dispatch => {
        dispatch(fetchGamesBegin());
        return fetch('https://api.mysportsfeeds.com/v1.2/pull/nba/latest/daily_game_schedule.json?fordate=' + date + '&team=' + teams, {
            headers: {
                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
        })
        .then(res => res.json())
        .then(json => {
            if ("gameentry" in json.dailygameschedule) {
                dispatch(fetchGamesSuccess(json.dailygameschedule.gameentry));
            }
            dispatch(fetchGamesSuccess([]))
        })
        .catch(error => dispatch(fetchGamesFailure(error)));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export {
    addTeam,
    deleteTeam,
    fetchGamesBegin,
    fetchGamesSuccess,
    fetchGamesFailure,
    fetchGames
}