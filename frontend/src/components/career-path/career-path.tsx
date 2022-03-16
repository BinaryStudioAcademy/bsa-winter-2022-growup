import './styles.scss';
import Node from './path-node/path-node';
// import { Plus as AddIcon } from 'react-bootstrap-icons';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { careerPathActions } from 'store/career-path';
import { CareerPathPlaceholders as Placeholder } from './common/enums';

const CareerPath: React.FC = () => {
  const domains = useAppSelector((state) => state.careerPath.domains) || [];

  const dispatch = useAppDispatch();

  const [domainItemId, setDomainItemId] = useState('');
  const [levelItemId, setLevelItemId] = useState('');
  const [skillItemId, setSkillItemId] = useState('');
  const [objectiveItemId, setObjectiveItemId] = useState('');
  const [inputDomain, setInputDomain] = useState('');

  useEffect(() => {
    dispatch(careerPathActions.fetchDomains());
  }, [dispatch]);

  const levels =
    domains.find((domain) => domain.domain.id === domainItemId)?.levels || [];
  const skills = levels.find((level) => level.id === levelItemId)?.skills || [];
  const objectives =
    skills.find((skill) => skill.id === skillItemId)?.objectives || [];

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputDomain(e.target.value);
  };

  const addDomain = (name: string): void => {
    if (name) {
      dispatch(careerPathActions.createDomain({ name: inputDomain }));
    }

    setInputDomain('');
  };

  const editDomain = (name: string): void => {
    dispatch(careerPathActions.updateDomain({ id: domainItemId, name }));
  };

  const addLevel = (domainId: string): void => {
    dispatch(
      careerPathActions.createLevel({ domainId, name: Placeholder.LEVEL }),
    );
  };

  const editLevel = (name: string): void => {
    dispatch(
      careerPathActions.updateLevel({
        id: levelItemId,
        domainId: domainItemId,
        name,
      }),
    );
  };

  const addSkill = (levelId: string): void => {
    dispatch(
      careerPathActions.createSkill({
        levelId,
        domainId: domainItemId,
        name: Placeholder.SKILL,
      }),
    );
  };

  const editSkill = (name: string): void => {
    dispatch(
      careerPathActions.updateSkill({
        id: skillItemId,
        levelId: levelItemId,
        domainId: domainItemId,
        name,
      }),
    );
  };

  const addObjective = (): void => {
    dispatch(
      careerPathActions.createObjective({
        skillId: skillItemId,
        levelId: levelItemId,
        domainId: domainItemId,
        name: Placeholder.OBJECTIVE,
      }),
    );
  };

  const editObjective = (name: string): void => {
    dispatch(
      careerPathActions.updateObjective({
        id: objectiveItemId,
        skillId: skillItemId,
        levelId: levelItemId,
        domainId: domainItemId,
        name,
      }),
    );
  };

  return (
    <div className="path-tree">
      <div className="d-flex tree-action">
        <input
          type="text"
          placeholder="Domain"
          onChange={(e): void => handleChangeInput(e)}
          value={inputDomain}
          className="form-control me-4"
        />
        <input
          onClick={(): void => addDomain(inputDomain)}
          className="btn btn-primary tree-action__add-button"
          value="+ Add domain"
          type="submit"
        />
      </div>
      <div className="tree-level">
        {domains.map((domain, domainIndex) => (
          <Node
            key={domainIndex}
            name={domain.domain.name}
            onClick={(): void => setDomainItemId(domain.domain.id)}
            onAdd={(): void => addLevel(domain.domain.id)}
            onEdit={editDomain}
            className={domain.domain.id === domainItemId ? 'bg-gu-purple' : ''}
          />
        ))}
      </div>
      <div className="tree-level">
        {levels.map((level, levelIndex) => (
          <Node
            key={levelIndex}
            name={level.name}
            onClick={(): void => setLevelItemId(level.id)}
            onAdd={(): void => addSkill(level.id)}
            onEdit={editLevel}
            className={level.id === levelItemId ? 'bg-gu-purple' : ''}
          />
        ))}
      </div>
      <div className="tree-level">
        {skills.map((skill, skillIndex) => (
          <Node
            key={skillIndex}
            name={skill.name}
            onClick={(): void => setSkillItemId(skill.id)}
            onAdd={addObjective}
            onEdit={editSkill}
            className={skill.id === skillItemId ? 'bg-gu-purple' : ''}
          />
        ))}
      </div>
      <div className="tree-level">
        {objectives.map((objective, objectiveIndex) => (
          <Node
            key={objectiveIndex}
            name={objective.name}
            className="bg-gu-pink"
            onClick={(): void => setObjectiveItemId(objective.id)}
            onEdit={editObjective}
            leaf
          />
        ))}
      </div>
    </div>
  );
};

export default CareerPath;
