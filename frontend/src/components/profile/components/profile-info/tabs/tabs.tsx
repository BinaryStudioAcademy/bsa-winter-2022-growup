import  './tabs.scss';

const Navigation: React.FC = () => (
  <div className="tabs">
    <a className="tabs__item active-tab" href="#">
      Summary
    </a>
    <a className="tabs__item" href="#">
      Qualities
    </a>
    <a className="tabs__item" href="#">
      Interests
    </a>
  </div>
);

export default Navigation;
