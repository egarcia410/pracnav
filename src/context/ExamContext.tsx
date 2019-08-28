import React, { createContext, useReducer } from 'react';
import { IExam } from '../models/exam';

interface IInitExamState {
  exam: IExam;
  currentQuestionIndex: number;
  answeredQuestions: number[];
  selectedOptions: number[];
  correctOptions: number[];
  hasSubmitted: boolean;
  updateExam: (exam: any) => void;
  navigateToQuestion: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  selectOption: (optionId: number) => void;
  submitExam: () => void;
}

const initialState: IInitExamState = {
  answeredQuestions: [],
  currentQuestionIndex: 0,
  selectedOptions: [],
  hasSubmitted: false
} as any;

const ExamContext = createContext(initialState);

const examReducer = (state: IInitExamState, action: any) => {
  switch (action.type) {
    case 'UPDATE_EXAM':
      return {
        ...state,
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
      let answeredQuestions = [...state.answeredQuestions];
      answeredQuestions[state.currentQuestionIndex] = +state.exam.questions[
        state.currentQuestionIndex
      ].question_id;
      let selectedOptions = [...state.selectedOptions];
      selectedOptions[state.currentQuestionIndex] = action.optionId;
      return {
        ...state,
        answeredQuestions,
        selectedOptions
      };
    case 'SUBMIT_EXAM':
      return { ...state, hasSubmitted: true };
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
  const submitExam = () => {
    dispatch({
      type: 'SUBMIT_EXAM'
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
        submitExam,
        exam: state.exam,
        answeredQuestions: state.answeredQuestions,
        selectedOptions: state.selectedOptions,
        currentQuestionIndex: state.currentQuestionIndex,
        hasSubmitted: state.hasSubmitted
      }}
      {...props}
    />
  );
};

export { ExamContext, ExamProvider };
