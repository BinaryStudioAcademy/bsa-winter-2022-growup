import './level-description.scss';
import { v4 as uuidv4 } from 'uuid';
import TechnicalSkills from './technical-skills';
import { IAllTechnicalSkills } from '../common/interfaces';

interface Props {
  level: string;
  acquiredSkills: number;
  totalSkills: number;
  technicalSkills: IAllTechnicalSkills[];
}

const LevelDescription: React.FC<Props> = ({
  level,
  acquiredSkills,
  totalSkills,
  technicalSkills,
}) => {
  return (
    <div className="level-description bg-white">
      <div className="level-description__title d-grid bg-gu-blue">
        <span className="fs-5 fw-bold text-white">{level}</span>
        <span className="level-description__subtitle fs-6">
          {acquiredSkills} / {totalSkills} skills archived
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
