import ControlledTabs from 'components/okrs/components/tabs-okr/two-tabs';
import SkillOverview from 'components/skills/skill-overview';

const App: React.FC = () => {

  return (
    <>
      <ControlledTabs/>
      <SkillOverview/>
    </>
  );
};

export default App;
