import { useCallback, useState } from 'hooks/hooks';
import CareerJourneyForm from '../../profile-edit/career-journey-form/career-journey-form';
import { CareerJourney, Education, Interests, Skill } from '../interfaces';
import AddSection from '../add-section/add-section';
import CareerCard from '../career-card/career-card';
import EditSection from '../edit-section/edit-section';
import EducationCard from '../education-card/education-card';
import Tag from '../tag/tag';
import './profile-main.scss';

// FROM DB
const careerJourneyData: CareerJourney[] = [
  {
    id: '1',
    position: 'Fullstack JS Developer',
    company: 'Binary Studio',
    startDate: new Date('2020-01-30T03:24:00'),
    endDate: new Date(),
  },
  {
    id: '2',
    position: 'Fullstack JS Developer',
    company: 'Binary Studio',
    startDate: new Date('2021-12-17T03:24:00'),
    endDate: new Date(),
  },
];

// FROM DB
const educationData: Education[] = [
  {
    id: '1',
    specialization: 'Computer Science',
    university: 'Lviv Polytechnic National University',
    degree: 'Masters',
    startDate: new Date('2021-12-17T03:24:00'),
    endDate: new Date(),
  },
];

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = useCallback(() => setIsModalVisible(false), []);
  const showModal = useCallback(() => setIsModalVisible(true), []);

  return (
    <main className="profile-main">
      <div className="left-side">
        <AddSection title="Career journey" onButtonClick={showModal}>
          <>
            {careerJourneyData.map((item, i) => (
              <CareerCard
                key={i}
                position={item.position}
                company={item.company}
                startDate={item.startDate}
                endDate={item.endDate}
              />
            ))}
            <CareerJourneyForm
              show={isModalVisible}
              title={'Edit career journey'}
              onClose={closeModal}
            />
          </>
        </AddSection>
        <AddSection title="Education">
          {educationData.map((item, i) => (
            <EducationCard
              key={i}
              specialization={item.specialization}
              university={item.university}
              degree={item.degree}
              startDate={item.startDate}
              endDate={item.endDate}
            />
          ))}
        </AddSection>
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
