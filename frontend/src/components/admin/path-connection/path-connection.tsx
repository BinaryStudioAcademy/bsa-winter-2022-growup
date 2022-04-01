import { Button, Card, Form } from 'react-bootstrap';

import Pairs from './pairs/pairs';
import LevelsList from '../common/levels-list/levels-list';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { careerPathActions } from 'store/career-path';
import { ChangeEvent } from 'react';
import { NotificationManager } from 'react-notifications';

// Commented code will be used for setting up domain connections

const PathConnection: React.FC = () => {
  const domains = useAppSelector((state) => state.careerPath.domains) || [];
  const [prevDomainIndex, setPrevDomainIndex] = useState(0);
  const [nextDomainIndex, setNextDomainIndex] = useState(0);
  const [prevLevel, setPrevLevel] = useState('');
  const [nextLevelsSet, setNextLevel] = useState(new Set<string>());

  const handlePrevSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    const index = e.target.options.selectedIndex;
    setPrevDomainIndex(index);
    setPrevLevel('');
  };

  const handleNextSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    const index = e.target.options.selectedIndex;
    setNextDomainIndex(index);
    setNextLevel(new Set());
  };

  const prevDomainId = prevDomainIndex
    ? domains[prevDomainIndex - 1]?.domain.id
    : undefined;

  // const nextDomainId = nextDomainIndex ? domains[nextDomainIndex-1]?.domain.id : undefined;

  const prevlevels = prevDomainIndex
    ? domains[prevDomainIndex - 1]?.levels
    : [];

  const nextlevels = nextDomainIndex
    ? domains[nextDomainIndex - 1]?.levels
    : [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(careerPathActions.fetchDomains());
  }, [dispatch]);

  const handleRadioButtonClick = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPrevLevel(e.target.value);
  };

  const handleCheckboxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (e.target.checked) {
      setNextLevel((prev) => new Set(prev).add(e.target.value));
    } else {
      setNextLevel((prev) => {
        prev.delete(e.target.value);
        return prev;
      });
    }
  };

  const connectLevels = (): void => {
    const selectedNextLevels = nextlevels.filter((lvl) =>
      Array.from(nextLevelsSet).includes(lvl.name),
    );

    const selectedPrevLevel = prevlevels.find((lvl) => lvl.name === prevLevel);

    if (!selectedPrevLevel) {
      NotificationManager.error('Choose level');
    } else if (!selectedNextLevels?.length) {
      NotificationManager.error('Choose level or levels to connect');
    } else if (selectedNextLevels.includes(selectedPrevLevel)) {
      NotificationManager.error('You cannot connect the same levels');
    } else {
      if (selectedNextLevels?.length && selectedPrevLevel && prevDomainId) {
        dispatch(
          careerPathActions.connectLevels({
            domainId: prevDomainId,
            levelId: selectedPrevLevel.id,
            nextLevelId: selectedNextLevels.map((lvl) => lvl.id),
          }),
        )
          .unwrap()
          .catch((err) => NotificationManager.error(err.message));
      }
    }
  };

  const levels = (): number => {
    const arrayLevel = domains.map((el) => el.levels);
    const numLevel = arrayLevel.map((el) => el.length);
    const startValue = 0;
    const sumWithInitial = numLevel.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      startValue,
    );
    return sumWithInitial;
  };

  const isActivePairSkills = (): boolean => {
    if (levels() < 2) return false;
    return true;
  };

  // const connectDomains = (): void => {
  //      if (nextDomainId && prevDomainId) {
  //        dispatch(
  //          careerPathActions.connectDomains({
  //            domainId: prevDomainId,
  //            nextDomainId: nextDomainId,
  //          }),
  //        )
  //          .unwrap()
  //          .catch((err) => NotificationManager.error(err.message));
  //      } else {
  //        NotificationManager.error('Choose Domains');
  //      }
  // };

  return (
    <>
      <div className="col">
        <Card className="growup-card-primary">
          <Card.Header className="d-flex justify-content-end growup-card-header" />
          <Card.Body>
            <div className="row gap-1 justify-content-center">
              <div className="col col-12">
                <div className="row mb-2">
                  <div className="col col-12 col-md-6">
                    <Form.Select
                      className="mb-2"
                      onChange={(e): void => handlePrevSelect(e)}
                    >
                      <option>Select Domain</option>
                      {domains.map((domain, i) => (
                        <option key={i} value={i}>
                          {domain.domain.name}
                        </option>
                      ))}
                    </Form.Select>
                    <LevelsList
                      type="radio"
                      levels={prevlevels}
                      onItemClick={handleRadioButtonClick}
                    />
                  </div>
                  <div className="col col-12 col-md-6">
                    <Form.Select className="mb-2" onChange={handleNextSelect}>
                      <option>Select Domain</option>
                      {domains.map((domain, i) => (
                        <option key={i} value={i + 1}>
                          {domain.domain.name}
                        </option>
                      ))}
                    </Form.Select>
                    <LevelsList
                      levels={nextlevels}
                      onItemClick={handleCheckboxClick}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    className={
                      'btn bg-gu-blue border-0 ' +
                      (isActivePairSkills() ? '' : 'disabled')
                    }
                    onClick={connectLevels}
                  >
                    Pair levels
                  </Button>
                  {/* <Button variant="primary" onClick={connectDomains}>
                    Pair domains
                  </Button> */}
                </div>
              </div>
              <div className="col col-12 col-lg-12">
                <Pairs />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default PathConnection;
