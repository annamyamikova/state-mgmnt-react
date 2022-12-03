export enum SocketHandlerEvent {
  game_updatedData = 'game_updatedData',
}

export enum SocketEmitEvent {
  moderator_blitzTimer = 'moderator.blitzTimer',
  moderator_startGame = 'moderator.startGame',
  moderator_selectThemes = 'moderator.selectThemes',
  moderator_saveResults = 'moderator.saveResults',
  moderator_sendQuestion = 'moderator.sendQuestion',
  moderator_showAnswers = 'moderator.showAnswers',
  moderator_sendBlitz = 'moderator.sendBlitz',
  moderator_showQuestion = 'moderator.showQuestion',
  moderator_showTeamCountResult = 'moderator.showTeamCountResult',
  moderator_showBlitz = 'moderator.showBlitz',
  moderator_timer = 'moderator.timer',
  moderator_updateTeamResults = 'moderator.updateTeamResults',
  player_setTeamAnswer = 'player.setTeamAnswer',
}

export type SubscribeFn = (
  eventName: SocketHandlerEvent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: (...data: any[]) => void
) => void;

export type UnsubscribeFn = (
  eventName: SocketHandlerEvent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb?: (...data: any[]) => void
) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EmitFn = (eventName: SocketEmitEvent, ...data: any[]) => void;

export enum SocketQueryField {
  teamName = 'teamName',
  token = 'token',
  sessionId = 'sessionId',
}

export interface SocketCtx {
  connect: (query: { [key in SocketQueryField]?: string }) => void;
  disconnect: () => void;
  subscribe: SubscribeFn;
  unsubscribe: UnsubscribeFn;
  emit: EmitFn;
  isInit: boolean;
  isConnected: boolean;
}
