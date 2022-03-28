import { useState } from 'hooks/hooks';
import ListComponent from './list-component';
import Tolls from './tools';

interface Props {
  name: string;
  result?: number;
}

const KeyResult: React.FC<Props> = ({ name, result }) => {
  const [showTools, setShowTools] = useState(false);

  const listComponentHanlder = (): void => setShowTools(true);
  const closeTools = (): void => setShowTools(false);

  return (
    <div className="objective-main p-3 d-flex  mt-2 rounded align-items-center">
      <span className="d-inline-block me-auto">{name}</span>
      <div className="d-flex align-items-center">
        <span className="fw-bold fs-4">{result}</span>
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
  );
};
export default KeyResult;
