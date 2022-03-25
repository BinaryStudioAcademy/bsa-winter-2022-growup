import LevelFlow from './flow/level-flow';
import { useAppSelector, useEffect, useState } from 'hooks/hooks';
import LevelDescription from './level-description/level-description';
import { getFlowData } from './mock/helpers/get-flow-data';
import { ISkills } from './common/interfaces';
import mock from './mock';
import './styles.scss';

const CareerPath: React.FC = () => {
  const [level, setLevel] = useState<string>('');
  const [skills, setSkills] = useState<ISkills[]>([]);
  const position =
    useAppSelector((state) => state.profile.user?.position) || '';

  const { nodes, edges, initialSkill } = getFlowData(
    mock,
    position,
    (e: ISkills[], level: string): void => {
      setLevel(level);
      setSkills(e);
    },
  );

  useEffect(() => {
    setLevel(initialSkill.name);
    setSkills(initialSkill.skills);
  }, []);

  return (
    <div className="career-path d-flex">
      <div className="w-100 h-100">
        <LevelFlow nodes={nodes} edges={edges} />
      </div>
      <LevelDescription level={level} technicalSkills={skills} />
    </div>
  );
};

export default CareerPath;
