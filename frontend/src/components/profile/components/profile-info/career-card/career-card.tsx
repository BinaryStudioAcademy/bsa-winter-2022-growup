import './career-card.scss';
import { Calendar, PencilFill, TrashFill } from 'react-bootstrap-icons';
import { CareerJourney } from '../interfaces';

type Props = Omit<CareerJourney, 'id'>;

const CareerCard: React.FC<Props> = ({ title, position, company, startDate, endDate }) => {
  const absoluteYears: number = endDate.getFullYear() - startDate.getFullYear();
  const absoluteMonths: number = endDate.getMonth() - startDate.getMonth();

  const years = absoluteMonths > 0 ? absoluteYears: 0;
  const months = absoluteMonths > 0 ? absoluteMonths: 12 - Math.abs(absoluteMonths);

  return (
  <div className="card career-card">
    <div className="career-card-time">{startDate.getFullYear()}</div>
    <div className="card-body career-card-info">
      <h3 className="card-text career-card-info__title fw-bold">{title}</h3>
      <p className="card-text career-card-info__role m-0 mb-1"><span>Role</span>{position}</p>
      <p className="card-text career-card-info__company m-0 mb-1"><span>Company</span>{company}</p>
    </div>
    <div className="card-footer bg-white d-flex align-items-center justify-content-between">
      <div className="career-card-footer__duration d-flex align-items-center">
        <Calendar className="career-card-footer__calendar-icon" />
          <span>{years > 0 ? `${years} y`: '' }  {months > 0 ? `${months} mo`: '' }</span>
      </div>
      <div className="career-action-buttons d-flex align-self-center">
          <PencilFill className="career-action-buttons__edit" />
          <TrashFill className="career-action-buttons__delete" />
      </div>
    </div>
</div>
);};

export default CareerCard;
