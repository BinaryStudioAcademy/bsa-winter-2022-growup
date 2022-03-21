import LevelFlow from './flow/level-flow';
import LevelDescription from './level-description/level-description';
import { nodes } from './level-description/data/nodes';
import { edges } from './level-description/data/edges';

const CareerPath: React.FC = () => {
  return (
    <div className="d-flex">
      <LevelFlow nodes={nodes} edges={edges} />
      <LevelDescription />
    </div>
  );
};

export default CareerPath;
