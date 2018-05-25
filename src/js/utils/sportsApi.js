import fetch from 'isomorphic-unfetch';
import { USERNAME, PASSWORD } from './apikeys'
import { dateToString } from './date'
import { addGame, fetchGamesBegin, fetchGamesSuccess, fetchGamesFailure} from '../actions';

function getStandings() {
    return fetch('https://api.mysportsfeeds.com/v1.2/pull/nba/latest/overall_team_standings.json', {
        headers: {
            'username': USERNAME,
            'password': PASSWORD
        }
    }).then(res => res.json())
}

function getGames(date, teams) {
    if (teams.length == 0) {
        return [];
    }
    for (var i = 0; i < teams.length; i++) {
        if (i == 0) {
            var teams_str = teams[i].abbreviation;
        }
        else {
            teams_str = teams_str + ',' + teams[i].abbreviation;
        }
    }
    var date_str = dateToString(date);
    return dispatch => {
        dispatch(fetchGamesBegin());
        return fetch('https://api.mysportsfeeds.com/v1.2/pull/nba/latest/daily_game_schedule.json?fordate=' + date_str + '&team=' + teams_str, {
            headers: {
                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
        })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if ("gameentry" in json.dailygameschedule) {
                dispatch(fetchGamesSuccess(json.dailygameschedule.gameentry));
                return json.dailygameschedule.gameentry;
            }
        })
        .catch(error => dispatch(fetchGamesFailure(error)))
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export {
    getStandings,
    getGames
}