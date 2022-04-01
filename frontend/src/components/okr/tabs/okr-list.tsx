import OrkItem from '../workspace-item';
import OkrInfo from './okr-info';
import './styles.scss';
import { IOkr } from 'common/interfaces/okr';
import { useEffect, useState } from 'react';
import * as okrActions from '../../../store/okr/actions';
import { useAppDispatch, useAppSelector } from 'hooks/store/store.hooks';

interface Props {
  collection: IOkr[];
}

const OkrList: React.FC<Props> = ({ collection }) => {
  const [isShowCurrentOkr, setIsShowCurrentOkr] = useState(false);
  const [currentShowOkr, setCurrentOkr] = useState('');
  const dispatch = useAppDispatch();
  const okrItems = useAppSelector((store) => store.okr.okrs);

  const okrItemHandler = (id: string): void => {
    setIsShowCurrentOkr(true);
    setCurrentOkr(id);
  };

  const okrGoBackHandler = (): void => setIsShowCurrentOkr(false);

  useEffect(() => {
    const today = new Date();
    okrItems.forEach((okr) => {
      if (okr.status === 'open')
        if (new Date(okr.endDate) < today || new Date(okr.startDate) > today) {
          dispatch(okrActions.closeOkr({ okrId: okr.id }));
        }
    });
  }, [okrItems]);

  return (
    <>
      {isShowCurrentOkr ? (
        <OkrInfo id={currentShowOkr} goBackHandler={okrGoBackHandler} />
      ) : (
        <>
          <div className="OKR-page mt-4">
            {collection.map((okr: IOkr, index) => {
              const objectives = okr.objectives;
              let objectivesCounter = 0;
              let resultsCounter = 0;

              if (objectives) {
                objectivesCounter += objectives.length;
                resultsCounter = objectives.reduce((acc, objective) => {
                  if (objective.keyResults) {
                    acc += objective.keyResults.length;
                  }
                  return acc;
                }, 0);
              }
              return (
                <OrkItem
                  key={index}
                  okr={okr}
                  objectivesCounter={objectivesCounter}
                  resultsCounter={resultsCounter}
                  onClickInfo={okrItemHandler}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default OkrList;
