import { ADD_TEAM, DELETE_TEAM, FETCH_GAMES_BEGIN, FETCH_GAMES_FAILURE, FETCH_GAMES_SUCCESS, 
         FETCH_STANDINGS_BEGIN, FETCH_STANDINGS_SUCCESS, FETCH_STANDINGS_FAILURE} from "../constants/action-types";
import { USERNAME, PASSWORD } from "../utils/apikeys";
import { dateToString } from "../utils/date";


const addTeam = team => ({ type: ADD_TEAM, payload: team });
const deleteTeam = team => ({ type: DELETE_TEAM, payload: team});
const fetchGamesBegin = () => ({ type: FETCH_GAMES_BEGIN });
const fetchGamesSuccess = games => ({ type: FETCH_GAMES_SUCCESS, payload: games });
const fetchGamesFailure = error => ({ type: FETCH_GAMES_FAILURE, payload: error });
const fetchStandingsBegin = () => ({ type: FETCH_STANDINGS_BEGIN });
const fetchStandingsSuccess = teams => ({ type: FETCH_STANDINGS_SUCCESS, payload: teams});
const fetchStandingsFailure = error => ({ type: FETCH_STANDINGS_FAILURE, payload: error});



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

function fetchStandings() {
    return dispatch => {
        dispatch(fetchStandingsBegin());
        return fetch("https://api.mysportsfeeds.com/v1.2/pull/nba/latest/overall_team_standings.json", {
            headers: {
                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
        })
        .then(res => res.json())
        .then(json => {
            dispatch(fetchStandingsSuccess(json.overallteamstandings.teamstandingsentry));
        })
        .catch(error => dispatch(fetchStandingsFailure(error)));
    }
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
    fetchGames,
    fetchStandings
}