import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { navigate } from '@reach/router';

import ProgressBar from '../../shared/ProgressBar';
import { GET_EXAM } from '../../graphql/exam';

// import './Exam.scss';

const Exam: React.FC<any> = () => {
  const [answeredIDs, setAnsweredIDs] = useState<any>([]);
  const [currentQuestionID, setCurrentQuestionID] = useState(0);
  const [hasExamData, setHasExamData] = useState(false);

  const setExamData = (exam: any) => {
    const { questions } = exam;
    setHasExamData(true);
    setAnsweredIDs(new Array(questions.length));
    setCurrentQuestionID(questions[0].question_id);
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
          console.log(data, 'DATA');
          const { exam } = data;
          //   setAnsweredIDs(new Array(questions.length));
          //   setCurrentQuestionID(questions[0].question_id);
          if (!hasExamData) {
            setExamData(exam);
          }

          return (
            <>
              {data !== undefined ? (
                <ProgressBar
                  questions={data.exam.questions}
                  answeredIDs={answeredIDs}
                  currentQuestionID={currentQuestionID}
                />
              ) : null}
              {/* <QuestionCount />
            <Question />
            <Options />
            <ActionButtons /> */}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Exam;
