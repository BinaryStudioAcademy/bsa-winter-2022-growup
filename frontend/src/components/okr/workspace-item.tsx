import React, { useState } from 'react';
import { Calendar, PencilFill } from 'react-bootstrap-icons';
import OkrModal from './modal';
import './styles.scss';
import { IOkr } from 'common/interfaces/okr';
import { StatusType } from 'store/okr/common';
import getOkrNumber from './get-okr-number';
import dayjs from 'dayjs';

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
  const score = getOkrNumber(okr);
  const openModal = (): void => {
    setShowModal(true);
  };
  const closeModal = (): void => setShowModal(false);

  return (
    <>
      <div
        className={`okr-container bg-white ms-3 mb-3 py-2 px-3 cursor-pointer
        ${okr.status == StatusType.close && 'okr-disable'}`}
        onClick={(): void => onClickInfo(okr.id)}
      >
        <div className="OKR-name fs-2 mt-2 fw-bold">{okr.name}</div>
        <div className="reached fs-5 fw-bold align-bottom text-end">
          {score}
        </div>
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
            {dayjs(okr?.startDate).format('DD/MM/YYYY')}
            <span className="ms-1">
              <span>- </span>
              {okr?.endDate ? dayjs(okr?.endDate).format('DD/MM/YYYY') : null}
            </span>
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
