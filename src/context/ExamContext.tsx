import React, { createContext, useReducer } from 'react';

interface IExam {
  passing_score: number;
  total_questions: number;
  questions: {
    question_id: number;
    question: string;
    options: {
      option_id: number;
      option: string;
    }[];
  }[];
}

type IInitExamState = {
  hasExam: boolean;
  exam: IExam;
  currentQuestionIndex: number;
  answeredQuestions: number[];
  updateExam: (exam: any) => void;
  navigateToQuestion: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  selectOption: (optionId: number) => void;
};

const initialState: IInitExamState = {
  hasExam: false,
  exam: {
    passing_score: 0,
    total_questions: 0,
    questions: [
      { question_id: 0, question: '', options: [{ option_id: 0, option: '' }] }
    ]
  },
  currentQuestionIndex: 0,
  answeredQuestions: [],
  updateExam: (exam: any) => {},
  navigateToQuestion: (index: number) => {},
  nextQuestion: () => {},
  prevQuestion: () => {},
  selectOption: (optionId: number) => {}
};

const ExamContext = createContext(initialState);

const examReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_EXAM':
      return {
        ...state,
        hasExam: true,
        exam: action.exam
      };
    case 'RESET_EXAM':
      return initialState;
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex:
          state.currentQuestionIndex + 1 > state.exam.questions.length - 1
            ? state.currentQuestionIndex
            : state.currentQuestionIndex + 1
      };
    case 'PREV_QUESTION':
      return {
        ...state,
        currentQuestionIndex:
          state.currentQuestionIndex - 1 < 0
            ? state.currentQuestionIndex
            : state.currentQuestionIndex - 1
      };
    case 'NAVIGATE_TO_QUESTION':
      return {
        ...state,
        currentQuestionIndex: action.index
      };
    case 'SELECT_OPTION':
      let answeredQuestions = state.answeredQuestions;
      answeredQuestions[state.currentQuestionIndex] = action.optionId;
      return {
        ...state,
        answeredQuestions
      };
    default:
      return state;
  }
};

const ExamProvider = (props: any) => {
  const [state, dispatch] = useReducer(examReducer, initialState);
  const updateExam = (exam: any) => {
    dispatch({
      type: 'UPDATE_EXAM',
      exam
    });
  };
  const resetExam = () => {
    dispatch({
      type: 'RESET_EXAM'
    });
  };
  const nextQuestion = () => {
    dispatch({
      type: 'NEXT_QUESTION'
    });
  };
  const prevQuestion = () => {
    dispatch({
      type: 'PREV_QUESTION'
    });
  };
  const navigateToQuestion = (index: number) => {
    dispatch({
      type: 'NAVIGATE_TO_QUESTION',
      index
    });
  };
  const selectOption = (optionId: number) => {
    dispatch({
      type: 'SELECT_OPTION',
      optionId
    });
  };

  return (
    <ExamContext.Provider
      value={{
        updateExam,
        resetExam,
        nextQuestion,
        prevQuestion,
        navigateToQuestion,
        selectOption,
        hasExam: state.hasExam,
        exam: state.exam,
        answeredQuestions: state.answeredQuestions,
        currentQuestionIndex: state.currentQuestionIndex
      }}
      {...props}
    />
  );
};

export { ExamContext, ExamProvider };
