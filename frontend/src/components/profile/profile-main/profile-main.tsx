import EditSection from '../edit-section/edit-section';
import CareerJourneySection from './career-journey-section';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import Interests from './interests/interests-section';
import Tag from '../tag/tag';
import NotApprovedTag from '../tag/not-approved-tag';
import './styles.scss';
import { skillActions, tagsActions } from 'store/actions';
import EducationSection from './education-section';
import { ISkill } from '../common/interfaces';
import { RootState } from 'common/types/types';

const ProfileMain: React.FC = () => {
  const tags = useAppSelector((state: RootState) => state.profile.user?.tags);
  const allTags = useAppSelector((state: RootState) => state.tags.tags);
  const otherTags = allTags.filter(
    (tag) => !tags?.find((interTag) => interTag.id === tag.id),
  );

  const skillData = useAppSelector((state) => state.skill.userSkill);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tagsActions.fetchTags());
    dispatch(skillActions.fetchUserSkills());
  }, [dispatch]);

  function isApprovedSkill(skill: ISkill): boolean {
    if (skill.rating.find((el) => el === '') !== undefined) return false;
    return true;
  }

  const skillApproved = skillData.filter((skill) => isApprovedSkill(skill));
  const skillNotApproved = skillData.filter((skill) => !isApprovedSkill(skill));

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
            {skillApproved.map((item, i) => (
              <Tag key={i}>{item.name}</Tag>
            ))}
            {skillNotApproved.map((item, i) => (
              <NotApprovedTag key={i}>{item.name}</NotApprovedTag>
            ))}
          </div>
        </EditSection>
        <Interests tagList={tags ? tags : []} otherTags={otherTags} />
      </div>
    </main>
  );
};

export default ProfileMain;
