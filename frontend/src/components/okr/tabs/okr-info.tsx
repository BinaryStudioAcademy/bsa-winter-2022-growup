import { useAppSelector } from 'hooks/store/store.hooks';
import { ArrowLeft, Calendar } from 'react-bootstrap-icons';
import dayjs from 'dayjs';
import Objective from '../objective/objective';
import { useState } from 'react';
import NewObjectiveModal from '../modal/new-objective-modal';

interface IOkrInfoProps {
  id: string;
  goBackHanlder: () => void;
}

const OkrInfo: React.FC<IOkrInfoProps> = ({ id, goBackHanlder }) => {
  const okrItems = useAppSelector((store) => store.okr.okrs);
  const currentOkr = okrItems.find((item) => item.id == id);
  const [isShowCreateObjectiveModal, setIsShowCreateObjectiveModal] =
    useState(false);

  const openModal = (): void => setIsShowCreateObjectiveModal(true);
  const closeModal = (): void => setIsShowCreateObjectiveModal(false);

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
          <span className="cursor-pointer text-gu-blue hover-blue">
            close OKR
          </span>
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

          <span className="fs-4 text-gu-black fw-bold">0.49</span>
        </div>
      </div>
      <div className="okr__main d-flex flex-column">
        {currentOkr?.objectives?.map((item) => {
          return <Objective objective={item} />;
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
