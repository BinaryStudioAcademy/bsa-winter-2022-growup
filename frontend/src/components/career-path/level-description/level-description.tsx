import './level-description.scss';
import { technicalSkills } from './data/technical-skills';
import TechnicalSkills from './technical-skills';

const LevelDescription: React.FC = () => {
  return (
    <div className="level-description bg-white overflow-hidden">
      <div className="level-description__title d-grid bg-gu-blue">
        <span className="fs-5 fw-bold text-white">Level</span>
        <span className="level-description__subtitle fs-6">
          33 / 35 skills archived
        </span>
      </div>
      <div className="level-description__content position-relative h-100 overflow-auto">
        <p className="fs-5 fw-bold">Technical skills</p>
        {technicalSkills.map(({ name, skills }) => (
          <>
            <p className="level-description__subtitle fs-6 fw-bold">{name}</p>
            <TechnicalSkills skills={skills} />
          </>
        ))}
      </div>
    </div>
  );
};

export default LevelDescription;
