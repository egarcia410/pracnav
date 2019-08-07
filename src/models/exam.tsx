export interface IOption {
  option_id: number;
  option: string;
}

export interface IQuestion {
  question_id: number;
  question: string;
  options: IOption[];
  correct_option_id: number;
  illustration: string;
}

export interface IExam {
  module_id: number;
  passing_score: number;
  total_questions: number;
  questions: IQuestion[];
  correctOptions: number[];
}
