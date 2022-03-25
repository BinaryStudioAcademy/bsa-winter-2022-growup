import { Handle, Position } from 'react-flow-renderer';
import { ArrowRight } from 'react-bootstrap-icons';
import LevelCard from '../level-card/level-card';
import Progressbar from '../progressbar/progressbar';
import { calculatePercentage } from 'helpers/percentage/percentage';
import './node.scss';

interface Props {
  data: {
    acquiredSkills: number;
    totalSkills: number;
    level: string;
    onClick: () => void;
  };
}

const LevelNode: React.FC<Props> = ({ data }) => {
  const { acquiredSkills, totalSkills, level, onClick } = data;

  return (
    <>
      <Handle className="node__handle" type="target" position={Position.Left} />
      <div className="d-flex">
        <LevelCard
          icon={
            <Progressbar
              percentage={calculatePercentage(acquiredSkills, totalSkills)}
            />
          }
          title={level}
          subtitle={`${acquiredSkills} / ${totalSkills} skill archived`}
        />
        <button
          className="node__arrow-button text-gu-pink m-3 border-0 align-self-center"
          onClick={onClick}
        >
          <ArrowRight />
        </button>
      </div>
    </>
  );
};

export default LevelNode;
