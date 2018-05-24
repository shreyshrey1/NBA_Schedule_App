import { ADD_TEAM, DELETE_TEAM} from "../constants/action-types";
const addTeam = team => ({ type: ADD_TEAM, payload: team });
const deleteTeam = team => ({ type: DELETE_TEAM, payload: team});

export {
    addTeam,
    deleteTeam
}