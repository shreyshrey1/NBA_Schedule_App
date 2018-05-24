import fetch from 'isomorphic-unfetch';
import { USERNAME, PASSWORD } from './apikeys'
import { dateToString } from './date'

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
            var teams_str = teams[i];
        }
        teams_str = teams_str + ',' + teams[i];
    }
    var date_str = dateToString(date);
    return fetch('https://api.mysportsfeeds.com/v1.2/pull/nba/latest/daily_game_schedule.json?fordate=' + date_str + '&team=' + teams_str, {
        headers: {
            'username': USERNAME,
            'password': PASSWORD
        }
    }).then(res => res.json())
}
