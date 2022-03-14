import './styles.scss';
import { Calendar, PencilFill, TrashFill } from 'react-bootstrap-icons';
import { ICareerJourney } from '../common/interfaces';

type Props = Omit<ICareerJourney, 'id'>;

const CareerCard: React.FC<Props> = ({
  title,
  position,
  company,
  startDate,
  endDate,
}) => {
  const absoluteYears: number = endDate.getFullYear() - startDate.getFullYear();
  const absoluteMonths: number = endDate.getMonth() - startDate.getMonth();

  const years = absoluteMonths > 0 ? absoluteYears : 0;
  const months =
    absoluteMonths > 0 ? absoluteMonths : 12 - Math.abs(absoluteMonths);

  return (
    <div className="card career-card">
      <div className="career-card-time fs-7 ">{startDate.getFullYear()}</div>
      <div className="card-body career-card-info">
        <h3 className="card-text career-card-info__title fw-bold fs-4 text-gu-black">
          {title}
        </h3>
        <p className="card-text career-card-info__role m-0 mb-1 fs-6 text-gu-black">
          <span>Role</span>
          {position}
        </p>
        <p className="card-text career-card-info__company m-0 mb-1 fs-6 text-gu-black">
          <span>Company</span>
          {company}
        </p>
      </div>
      <div className="card-footer bg-white d-flex align-items-center justify-content-between">
        <div className="career-card-footer__duration d-flex align-items-center fs-7">
          <Calendar className="career-card-footer__calendar-icon" />
          <span>
            {years > 0 ? `${years} y` : ''} {months > 0 ? `${months} mo` : ''}
          </span>
        </div>
        <div className="career-action-buttons d-flex align-self-center text-gu-purple">
          <PencilFill className="career-action-buttons__edit" />
          <TrashFill className="career-action-buttons__delete" />
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
