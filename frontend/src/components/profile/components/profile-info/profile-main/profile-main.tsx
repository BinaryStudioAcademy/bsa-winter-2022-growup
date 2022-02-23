import { Interests, Skill } from '../interfaces';
import EditSection from '../edit-section/edit-section';
import CareerJourneySection from './career-journey-section';
import EducationSection from './education-section';
import Tag from '../tag/tag';
import './profile-main.scss';

// FROM DB
const skillData: Skill[] = [
  {
    id: '1',
    name: 'HTML',
  },
  {
    id: '2',
    name: 'CSS',
  },
];

// FROM DB
const interestsData: Interests[] = [
  {
    id: '1',
    name: 'Lviv',
  },
  {
    id: '2',
    name: 'Remote',
  },
];

const ProfileMain: React.FC = () => {
  return (
    <main className="profile-main">
      <div className="left-side">
        <CareerJourneySection />
        <EducationSection />
      </div>
      <div className="right-side">
        <EditSection title="Skills">
          <div className="group">
            <h4 className="group__title fw-bold fs-7">Technical skills</h4>
            {skillData.map((item, i) => (
              <Tag key={i}>{item.name}</Tag>
            ))}
          </div>
          <div className="group">
            <h4 className="group__title fw-bold fs-7">Language</h4>
            <Tag>English</Tag>
            <Tag>French</Tag>
          </div>
        </EditSection>
        <EditSection title="Interests">
          <div className="group fw-bold fs-7">
            {interestsData.map((item, i) => (
              <Tag key={i}>{item.name}</Tag>
            ))}
          </div>
        </EditSection>
      </div>
    </main>
  );
};

export default ProfileMain;
