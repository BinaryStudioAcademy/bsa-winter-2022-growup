import { Form } from 'react-bootstrap';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { careerPathActions } from 'store/career-path';
import { CareerPathPlaceholders as Placeholder } from '../common/enums';

import { NotificationManager } from 'react-notifications';

import { Button } from 'components/common/common';
import Node from '../path-node/path-node';

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
    )
      .unwrap()
      .catch((err) => NotificationManager.error(err.message));
  };

  const editSkill = (name: string): void => {
    dispatch(
      careerPathActions.updateSkill({
        id: skillItemId,
        levelId: levelItemId,
        domainId: domainItemId,
        name,
      }),
    )
      .unwrap()
      .catch((err) => NotificationManager.error(err.message));
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
    )
      .unwrap()
      .catch((err) => NotificationManager.error(err.message));
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
    )
      .unwrap()
      .catch((err) => NotificationManager.error(err.message));
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
    <div className="d-flex flex-column gap-5">
      <div className="d-flex gap-2 align-items-center">
        <Form.Group className="flex-fill">
          <Form.Control
            placeholder="Domain"
            onChange={handleChangeInput}
            value={inputDomain}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="outline-gu-pink"
          className="btn-hover-gu-white"
          onClick={(): void => addDomain(inputDomain)}
        >
          + Add domain
        </Button>
      </div>
      {!!domains.length && (
        <div className="d-flex flex-wrap gap-4">
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
      )}
      {!!levels.length && (
        <div className="d-flex flex-wrap gap-4">
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
      )}
      {!!skills.length && (
        <div className="d-flex flex-wrap gap-4">
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
      )}
      {!!objectives.length && (
        <div className="d-flex flex-wrap gap-4">
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
      )}
    </div>
  );
};

export default PathFlow;
