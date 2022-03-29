import React, { useState } from 'react';
import OrkItem from '../workspace-item';
import OkrInfo from './okr-info';
import { Button } from 'components/common/common';
import OkrModal from '../modal';
import './styles.scss';
import { IOkr } from 'common/interfaces/okr';

interface Props {
  collection: IOkr[];
}

const OkrList: React.FC<Props> = ({ collection }) => {
  const [isShowCurrentOkr, setIsShowCurrentOkr] = useState(false);
  const [currentShowOkr, setCurrentOkr] = useState('');
  const [showModal, setShowModal] = useState(false);

  const okrItemHanlder = (id: string): void => {
    setIsShowCurrentOkr(true);
    setCurrentOkr(id);
  };

  const openModal = (): void => setShowModal(true);

  const closeModal = (): void => {
    setShowModal(false);
  };

  const okrGoBackHandler = (): void => setIsShowCurrentOkr(false);

  return (
    <>
      {isShowCurrentOkr ? (
        <OkrInfo id={currentShowOkr} goBackHanlder={okrGoBackHandler} />
      ) : (
        <>
          <Button
            variant="gu-pink"
            className="text-gu-white mb-2 align-self-end"
            onClick={openModal}
          >
            + Add OKR
          </Button>
          <div className="OKR-page d-flex flex-row flex-wrap mt-2">
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
          {showModal && (
            <OkrModal showModal={showModal} closeModal={closeModal} />
          )}
        </>
      )}
    </>
  );
};

export default OkrList;
