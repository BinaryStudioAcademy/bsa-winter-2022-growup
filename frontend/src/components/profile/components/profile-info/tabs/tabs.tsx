import  './tabs.scss';

const Tabs: React.FC = () => (
  <nav className="tabs">
    <a className="tabs__item active-tab" href="#">
      Summary
    </a>
    <a className="tabs__item" href="#">
      Qualities
    </a>
    <a className="tabs__item" href="#">
      Interests
    </a>
  </nav>
);

export default Tabs;
