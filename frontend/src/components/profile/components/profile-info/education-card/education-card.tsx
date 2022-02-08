import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import './education-card.scss';

const EducationCard: React.FC = () => (
  <div className="education-card">
    <div className="education-info">
      <h3 className="education-info__title">Computer Science</h3>
      <p className="education-info__universitet"><span>Universitet</span>Lviv Polytechnic National University</p>
      <p className="education-info__degree"><span>Degree</span>Masters</p>
    </div>
    <div className="education-footer">
      <div className="education-footer__duration">4 yr 5 mo</div>
      <div className="education-action-buttons">
        <PencilFill className="education-action-buttons__edit" />
        <TrashFill className="education-action-buttons__delete" />
      </div>
    </div>
  </div>
);

export default EducationCard;
