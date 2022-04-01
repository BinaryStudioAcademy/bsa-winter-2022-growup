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
        className={`okr-container d-flex flex-column bg-white py-3 px-3 w-100
        ${
          okr.status == StatusType.close
            ? 'border-0 okr-disable pe-none'
            : 'cursor-pointer'
        }
        `}
        onClick={(): void => onClickInfo(okr.id)}
      >
        <div className="d-flex justify-content-between">
          <div className="OKR-name fs-2  fw-bold mb-2">{okr.name}</div>
          <div className="reached fs-5 fw-bold">{score}</div>
        </div>

        <div className="d-flex mb-auto">
          <span className="objectives fs-6 mb-4 fw-bold me-2">
            Objectives: {objectivesCounter}
          </span>
          <span className="key-result fs-6 fw-bold">
            KeyResults: {resultsCounter}
          </span>
        </div>

        <div className="timestamp fs-6  d-flex text-secondary  align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="me-2">
              <Calendar className="mb-1" />
            </div>
            <div>
              {dayjs(okr?.startDate).format('DD/MM/YYYY')}
              <span className="ms-1">
                <span>- </span>
                {okr?.endDate ? dayjs(okr?.endDate).format('DD/MM/YYYY') : null}
              </span>
            </div>
          </div>

          <div>
            <PencilFill className="me-1 text-gu-purple" onClick={openModal} />
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
