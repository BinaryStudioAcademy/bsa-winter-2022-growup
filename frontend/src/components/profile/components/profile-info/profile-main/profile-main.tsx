import { CareerJourney, Education, Interests, Skill } from '../interfaces';
import AddSection from '../add-section/add-section';
import CareerCard from '../career-card/career-card';
import EditSection from '../edit-section/edit-section';
import EducationCard from '../education-card/education-card';
import Tag from '../tag/tag';
import './profile-main.scss';
import { useState, useCallback, useEffect } from 'hooks/hooks';
import TagModal from './tags/modal/tag-modal';
import { PencilFill } from 'react-bootstrap-icons';
import { adminActions } from 'store/actions';
import { useAppDispatch } from 'hooks/store/store.hooks';

// FROM DB
const careerJourneyData: CareerJourney[] = [
  {
    id: '1',
    title: 'Fullstack JS Developer',
    position: 'Fullstack JS Developer',
    company: 'Binary Studio',
    startDate: new Date('2020-01-30T03:24:00'),
    endDate: new Date(),
  },
  {
    id: '2',
    title: 'Fullstack JS Developer',
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
    title: 'Computer Science',
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
  {
    id: '3',
    name: 'JS Developer',
  },
];

const ProfileMain: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  const showModal = (): void => setIsModalVisible(true);
  useEffect(() => {
    dispatch(adminActions.fetchTags());
  }, [dispatch]);

  return (
    <main className="profile-main">
      <div className="left-side">
        <AddSection title="Career journey">
          {careerJourneyData.map((item, i) => (
            <CareerCard
              key={i}
              title={item.title}
              position={item.position}
              company={item.company}
              startDate={item.startDate}
              endDate={item.endDate}
            />
          ))}
        </AddSection>
        <AddSection title="Education">
          {educationData.map((item, i) => (
            <EducationCard
              key={i}
              title={item.title}
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
        <TagModal show={isModalVisible} onClose={hideModal} />
        <div className="edit-section bg-white">
          <div className="edit-section-header d-flex justify-content-between align-items-center">
            <h3 className="edit-section-header__title m-0 fw-bold fs-4">
              Interests
            </h3>
            <button
              className="edit-section-header__edit bg-transparent fw-bold d-flex align-items-center fs-5"
              onClick={showModal}
            >
              <PencilFill className="edit-section-header__edit-icon me-2" />
              <span>Edit</span>
            </button>
          </div>
          <div className="edit-section-content d-flex flex-wrap align-items-start">
            <div className="group fw-bold fs-7">
              {interestsData.map((item, i) => (
                <Tag key={i}>{item.name}</Tag>
              ))}
              <div className="d-flex flex-wrap gap-2"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileMain;
