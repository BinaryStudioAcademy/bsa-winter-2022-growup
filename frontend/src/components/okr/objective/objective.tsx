import { IObjective } from 'common/interfaces/objective';

interface Props {
  objective: IObjective;
}

const Objective: React.FC<Props> = ({ objective }) => {
  return (
    <>
      <div className="objective-header d-flex justify-content-between">
        <span className="fw-bold fs-5 text-gu-black">{objective.name}</span>
        <span className="fw-bold fs-5 text-gu-black">{objective.result}</span>
      </div>
      {objective.keyResults?.map((key, index) => {
        return (
          <div className="objective-main" key={index}>
            {key.name}
          </div>
        );
      })}
    </>
  );
};

export default Objective;
