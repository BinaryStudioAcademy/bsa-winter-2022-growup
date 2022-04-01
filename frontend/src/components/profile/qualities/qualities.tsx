import { useAppDispatch, useEffect, useAppSelector } from 'hooks/hooks';
import TestResultComponent from '../../work-quiz/test-result-schedule/test-result-component';
import './styles.scss';
import * as WorkQuizActions from '../../../store/work-style-quiz/actions';
import Loader from 'components/loader/loader';

const Qualities: React.FC = () => {
  const results = useAppSelector((store) => store.workStyleQuiz.result);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(WorkQuizActions.getWorkStyleQuizResults());
  }, []);

  return (
    <div className="pt-4 position-relative w-100">
      {results?.length ? (
        <TestResultComponent />
      ) : (
        <div className="position-absolute start-50 translate-middle loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Qualities;
