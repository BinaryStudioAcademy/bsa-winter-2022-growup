import { useAppDispatch, useAppSelector } from 'hooks/store/store.hooks';
import {
  ArrowLeft,
  Calendar,
  PencilFill,
  Trash,
  XLg,
} from 'react-bootstrap-icons';
import dayjs from 'dayjs';
import Objective from '../objective/objective';
import React, { useState } from 'react';
import NewObjectiveModal from '../modal/new-objective-modal';
import * as okrActions from '../../../store/okr/actions';
import UpdateObjectiveModal from '../modal/update-objective-modal';
import { NotificationManager } from 'react-notifications';
import getOkrNumber from '../get-okr-number';
import OkrForm from './okr-form/okr-form';
import { IOkr } from 'common/interfaces/okr';

interface IOkrInfoProps {
  id: string;
  goBackHandler: () => void;
}

const OkrInfo: React.FC<IOkrInfoProps> = ({ id, goBackHandler }) => {
  const dispatch = useAppDispatch();
  const okrItems = useAppSelector((store) => store.okr.okrs);

  const [isShowCreateObjectiveModal, setIsShowCreateObjectiveModal] =
    useState(false);
  const [isShowUpdateObjectiveModal, setIsShowUpdateObjectiveModal] =
    useState(false);
  const [isShowEditOkrModal, setIsShowEditOkrModal] = useState(false);
  const [objectiveId, setObjectiveId] = useState('');

  const currentOkr = okrItems.find((item) => item.id == id) as IOkr;
  const score = getOkrNumber(currentOkr);
  const setObjective = (id: string): void => setObjectiveId(id);

  const openModal = (): void => setIsShowCreateObjectiveModal(true);
  const closeModal = (): void => setIsShowCreateObjectiveModal(false);
  const openUpdateModal = (): void => setIsShowUpdateObjectiveModal(true);
  const closeUpdateModal = (): void => setIsShowUpdateObjectiveModal(false);
  const openEditOkrModal = (): void => setIsShowEditOkrModal(true);
  const closeEditOkrModal = (): void => setIsShowEditOkrModal(false);

  const closeOkrHandler = (): void => {
    dispatch(okrActions.closeOkr({ okrId: id }));
    goBackHandler();
  };

  const handleSubmit = (values: object): void => {
    dispatch(okrActions.updateOkrById_async({ ...currentOkr, ...values }))
      .unwrap()
      .then(() => {
        NotificationManager.success('OKR was deleted successfully');
      })
      .catch(() => {
        NotificationManager.error('Can`t delete OKR');
      });
    goBackHandler();
  };

  const deleteOkrHandler = (): void => {
    dispatch(okrActions.deleteOkr({ okrId: id }))
      .unwrap()
      .then(() => {
        NotificationManager.success('OKR was deleted successfully');
      })
      .catch(() => {
        NotificationManager.error('Can`t delete OKR');
      });
    goBackHandler();
  };

  return (
    <>
      <div className="okr__header">
        <div className="d-flex justify-content-between mb-4">
          <span
            className="fs-6 cursor-pointer d-flex align-items-center hover-black"
            onClick={goBackHandler}
          >
            <ArrowLeft className="me-2" />
            back
          </span>
          <div className="d-flex flex-column justify-content-end text-end">
            <span
              className="cursor-pointer text-gu-purple hover-pink"
              onClick={closeOkrHandler}
            >
              <XLg />
            </span>
            <span
              className="cursor-pointer text-gu-purple hover-pink mt-2"
              onClick={deleteOkrHandler}
            >
              <Trash />
            </span>
          </div>
        </div>
        <>
          <span className="fs-2 text-gu-black fw-bold mb-2">
            {currentOkr?.name}
          </span>
          <button
            className="mb-2 ms-2 cursor-pointer border-0 bg-transparent"
            onClick={openEditOkrModal}
          >
            {isShowEditOkrModal}
            <PencilFill className="mb-1 text-gu-purple hover-pink" />
          </button>
          {isShowEditOkrModal && (
            <OkrForm
              okr={currentOkr}
              onClose={closeEditOkrModal}
              onSubmit={handleSubmit}
            />
          )}
        </>
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
              <span className="me-1">+</span>Add objective
            </span>
          </div>

          <span className="fs-4 text-gu-black fw-bold">{score}</span>
        </div>
      </div>
      <div className="okr__main d-flex flex-column">
        {currentOkr?.objectives?.map((item, index) => {
          return (
            <Objective
              objective={item}
              key={index}
              okrId={id}
              openUpdateModal={openUpdateModal}
              setObjective={setObjective}
            />
          );
        })}
      </div>
      {isShowCreateObjectiveModal && (
        <NewObjectiveModal
          showModal={isShowCreateObjectiveModal}
          closeModal={closeModal}
          okrId={id}
        />
      )}
      {isShowUpdateObjectiveModal ? (
        <UpdateObjectiveModal
          showModal={isShowUpdateObjectiveModal}
          closeModal={closeUpdateModal}
          okrId={id}
          objectiveId={objectiveId}
        />
      ) : (
        true
      )}
    </>
  );
};

export default OkrInfo;
