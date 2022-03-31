import LevelFlow from './flow/level-flow';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import LevelDescription from './level-description/level-description';
import { getFlowData } from './helpers/get-flow-data';
import { fetchAllLevels } from 'store/career-path/actions';
import { IAllTechnicalSkills } from './common/interfaces';
import './styles.scss';

const CareerPath: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentLevel = useAppSelector((state) => state.auth.user?.level);
  const levelData = useAppSelector((state) => state.careerPath.levels);

  const [levelId, setLevelId] = useState<string>(currentLevel?.id || '');
  const [levelName, setLevelName] = useState<string>('');
  const [skills, setSkills] = useState<IAllTechnicalSkills[]>([]);

  const { nodes, edges, initialSkill } = getFlowData(
    levelData,
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
    dispatch(fetchAllLevels(currentLevel?.id || ''));
  }, [currentLevel?.id]);

  useEffect(() => {
    setLevelName(initialSkill.name);
    setSkills(initialSkill.skills);
  }, [levelData]);

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
