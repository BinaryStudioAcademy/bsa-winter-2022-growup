import { Calendar, PencilFill, TrashFill } from 'react-bootstrap-icons';
import './education-card.scss';
import { Education } from '../interfaces';

type Props = Omit<Education, 'id'>;

const EducationCard: React.FC<Props> = ({ title, university, degree, startDate, endDate }) => {
  const absoluteYears: number = endDate.getFullYear() - startDate.getFullYear();
  const absoluteMonths: number = endDate.getMonth() - startDate.getMonth();

  const years = absoluteMonths > 0 ? absoluteYears: 0;
  const months = absoluteMonths > 0 ? absoluteMonths: 12 - Math.abs(absoluteMonths);

  return (
  <div className="card education-card">
    <div className="card-body education-card-info d-flex flex-column align-items-start">
      <h3 className="card-text education-card-info__title fw-bold fs-4">{title}</h3>
      <p className="card-text education-card-info__universitet m-0 mb-1 fs-6"><span>Universitet</span>{university}</p>
      <p className="card-text education-card-info__degree m-0 mb-1 fs-6"><span>Degree</span>{degree}</p>
    </div>
    <div className="card-footer bg-white education-footer d-flex justify-content-between">
      <div className="education-footer__duration align-items-center fs-7">
        <Calendar className="career-card-footer__calendar-icon"/>
        <span>{years > 0 ? `${years} y`: '' }  {months > 0 ? `${months} mo`: '' }</span>
      </div>
      <div className="education-action-buttons d-flex align-items-center text-gu-purple">
        <PencilFill className="education-action-buttons__edit" />
        <TrashFill className="education-action-buttons__delete" />
      </div>
    </div>
  </div>
);};

export default EducationCard;
