
export type QuestionType = 'pronunciation' | 'stress' | 'grammar' | 'communication' | 'error' | 'cloze';
export type AnswerLetter = 'A' | 'B' | 'C' | 'D';

export interface Option {
  letter: AnswerLetter;
  text: string;
}

export interface ErrorPart {
    text: string;
    isErrorCandidate?: boolean;
    letter?: AnswerLetter;
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string | ErrorPart[];
  options: Option[];
  answer: AnswerLetter;
  explanation: string;
}

export interface ClozeQuestion extends BaseQuestion {
  clozeId: number;
}

export type Question = BaseQuestion | ClozeQuestion;

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  content?: string;
  questions: Question[];
}

export interface UserAnswers {
  [questionId: string]: AnswerLetter;
}
