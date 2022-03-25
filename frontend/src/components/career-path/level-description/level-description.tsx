import './level-description.scss';
import { v4 as uuidv4 } from 'uuid';
import { ISkills } from '../common/interfaces';
import TechnicalSkills from './technical-skills';

interface Props {
  level: string;
  technicalSkills: ISkills[];
}

const LevelDescription: React.FC<Props> = ({ level, technicalSkills }) => {
  return (
    <div className="level-description bg-white ms-3">
      <div className="level-description__title d-grid bg-gu-blue">
        <span className="fs-5 fw-bold text-white">{level}</span>
        <span className="level-description__subtitle fs-6">
          33 / 35 skills archived
        </span>
      </div>
      <div className="level-description__content bg-white position-relative overflow-auto">
        <p className="fs-5 fw-bold">Technical skills</p>
        {technicalSkills.map(({ name, skills }) => (
          <div key={uuidv4()}>
            <p className="level-description__subtitle fs-6 fw-bold">{name}</p>
            <TechnicalSkills skills={skills} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelDescription;
