import EditSection from '../edit-section/edit-section';
import CareerJourneySection from './career-journey-section';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import Interests from './interests/interests-section';
import Tag from '../tag/tag';
import './styles.scss';
import { skillActions, tagsActions } from 'store/actions';
import EducationSection from './education-section';

const ProfileMain: React.FC = () => {
  const { tags } = useAppSelector((state) => state.tags);
  const skillData = useAppSelector((state) => state.skill.userSkill);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tagsActions.fetchTags());
    dispatch(skillActions.fetchUserSkills());
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
        </EditSection>
        <Interests tagList={tags} />
      </div>
    </main>
  );
};

export default ProfileMain;
