import { UPDATE_DATA, SET_SESSION_ID, SET_GAME_ID, SET_TEAM_NAME, CLEAR_GAME } from "actions/SessionAction";

const initialState = {
  sessionId: localStorage.getItem('sessionId'),
  gameId: null,
  teamName: null,
  isStarted: false,
};

interface Action {
  type: string;
  payload: any;
}

export function sessionReducer(state = initialState, action: Action) {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state
      };
    case SET_SESSION_ID:
      return {
        ...state, sessionId: action.payload
      };
    case SET_GAME_ID:
      return {
        ...state, gameId: action.payload
      };
    case SET_TEAM_NAME:
      return {
        ...state, teamName: action.payload
      };
    case CLEAR_GAME:
      return {
        ...state, sessionId: null, gameId: null
      };
    default:
      return state;
  }
}