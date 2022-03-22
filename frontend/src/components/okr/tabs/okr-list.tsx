import React, { useState } from 'react';
import { IOkr } from 'common/interfaces/okr';
import OrkItem from '../workspace-item';

import { Button } from 'components/common/common';
import OkrModal from '../modal';

import './styles.scss';

interface Props {
  collection: IOkr[];
}

const OkrList: React.FC<Props> = ({ collection }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = (): void => setShowModal(true);
  const closeModal = (): void => setShowModal(false);

  return (
    <>
      <Button
        className="btn-gu-pink text-gu-white mb-2 align-self-end"
        onClick={openModal}
        text="Create Okr"
      />
      <div className="OKR-page d-flex flex-row flex-wrap">
        {collection.map((okr: IOkr) => {
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
              key={okr.id}
              okr={okr}
              objectivesCounter={objectivesCounter}
              resultsCounter={resultsCounter}
            />
          );
        })}
      </div>
      {showModal && <OkrModal showModal={showModal} closeModal={closeModal} />}
    </>
  );
};

export default OkrList;
