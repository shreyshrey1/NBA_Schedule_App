import { ADD_TEAM, DELETE_TEAM, FETCH_GAMES_BEGIN, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAILURE,
         FETCH_STANDINGS_BEGIN, FETCH_STANDINGS_SUCCESS, FETCH_STANDINGS_FAILURE} from "../constants/action-types";
import { getStandings, getGames } from "../utils/sportsApi"

function storeTeams(teams) {
    teams.map((el, index) => {
        localStorage.setItem(String(index), JSON.stringify(el))
    })
}

function getTeams() {
    let index = 0;
    let ret = [];
    while (localStorage.getItem(String(index)) != null) {
        var temp = localStorage.getItem(String(index));
        ret.push(JSON.parse(temp));
        index++;
    }
    return ret
}

// function storeGames(games) {
//     games.map((el, index) => {
//         localStorage.setItem(String(index), JSON.stringify(el))
//     })
// }

// function getGames() {
//     let index = 0;
//     let ret = [];
//     while (localStorage.getItem(String(index)) != null) {
//         var temp = localStorage.getItem(String(index));
//         ret.push(JSON.parse(temp));
//         index++;
//     }
//     return ret
// }

export const initialState = {
    teams: getTeams(),
    games: [],
    gameloading: false,
    standingsloading: false,
    error: null,
    standings: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAM:
            if (state.teams.find(elem => {
                return elem == action.payload;
            })) {
                return state;
            }
            let newteams = [...state.teams, action.payload];
            localStorage.clear();
            storeTeams(newteams);
            return {...state, teams: newteams };
        case FETCH_GAMES_BEGIN:
            return {...state, gameloading: true};
        case FETCH_GAMES_SUCCESS:
            let gameids = state.games.map(game => game.id);
            let newgames = state.games;
            for (var i = 0; i < action.payload.length; i++) {
                if (!(gameids.includes(action.payload[i].id))) {
                    newgames = newgames.concat(action.payload[i])
                }
            }
            return {...state, gameloading: false, games: newgames, error: null, standings: state.standings};
        case FETCH_GAMES_FAILURE:
            return {...state, gameloading: false, error: action.payload}
        case FETCH_STANDINGS_BEGIN:
            return {...state, standingsloading: true};
        case FETCH_STANDINGS_SUCCESS:
            return {...state, standingsloading: false, error: null, standings: action.payload };
        case FETCH_STANDINGS_FAILURE:
            return {...state, standingsloading: false, error: action.payload}
        case DELETE_TEAM:
            newteams = [];
            for(var i=0; i < state.teams.length; i++) {
                if (state.teams[i] != action.payload) {
                    newteams.push(state.teams[i]);
                }
            }
            localStorage.clear()
            storeTeams(newteams);
            return {...state, teams: newteams, games: [] };
        default:
            return state;
    }
};


var unique = (arrArg) => {
    return arrArg.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
    });
}

export default rootReducer;