import { IObjective } from 'common/interfaces/objective';
import { Button } from 'components/common/common';
import { Pencil, Trash } from 'react-bootstrap-icons';
import KeyResult from './key-result';
import './style.scss';
import * as okrActions from 'store/okr/actions';
import { useAppDispatch } from 'hooks/hooks';
import { NotificationManager } from 'react-notifications';

interface Props {
  objective: IObjective;
  okrId: string;
  isClosedOkr: boolean;
  setObjective: (id: string) => void;
  openUpdateModal: () => void;
}

const Objective: React.FC<Props> = ({
  objective,
  okrId,
  isClosedOkr,
  setObjective,
  openUpdateModal,
}) => {
  const dispatch = useAppDispatch();
  const deleteObjectiveHandler = (): void => {
    dispatch(okrActions.deleteObjective({ objectiveId: objective.id, okrId }))
      .unwrap()
      .then(() => {
        NotificationManager.success('Objective was deleted successfully');
      })
      .catch(() => {
        NotificationManager.error('Can`t delete objective');
      });
  };
  const editObject = (): void => {
    setObjective(objective.id);
    openUpdateModal();
  };
  return (
    <>
      <div className="objective-header d-flex justify-content-between mt-5">
        <span className="fw-bold fs-4 text-gu-black">{objective.name}</span>
        <div className="d-flex align-items-center">
          <span className="fw-bold fs-4 text-gu-black me-2">
            {objective.result}
          </span>
          <Button
            className="border-0 bg-transparent text-gu-black hover-pink p-1"
            disabled={isClosedOkr}
            onClick={editObject}
          >
            <Pencil />
          </Button>
          <Button
            className="border-0 bg-transparent text-gu-black hover-pink p-1"
            disabled={isClosedOkr}
            onClick={deleteObjectiveHandler}
          >
            <Trash />
          </Button>
        </div>
      </div>

      {objective.keyResults?.map((key, index) => {
        return <KeyResult name={key.name} result={key.result} key={index} />;
      })}
    </>
  );
};

export default Objective;
