import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { navigate } from '@reach/router';

import ProgressBar from '../../components/ProgressBar';
import QuestionCount from '../../components/QuestionCount';
import Question from '../../components/Question';
import Options from '../../components/Options';
import ActionBtns from '../../components/ActionBtns';
import { GET_EXAM } from '../../graphql/exam';

import './Exam.scss';

const Exam: React.FC<any> = () => {
  const [answeredIDs, setAnsweredIDs] = useState<any>([]);
  const [examData, setExamData] = useState<any>({});
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [currentOptionID, setCurrentOptionID] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasExamData, setHasExamData] = useState(false);
  const [selectedOptionIDs, setSelectedOptionIDs] = useState<number[]>([]);

  const initializeExamData = (exam: any) => {
    const { questions } = exam;
    setExamData(exam);
    setHasExamData(true);
    setAnsweredIDs(new Array(questions.length));
    setCurrentQuestion(questions[0]);
  };

  const onSelectOption = (optionID: number) => {
    selectedOptionIDs[currentQuestionIndex] = +optionID;
    setSelectedOptionIDs(selectedOptionIDs);
    answeredIDs[currentQuestionIndex] = +currentQuestion.question_id;
    setAnsweredIDs(answeredIDs);
    setCurrentOptionID(optionID);
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setCurrentQuestion(examData.questions[index]);
  };

  const nextQuestion = () => {
    let index =
      currentQuestionIndex + 1 > examData.questions.length
        ? examData.questions.length
        : currentQuestionIndex + 1;
    setCurrentQuestionIndex(index);
  };

  const prevQuestion = () => {
    let index = currentQuestionIndex - 1 < 0 ? 0 : currentQuestionIndex - 1;
    setCurrentQuestionIndex(index);
  };

  return (
    <>
      <Query query={GET_EXAM}>
        {({ loading, error, data }: any) => {
          if (loading) return 'Loading...';
          if (error) {
            navigate('/');
            return null;
          }
          const { exam } = data;
          if (!hasExamData) {
            initializeExamData(exam);
          }

          return (
            <>
              {currentQuestion && (
                <div className="exam-container">
                  <ProgressBar
                    questions={examData.questions}
                    answeredIDs={answeredIDs}
                    currentQuestionID={
                      examData.questions[currentQuestionIndex].question_id
                    }
                    jumpToQuestion={jumpToQuestion}
                  />
                  <QuestionCount
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={examData.questions.length}
                  />
                  <Question
                    question={examData.questions[currentQuestionIndex].question}
                  />
                  <Options
                    key={currentOptionID}
                    options={examData.questions[currentQuestionIndex].options}
                    selectedOptions={selectedOptionIDs}
                    onSelectOption={onSelectOption}
                  />
                  <ActionBtns
                    nextQuestion={nextQuestion}
                    prevQuestion={prevQuestion}
                  />
                </div>
              )}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Exam;
