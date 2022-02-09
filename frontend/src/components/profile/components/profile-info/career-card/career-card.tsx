import './career-card.scss';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';

type Props = {
  title: string;
  position: string;
  company: string
  startDate: Date;
  endDate: Date;
};

const CareerCard: React.FC<Props> = ({ title, position, company, startDate, endDate }) => {
  const absoluteYears: number = endDate.getFullYear() - startDate.getFullYear();
  const absoluteMonths: number = endDate.getMonth() - startDate.getMonth();

  const years = absoluteMonths > 0 ? absoluteYears: 0;
  const months = absoluteMonths > 0 ? absoluteMonths: 12 - Math.abs(absoluteMonths);

  return (
  <div className="career-card">
    <div className="career-card-info">
      <h3 className="career-card-info__title">{title}</h3>
      <p className="career-card-info__role"><span>Role</span>{position}</p>
      <p className="career-card-info__company"><span>Company</span>{company}</p>
    </div>
    <div className="career-card-footer">
      <div className="career-card-footer__duration">
        {years > 0 ? `${years} y`: '' }  {months > 0 ? `${months} mo`: '' }
      </div>
      <div className="career-action-buttons">
        <PencilFill className="career-action-buttons__edit" />
        <TrashFill className="career-action-buttons__delete" />
      </div>
    </div>
  </div>
);};

export default CareerCard;
