import { IObjective } from 'common/interfaces/objective';
import KeyResult from './key-result';
import './style.scss';

interface Props {
  objective: IObjective;
}

const Objective: React.FC<Props> = ({ objective }) => {
  return (
    <>
      <div className="objective-header d-flex justify-content-between mt-5">
        <span className="fw-bold fs-4 text-gu-black">{objective.name}</span>
        <span className="fw-bold fs-4 text-gu-black">{objective.result}</span>
      </div>

      {objective.keyResults?.map((key, index) => {
        return (
          <div className="objective-main p-2" key={index}>
            <KeyResult name={key.name} result={key.result} />
          </div>
        );
      })}
    </>
  );
};

export default Objective;
