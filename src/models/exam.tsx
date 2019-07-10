export interface IOption {
  option_id: number;
  option: string;
}

export interface IQuestion {
  question_id: number;
  question: string;
  options: IOption[];
  correct_option_id: number;
}

export interface IExam {
  passing_score: number;
  total_questions: number;
  questions: IQuestion[];
}

export class Option {
  constructor({ option_id = 0, option = '' }) {}
}

export class Question {
  constructor({
    question_id = 0,
    question = '',
    correct_option_id = 0,
    options = [new Option({})]
  }) {}
}

export class Exam {
  constructor({
    passing_score = 0,
    total_questions = 0,
    questions = [new Question({})]
  }) {}
}
