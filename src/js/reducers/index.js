import { ADD_TEAM, DELETE_TEAM } from "../constants/action-types";

const initialState = {
    teams: [],
    games: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAM:
            return {...state, cities: [...state.teams, action.payload],  };
        case DELETE_TEAM:
            let newteams = [];
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