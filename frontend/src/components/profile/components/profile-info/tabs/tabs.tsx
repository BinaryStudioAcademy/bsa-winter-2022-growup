import  './tabs.scss';

const Tabs: React.FC = () => (
  <nav className="tabs d-flex justify-content-center bg-white">
    <a className="tabs__item tabs__item_active text-decoration-none" href="#">
      Summary
    </a>
    <a className="tabs__item text-decoration-none" href="#">
      Qualities
    </a>
    <a className="tabs__item text-decoration-none" href="#">
      Interests
    </a>
  </nav>
);

export default Tabs;
