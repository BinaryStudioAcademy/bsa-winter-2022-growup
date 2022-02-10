import  './tabs.scss';

const Tabs: React.FC = () => (
  <nav className="nav-tabs d-flex">
    <div className="nav-item">
      <a className="nav-link active text-decoration-none" href="#">Summary</a>
    </div>
    <div className="nav-item">
      <a className="nav-link text-decoration-none" href="#">Qualities</a>
    </div>
    <div className="nav-item">
      <a className="nav-link text-decoration-none" href="#">Interests</a>
    </div>
  </nav>
);

export default Tabs;
