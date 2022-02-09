import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import './education-card.scss';

type Props = {
  title: string;
  university: string;
  degree: string
  startDate: Date;
  endDate: Date;
};

const EducationCard: React.FC<Props> = ({ title, university, degree, startDate, endDate }) => {
  const absoluteYears: number = endDate.getFullYear() - startDate.getFullYear();
  const absoluteMonths: number = endDate.getMonth() - startDate.getMonth();

  const years = absoluteMonths > 0 ? absoluteYears: 0;
  const months = absoluteMonths > 0 ? absoluteMonths: 12 - Math.abs(absoluteMonths);

  return (
  <div className="education-card">
    <div className="education-info">
      <h3 className="education-info__title">{title}</h3>
      <p className="education-info__universitet"><span>Universitet</span>{university}</p>
      <p className="education-info__degree"><span>Degree</span>{degree}</p>
    </div>
    <div className="education-footer">
      <div className="education-footer__duration">
        {years > 0 ? `${years} y`: '' }  {months > 0 ? `${months} mo`: '' }
      </div>
      <div className="education-action-buttons">
        <PencilFill className="education-action-buttons__edit" />
        <TrashFill className="education-action-buttons__delete" />
      </div>
    </div>
  </div>
);};

export default EducationCard;
