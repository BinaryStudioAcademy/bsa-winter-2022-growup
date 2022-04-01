import OrkItem from '../workspace-item';
import OkrInfo from './okr-info';
import './styles.scss';
import { IOkr } from 'common/interfaces/okr';
import { useState } from 'react';

interface Props {
  collection: IOkr[];
}

const OkrList: React.FC<Props> = ({ collection }) => {
  const [isShowCurrentOkr, setIsShowCurrentOkr] = useState(false);
  const [currentShowOkr, setCurrentOkr] = useState('');

  const okrItemHanlder = (id: string): void => {
    setIsShowCurrentOkr(true);
    setCurrentOkr(id);
  };

  const okrGoBackHandler = (): void => setIsShowCurrentOkr(false);

  return (
    <>
      {isShowCurrentOkr ? (
        <OkrInfo id={currentShowOkr} goBackHanlder={okrGoBackHandler} />
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
                  onClickInfo={okrItemHanlder}
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
