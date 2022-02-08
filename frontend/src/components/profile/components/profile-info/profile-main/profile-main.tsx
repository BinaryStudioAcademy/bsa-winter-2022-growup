import AddSection from '../add-section/add-section';
import CareerCard from '../career-card/career-card';
import EditSection from '../edit-section/edit-section';
import EducationCard from '../education-card/education-card';
import Tag from '../tag/tag';
import  './profile-main.scss';

const ProfileMain: React.FC = () => (
  <main className="profile-main">
    <AddSection title="Career journey" >
      <CareerCard />
      <CareerCard />
    </AddSection>
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
    <AddSection title="Education">
      <EducationCard />
    </AddSection>
    <EditSection title="Interests">
      <div className="group">
        <Tag>English</Tag>
        <Tag>French</Tag>
      </div>
    </EditSection>
  </main>
);

export default ProfileMain;
