import LevelFlow from './flow/level-flow';
import { useEffect, useState } from 'hooks/hooks';
import LevelDescription from './level-description/level-description';
import { getFlowData } from './mock/helpers/get-flow-data';
import { IAllTechnicalSkills } from './common/interfaces';
import { mockData } from './mock/mock';
import './styles.scss';

const CareerPath: React.FC = () => {
  const [levelId, setLevelId] = useState<string>(
    '43d25479-4e75-458d-87c1-8273b8f6eec0',
  );
  const [levelName, setLevelName] = useState<string>('');
  const [skills, setSkills] = useState<IAllTechnicalSkills[]>([]);

  const { nodes, edges, initialSkill } = getFlowData(
    mockData,
    levelId,
    (
      technicalSkills: IAllTechnicalSkills[],
      id: string,
      level: string,
    ): void => {
      setSkills(technicalSkills);
      setLevelId(id);
      setLevelName(level);
    },
  );

  useEffect(() => {
    setLevelName(initialSkill.name);
    setSkills(initialSkill.skills);
  }, []);

  return (
    <div className="career-path d-flex">
      <div className="w-100 h-100">
        <LevelFlow nodes={nodes} edges={edges} />
      </div>
      <LevelDescription level={levelName} technicalSkills={skills} />
    </div>
  );
};

export default CareerPath;
