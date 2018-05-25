import { ADD_TEAM, DELETE_TEAM, FETCH_GAMES_BEGIN, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAILURE } from "../constants/action-types";
import { getStandings, getGames } from "../utils/sportsApi"

const initialState = {
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
            console.log("fetch games sucess")
            let new_games = state.games.concat(action.payload);
            return {...state, loading: false, games: new_games};
        case DELETE_TEAM:
            newteams = [];
            for(var i=0; i < state.teams.length; i++) {
                if (state.teams[i] != action.payload) {
                    newteams.push(state.teams[i]);
                }
            }
            let newgames = []
            for(var i=0; i < state.games.length; i++) {
                if (state.games[i] != action.payload) {
                    newgames.push(state.teams[i]);
                }
            }
            return {...state, teams: newteams, games: newgames };
        default:
            return state;
    }
};

export default rootReducer;