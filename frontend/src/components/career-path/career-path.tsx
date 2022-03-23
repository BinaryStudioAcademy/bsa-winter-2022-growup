import LevelFlow from './flow/level-flow';
import LevelDescription from './level-description/level-description';
import { nodes } from './level-description/data/nodes';
import { edges } from './level-description/data/edges';
import './styles.scss';

const CareerPath: React.FC = () => {
  return (
    <div className="career-path d-flex">
      <div className="w-100 h-100">
        <LevelFlow nodes={nodes} edges={edges} />
      </div>
      <LevelDescription />
    </div>
  );
};

export default CareerPath;
