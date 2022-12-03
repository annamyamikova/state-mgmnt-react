// Types
import { ITheme } from 'types/theme';

export interface IGame {
  id: string;
  title: string;
  description: string;
  timerCount: number;
  themes: ITheme[];
}

export interface SessionData {
  sessionId: string;
  isStarted: boolean;
}
