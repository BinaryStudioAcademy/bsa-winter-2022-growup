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
    level: number;
    progressColor: string;
  };
}

const LevelNode: React.FC<Props> = ({ data }) => {
  const { acquiredSkills, totalSkills, level, progressColor } = data;

  return (
    <>
      <Handle className="node__handle" type="target" position={Position.Left} />
      <div className="d-flex">
        <LevelCard
          icon={
            <Progressbar
              percentage={calculatePercentage(acquiredSkills, totalSkills)}
              textColor={progressColor}
            />
          }
          title={`Level ${level}`}
          subtitle={`${acquiredSkills} / ${totalSkills} skill archived`}
        />
        <button className="node__arrow-button text-gu-pink m-3 border-0 align-self-center">
          <ArrowRight />
        </button>
      </div>
    </>
  );
};

export default LevelNode;
