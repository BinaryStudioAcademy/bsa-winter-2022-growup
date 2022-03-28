import { IObjective } from 'common/interfaces/objective';
import { useState } from 'hooks/hooks';
import ListComponent from './list-component';
import './style.scss';
import Tolls from './tools';

interface Props {
  objective: IObjective;
}

const Objective: React.FC<Props> = ({ objective }) => {
  const [showTools, setShowTools] = useState(false);

  const listComponentHanlder = (): void => setShowTools(true);
  const closeTools = (): void => setShowTools(false);

  return (
    <>
      <div className="objective-header d-flex justify-content-between mt-5">
        <span className="fw-bold fs-4 text-gu-black">{objective.name}</span>
        <span className="fw-bold fs-4 text-gu-black">{objective.result}</span>
      </div>
      <div className="objective-main p-3 d-flex  mt-2 rounded align-items-center">
        <span className="d-inline-block me-auto">Key Title 1</span>
        <div className="d-flex align-items-center">
          <span className="fw-bold fs-4">0.3</span>
          <div>
            {showTools ? (
              <Tolls closeTools={closeTools}></Tolls>
            ) : (
              <div
                className="text-gu-black fs-4 list-component position-relative cursor-pointer"
                onClick={listComponentHanlder}
              >
                <ListComponent />
              </div>
            )}
          </div>
        </div>
      </div>
      {objective.keyResults?.map((key, index) => {
        return (
          <div className="objective-main p-2" key={index}>
            <span>Key Title 1</span>

            <span>0.3</span>
          </div>
        );
      })}
    </>
  );
};

export default Objective;
