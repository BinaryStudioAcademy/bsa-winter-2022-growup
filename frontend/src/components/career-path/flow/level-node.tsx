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
      <Handle
        style={{ visibility: 'hidden' }}
        type="target"
        position={Position.Left}
      />
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
    </>
  );
};

export default LevelNode;
