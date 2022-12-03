// Types
import { IQuestion } from 'types/question';

export interface ITheme {
  id: number;
  title: string;
  questions?: IQuestion[];
}

export interface IBlitzTheme {
  id: number;
  title: string;
  questions: IQuestion[];
}
