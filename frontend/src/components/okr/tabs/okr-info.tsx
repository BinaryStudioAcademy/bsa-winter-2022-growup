import { useAppSelector, useAppDispatch } from 'hooks/store/store.hooks';
import { ArrowLeft, Calendar } from 'react-bootstrap-icons';
import dayjs from 'dayjs';
import Objective from '../objective/objective';
import { useState } from 'react';
import NewObjectiveModal from '../modal/new-objective-modal';
import * as okrActions from '../../../store/okr/actions';
import { NotificationManager } from 'react-notifications';
import getOkrNumber from '../getOkrNumber';
import { IOkr } from 'common/interfaces/okr';

interface IOkrInfoProps {
  id: string;
  goBackHanlder: () => void;
}

const OkrInfo: React.FC<IOkrInfoProps> = ({ id, goBackHanlder }) => {
  const okrItems = useAppSelector((store) => store.okr.okrs);
  const dispatch = useAppDispatch();
  const currentOkr = okrItems.find((item) => item.id == id) as IOkr;
  const [isShowCreateObjectiveModal, setIsShowCreateObjectiveModal] =
    useState(false);
  const score = getOkrNumber(currentOkr);
  const openModal = (): void => setIsShowCreateObjectiveModal(true);
  const closeModal = (): void => setIsShowCreateObjectiveModal(false);
  const closeOkrHandler = (): void => {
    dispatch(okrActions.closeOkr({ okrId: id }));
    goBackHanlder();
  };
  const deteOkrHandler = (): void => {
    dispatch(okrActions.deleteOkr({ okrId: id }))
      .unwrap()
      .then(() => {
        NotificationManager.success('OKR was deleted successfully');
      })
      .catch(() => {
        NotificationManager.error('Can`t delete OKR');
      });
    goBackHanlder();
  };

  return (
    <>
      <div className="okr__header">
        <div className="d-flex justify-content-between mb-4">
          <span
            className="fs-6 cursor-pointer d-flex align-items-center hover-black"
            onClick={goBackHanlder}
          >
            <ArrowLeft className="me-2" />
            back
          </span>
          <div className="d-flex flex-column justify-content-end text-end">
            <span
              className="cursor-pointer text-gu-blue hover-blue"
              onClick={closeOkrHandler}
            >
              close OKR
            </span>
            <span
              className="cursor-pointer text-gu-pink mt-2"
              onClick={deteOkrHandler}
            >
              delete OKR
            </span>
          </div>
        </div>
        <div className="fs-2 text-gu-black fw-bold mb-2">
          {currentOkr?.name}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span className="text-gu-blue fs-6 d-flex align-items-center">
              <Calendar className="me-2" />
              {dayjs(currentOkr?.startDate).format('DD/MM/YYYY')}
              <span className="ms-1">
                <span>- </span>
                {currentOkr?.endDate
                  ? dayjs(currentOkr?.endDate).format('DD/MM/YYYY')
                  : null}
              </span>
            </span>
            <span
              className="text-gu-blue ms-3 fs-6 cursor-pointer fw-bold d-flex align-items-center hover-blue"
              onClick={openModal}
            >
              <span className="me-1">+</span>Add objectives
            </span>
          </div>

          <span className="fs-4 text-gu-black fw-bold">{score}</span>
        </div>
      </div>
      <div className="okr__main d-flex flex-column">
        {currentOkr?.objectives?.map((item, index) => {
          return <Objective objective={item} key={index} okrId={id} />;
        })}
      </div>
      {isShowCreateObjectiveModal && (
        <NewObjectiveModal
          showModal={isShowCreateObjectiveModal}
          closeModal={closeModal}
          okrId={id}
        />
      )}
    </>
  );
};

export default OkrInfo;
