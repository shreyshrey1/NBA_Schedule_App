import { ADD_TEAM, DELETE_TEAM, FETCH_GAMES_BEGIN, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAILURE } from "../constants/action-types";
import { getStandings, getGames } from "../utils/sportsApi"

export const initialState = {
    teams: [],
    loading: false,
    games: [],
    error: null
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
            return {...state, teams: newteams, loading: false, games: state.games, error: null};
        case FETCH_GAMES_BEGIN:
            return {...state, loading: true, games: state.games, error: null};
        case FETCH_GAMES_SUCCESS:
            let gameids = state.games.map(game => game.id);
            console.log(gameids);
            let newgames = state.games;
            for (var i = 0; i < action.payload.length; i++) {
                if (!(gameids.includes(action.payload[i].id))) {
                    newgames = newgames.concat(action.payload[i])
                }
            }
            return {...state, loading: false, games: newgames };
        case DELETE_TEAM:
            newteams = [];
            for(var i=0; i < state.teams.length; i++) {
                if (state.teams[i] != action.payload) {
                    newteams.push(state.teams[i]);
                }
            }
            newgames = []
            for(i=0; i < state.games.length; i++) {
                if (state.games[i] != action.payload) {
                    newgames.push(state.teams[i]);
                }
            }
            return {...state, teams: newteams, games: newgames };
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