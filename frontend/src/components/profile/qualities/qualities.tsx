import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import TestResultComponent from '../../work-quiz/test-result-schedule/test-result-component';
import './styles.scss';
import * as WorkQuizActions from '../../../store/work-style-quiz/actions';

const Qualities: React.FC = () => {
  const results = useAppSelector((store) => store.workStyleQuiz.result);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(WorkQuizActions.getWorkStyleQuizResults());
  }, []);

  return (
    <>
      {results?.length ? (
        <div className="pt-4">
          <TestResultComponent />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Qualities;
