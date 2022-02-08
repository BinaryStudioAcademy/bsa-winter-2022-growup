import './career-card.scss';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';

const CareerCard: React.FC = () => (
  <div className="career-card">
    <div className="career-card-info">
      <h3 className="career-card-info__title">Fullstack JS Developer</h3>
      <p className="career-card-info__role"><span>Role</span>Fullstack JS Developer</p>
      <p className="career-card-info__company"><span>Company</span>Binary Studio</p>
    </div>
    <div className="career-card-footer">
      <div className="career-card-footer__duration">4 yr 5 mo</div>
      <div className="career-action-buttons">
        <PencilFill className="career-action-buttons__edit" />
        <TrashFill className="career-action-buttons__delete" />
      </div>
    </div>
  </div>
);

export default CareerCard;
