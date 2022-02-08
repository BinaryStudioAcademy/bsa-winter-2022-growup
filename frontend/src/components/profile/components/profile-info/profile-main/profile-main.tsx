import AddSection from '../add-section/add-section';
import CareerCard from '../career-card/career-card';
import EditSection from '../edit-section/edit-section';
import EducationCard from '../education-card/education-card';
import Tag from '../tag/tag';
import  './profile-main.scss';

const ProfileMain: React.FC = () => (
  <main className="profile-main">
    <div className="left-side">
      <AddSection title="Career journey">
        <CareerCard />
      </AddSection>
      <AddSection title="Education">
        <EducationCard />
      </AddSection>
    </div>
    <div className="right-side">
      <EditSection title="Skills">
        <div className="group">
          <h4 className="group__title">Technical skills</h4>
          <Tag>HTML</Tag>
          <Tag>CSS</Tag>
          <Tag>CSS</Tag>
        </div>
        <div className="group">
          <h4 className="group__title">Language</h4>
          <Tag>English</Tag>
          <Tag>French</Tag>
        </div>
      </EditSection>
      <EditSection title="Interests">
        <div className="group">
          <Tag>English</Tag>
          <Tag>French</Tag>
        </div>
      </EditSection>
    </div>
  </main>
);

export default ProfileMain;
