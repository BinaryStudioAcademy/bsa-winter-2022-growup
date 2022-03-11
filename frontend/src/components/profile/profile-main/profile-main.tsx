import { ICareerJourney, IEducation, ISkill } from '../common/interfaces';
import AddSection from '../add-section/add-section';
import CareerCard from '../career-card/career-card';
import EditSection from '../edit-section/edit-section';
import CareerJourneySection from './career-journey-section';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import EducationSection from './education-section';
import Interests from './interests/interests-section';
import Tag from '../tag/tag';
import './styles.scss';
import Interests from './interests/interests-section';
import { tagsActions } from 'store/actions';
import { useAppSelector, useEffect, useAppDispatch } from 'hooks/hooks';

// FROM DB
const careerJourneyData: ICareerJourney[] = [
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
const educationData: IEducation[] = [
  {
    id: '1',
    title: 'Computer Science',
    university: 'Lviv Polytechnic National University',
    degree: 'Masters',
    startDate: new Date('2021-12-17T03:24:00'),
    endDate: new Date(),
  },
];
import { tagsActions } from 'store/actions';
import './profile-main.scss';

// FROM DB
const skillData: ISkill[] = [
  {
    id: '1',
    name: 'HTML',
  },
  {
    id: '2',
    name: 'CSS',
  },
];

const ProfileMain: React.FC = () => {
  const { tags } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tagsActions.fetchTags());
  }, [dispatch]);

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
        <Interests tagList={tags} />
      </div>
    </main>
  );
};

export default ProfileMain;
