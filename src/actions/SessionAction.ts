import {SessionData} from "../types/game";

export const UPDATE_DATA = 'UPDATE_DATA';
export const SET_SESSION_ID = 'SET_SESSION_ID';
export const SET_GAME_ID = 'SET_GAME_ID';
export const SET_TEAM_NAME = 'SET_TEAM_NAME';
export const CLEAR_GAME = 'CLEAR_GAME';

export function updateData({ sessionId, ...session }: Partial<SessionData>) {
  return {
    type: UPDATE_DATA,
    payload: { sessionId, ...session }
  }
}

export function setSessionId(sessionId?: string | null | undefined) {
  return {
    type: SET_SESSION_ID,
    payload: sessionId,
  }
}

export function setGameId(gameId?: string | null | undefined) {
  return {
    type: SET_GAME_ID,
    payload: gameId,
  }
}

export function setTeamName(teamName?: string | null | undefined) {
  return {
    type: SET_TEAM_NAME,
    payload: teamName,
  }
}

export function clearGame() {
  return {
    type: CLEAR_GAME,
  }
}

