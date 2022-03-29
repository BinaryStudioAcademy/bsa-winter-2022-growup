import { memo } from 'react';
import { Card, OverlayTrigger } from 'react-bootstrap';
import PathFlow from 'components/admin/career-path/path-flow/path-flow';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
} from 'hooks/hooks';
import { careerPathActions } from 'store/career-path';
import { Button } from 'components/common/common';
import { tooltip } from 'components/admin/common';

const CareerPath: React.FC = () => {
  const domains = useAppSelector((state) => state.careerPath.domains) || [];
  const { user } = useAppSelector((state) => state.auth);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isFlowVisible, setIsFlowVisible] = useState(!!domains.length);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && user.company) {
      setIsDisabled(false);
    }
  }, [user]);

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
          <OverlayTrigger overlay={tooltip(isDisabled)}>
            <span className="d-inline-block">
              <Button
                variant="outline-gu-white"
                className={`btn-hover-gu-purple ${
                  !isFlowVisible || 'invisible'
                }`}
                onClick={handleAddCareerPath}
                disabled={isDisabled}
              >
                + Add Career Path
              </Button>
            </span>
          </OverlayTrigger>
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
