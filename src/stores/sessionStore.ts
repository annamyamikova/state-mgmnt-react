import { action, makeObservable, observable } from 'mobx';

// Types
import { SessionData } from 'types/game';

class SessionStore {
  @observable
  sessionId: string | null = localStorage.getItem('sessionId');

  @observable
  gameId: string | null = null;

  @observable
  teamName: string | null = null;

  @observable
  isStarted: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  updateData = ({ sessionId, ...session }: Partial<SessionData>): void => {
    Object.entries(session).forEach(([key, data]) => {
      this[key as keyof SessionData] = data as never;
    });

    if (typeof sessionId !== 'undefined') {
      this.setSessionId(sessionId);
    }
  };

  @action
  setSessionId = (sessionId?: string | null | undefined): void => {
    this.sessionId = sessionId || null;

    if (sessionId) {
      localStorage.setItem('sessionId', sessionId);
    } else {
      this.clearGame();
    }
  };

  @action
  setGameId = (gameId?: string | null | undefined): void => {
    this.gameId = gameId || null;
  };

  @action
  setTeamName = (teamName?: string | null | undefined): void => {
    this.teamName = teamName || null;

    if (teamName) {
      localStorage.setItem('teamName', teamName);
    } else {
      localStorage.removeItem('teamName');
    }
  };

  @action
  clearGame = () => {
    localStorage.removeItem('sessionId');

    this.gameId = null;
    this.sessionId = null;
  };

  @action
  reset = (): void => {
    this.setSessionId();
  };
}

const sessionStore = new SessionStore();

export default sessionStore;
