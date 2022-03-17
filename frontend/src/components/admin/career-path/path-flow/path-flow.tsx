import './styles.scss';
import Node from '../path-node/path-node';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { careerPathActions } from 'store/career-path';
import { CareerPathPlaceholders as Placeholder } from '../common/enums';

const PathFlow: React.FC = () => {
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

  const deleteDomain = (domainId: string): void => {
    dispatch(careerPathActions.deleteDomain(domainId));
  };

  const addLevel = (domainId: string): void => {
    dispatch(
      careerPathActions.createLevel({ domainId, name: Placeholder.LEVEL }),
    );
  };

  const deleteLevel = (levelId: string): void => {
    dispatch(
      careerPathActions.deleteLevel({
        id: levelId,
        domainId: domainItemId,
        name: '',
      }),
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

  const deleteSkill = (skillId: string): void => {
    dispatch(
      careerPathActions.deleteSkill({
        id: skillId,
        levelId: levelItemId,
        domainId: domainItemId,
        name: '',
      }),
    );
  };

  const addObjective = (skillId: string): void => {
    dispatch(
      careerPathActions.createObjective({
        skillId,
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

  const deleteObjective = (objectiveId: string): void => {
    dispatch(
      careerPathActions.deleteObjective({
        id: objectiveId,
        skillId: skillItemId,
        levelId: levelItemId,
        domainId: domainItemId,
        name: '',
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
          className="btn btn-primary"
          value="+ Add domain"
          type="submit"
        />
      </div>
      <div className="tree-level">
        {domains.map(({ domain }, domainIndex) => (
          <Node
            key={domainIndex}
            name={domain.name}
            onClick={(): void => setDomainItemId(domain.id)}
            onAdd={(): void => addLevel(domain.id)}
            onEdit={editDomain}
            onDelete={(): void => deleteDomain(domain.id)}
            className={domain.id === domainItemId ? 'bg-gu-purple' : ''}
          />
        ))}
      </div>
      <div className="tree-level">
        {levels.map(({ id, name }, levelIndex) => (
          <Node
            key={levelIndex}
            name={name}
            onClick={(): void => setLevelItemId(id)}
            onAdd={(): void => addSkill(id)}
            onEdit={editLevel}
            onDelete={(): void => deleteLevel(id)}
            className={id === levelItemId ? 'bg-gu-purple' : ''}
          />
        ))}
      </div>
      <div className="tree-level">
        {skills.map(({ id, name }, skillIndex) => (
          <Node
            key={skillIndex}
            name={name}
            onClick={(): void => setSkillItemId(id)}
            onAdd={(): void => addObjective(id)}
            onEdit={editSkill}
            onDelete={(): void => deleteSkill(id)}
            className={id === skillItemId ? 'bg-gu-purple' : ''}
          />
        ))}
      </div>
      <div className="tree-level">
        {objectives.map(({ id, name }, objectiveIndex) => (
          <Node
            key={objectiveIndex}
            name={name}
            className="bg-gu-pink"
            onClick={(): void => setObjectiveItemId(id)}
            onEdit={editObjective}
            onDelete={(): void => deleteObjective(id)}
            leaf
          />
        ))}
      </div>
    </div>
  );
};

export default PathFlow;
