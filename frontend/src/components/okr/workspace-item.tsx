import React, { useState } from 'react';
import { Calendar, PencilFill } from 'react-bootstrap-icons';
import { parseDate } from 'helpers/parse-date';
import OkrModal from './modal';
import './styles.scss';
import { IOkr } from 'common/interfaces/okr';
import { StatusType } from 'store/okr/common';

interface Props {
  okr: IOkr;
  objectivesCounter: number;
  resultsCounter: number;
  onClickInfo: (id: string) => void;
}

const OrkItem: React.FC<Props> = ({
  okr,
  objectivesCounter,
  resultsCounter,
  onClickInfo,
}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = (): void => setShowModal(true);
  const closeModal = (): void => setShowModal(false);

  return (
    <>
      <div
        className={`okr-container bg-white ms-3 mb-3 py-2 px-3 
        ${
          okr.status == StatusType.close
            ? 'border-0 okr-disable pe-none'
            : 'cursor-pointer'
        }
        `}
        onClick={(): void => onClickInfo(okr.id)}
      >
        <div className="OKR-name fs-2 mt-2 fw-bold">{okr.name}</div>
        <div className="reached fs-5 fw-bold align-bottom text-end">0.85</div>
        <div className="objectives fs-6 mb-4 fw-bold">
          Objectives: {objectivesCounter},
        </div>
        <div className="key-result fs-6 fw-bold">
          KeyResults: {resultsCounter}
        </div>
        <div className="timestamp fs-6 mt-3 d-flex justify-content-evenly text-secondary">
          <div>
            <Calendar className="mb-1" />
          </div>
          <div>
            {parseDate(okr.startDate as string)} -{' '}
            {parseDate(okr.endDate as string)}
          </div>
          <div>
            <PencilFill
              className="mb-1 ms-1 text-gu-purple"
              onClick={openModal}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <OkrModal showModal={showModal} closeModal={closeModal} okr={okr} />
      )}
    </>
  );
};

export default OrkItem;
