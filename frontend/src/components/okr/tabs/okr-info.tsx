import { useAppDispatch, useAppSelector } from 'hooks/store/store.hooks';
import { ArrowLeft, Calendar, Trash, XLg } from 'react-bootstrap-icons';
import dayjs from 'dayjs';
import Objective from '../objective/objective';
import { useState } from 'react';
import NewObjectiveModal from '../modal/new-objective-modal';
import * as okrActions from '../../../store/okr/actions';
import UpdateObjectiveModal from '../modal/update-objective-modal';
import { NotificationManager } from 'react-notifications';
import getOkrNumber from '../get-okr-number';
import { IOkr } from 'common/interfaces/okr';

interface IOkrInfoProps {
  id: string;
  goBackHandler: () => void;
}

const OkrInfo: React.FC<IOkrInfoProps> = ({ id, goBackHandler }) => {
  const okrItems = useAppSelector((store) => store.okr.okrs);
  const dispatch = useAppDispatch();
  const currentOkr = okrItems.find((item) => item.id == id) as IOkr;
  const [isShowCreateObjectiveModal, setIsShowCreateObjectiveModal] =
    useState(false);
  const [isShowUpdateObjectiveModal, setIsShowUpdateObjectiveModal] =
    useState(false);
  const [objectiveId, setObjectiveId] = useState('');
  const score = getOkrNumber(currentOkr);
  const openModal = (): void => setIsShowCreateObjectiveModal(true);
  const closeModal = (): void => setIsShowCreateObjectiveModal(false);
  const openUpdateModal = (): void => setIsShowUpdateObjectiveModal(true);
  const closeUpdateModal = (): void => setIsShowUpdateObjectiveModal(false);
  const closeOkrHandler = (): void => {
    dispatch(okrActions.closeOkr({ okrId: id }));
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
  const setObjective = (id: string): void => setObjectiveId(id);

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
