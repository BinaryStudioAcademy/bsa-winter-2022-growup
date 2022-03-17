import { Schedule } from './test-result-schedule';
import { useAppSelector, useState } from 'hooks/hooks';
import { IUserQuizResult } from 'common/interfaces/user-quiz';
import { ITestTypeData } from '../common/interface';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import getTypeInfo from './test-result-info';
import TestResultModal from './test-result-modal';

const TestResultComponent: React.FC = (): JSX.Element => {
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const results = useAppSelector(
    (state) => state.workStyleQuiz.result,
  ) as IUserQuizResult[];

  const testData: ITestTypeData[] = results.map((item) => {
    return {
      name:
        item.quizCategory.name[0].toUpperCase() +
        item.quizCategory.name.slice(1),
      value: item.score,
    };
  });

  const maxPoints = Math.max(...testData.map((item) => item.value));
  const theBestTestType = testData.find(
    (item) => item.value == maxPoints,
  ) as ITestTypeData;
  const { preDescription, description } = getTypeInfo(theBestTestType.name);

  return (
    <>
      <span className="fs-3 mt-1 fw-bold">{theBestTestType.name}</span>
      <p className="mt-1 mb-1">{preDescription}</p>
      <span
        className="d-flex align-items-center text-secondary quality__more-info "
        onClick={handleShow}
      >
        <span>
          {' '}
          <BoxArrowUpRight />{' '}
        </span>
        <span className="ms-2 pt-1">More info</span>
      </span>
      <Schedule data={testData} />
      <TestResultModal
        show={show}
        handleClose={handleClose}
        typeTitle={theBestTestType.name}
        description={description}
      />
    </>
  );
};

export default TestResultComponent;
