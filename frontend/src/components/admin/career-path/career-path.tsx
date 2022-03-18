import { memo } from 'react';
import { Card } from 'react-bootstrap';
import PathFlow from 'components/admin/career-path/path-flow/path-flow';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
} from 'hooks/hooks';
import { careerPathActions } from 'store/career-path';

const CareerPath: React.FC = () => {
  const domains = useAppSelector((state) => state.careerPath.domains) || [];
  const [isFlowVisible, setIsFlowVisible] = useState(!!domains.length);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(careerPathActions.fetchDomains());
  }, [dispatch]);

  useEffect(() => {
    setIsFlowVisible(!!domains.length);

    if (domains.length) {
      setIsButtonClicked(false);
    }
  }, [domains]);

  const handleAddCareerPath = (): void => {
    setIsButtonClicked(true);
  };

  return (
    <div className="col">
      <Card className="growup-card-primary">
        <Card.Header className="d-flex justify-content-end growup-card-header">
          <button
            className={`btn btn-outline-gu-white btn-hover-gu-purple fw-bold fs-5 border-2 ${
              !isFlowVisible || 'invisible'
            }`}
            onClick={handleAddCareerPath}
          >
            + Add Career Path
          </button>
        </Card.Header>
        <Card.Body>
          {isFlowVisible || isButtonClicked ? (
            <PathFlow />
          ) : (
            <p className="m-0 text-center">No career path here...</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default memo(CareerPath);
