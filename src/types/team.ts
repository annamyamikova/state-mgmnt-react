export interface TeamAnswerData {
  themes: { [themeIndex: number]: TeamNameData };
  blitz: TeamNameData;
}

export interface TeamNameData {
  teams: { [teamName: string]: TeamAnswers };
}

export interface TeamAnswers {
  answers: Answers[];
  points: number;
}

export interface Answers {
  questionId: number;
  answer: string;
  rightAnswer?: string;
  isAnswerRight?: boolean;
}

export interface LocalTeamAnswers {
  questionId: number;
  answer: string;
}
