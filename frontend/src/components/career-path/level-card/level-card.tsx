import './styles.scss';

interface Props {
  icon: JSX.Element;
  title: string;
  subtitle: JSX.Element | string;
}

const LevelCard: React.FC<Props> = ({ icon, title, subtitle }) => (
  <div className="level-card__container d-flex justify-content-center align-items-center">
    <div className="level-card__img">{icon}</div>
    <div className="d-grid ps-3">
      <span className="fs-5 fw-bold">{title}</span>
      <span className="level-card__text fs-6">{subtitle}</span>
    </div>
  </div>
);

export default LevelCard;
