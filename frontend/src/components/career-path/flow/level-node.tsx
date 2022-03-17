import { Handle, Position } from 'react-flow-renderer';
import LevelCard from '../level-card/level-card';
import Progressbar from '../progressbar/progressbar';
import { calculatePercentage } from 'helpers/percentage/percentage';

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
      <Handle type="target" position={Position.Top} />
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
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </>
  );
};

export default LevelNode;
