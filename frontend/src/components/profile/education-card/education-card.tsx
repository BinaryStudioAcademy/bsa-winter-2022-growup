import './styles.scss';
import { NotificationManager } from 'react-notifications';
import { Calendar, PencilFill, TrashFill } from 'react-bootstrap-icons';
import { IEducation } from '../common/interfaces';
import { useAppDispatch, useCallback, useNavigate } from 'hooks/hooks';
import { removeEducation } from 'store/education/actions';
import { MentorMenteeRoute } from 'common/enums/mentor-mentee-route/mentor-mentee-route.enum';
import { Button } from 'components/common/common';

interface Props {
  education: IEducation;
  onEdit: (education: IEducation) => void;
}

const EducationCard: React.FC<Props> = ({ education, onEdit }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { specialization, university, degree, startDate, endDate } = education;

  const handleRemove = useCallback(
    (payload) => dispatch(removeEducation(payload)),
    [dispatch],
  );

  const onRemove = (): void => {
    handleRemove(education)
      .unwrap()
      .then(() => {
        navigate(MentorMenteeRoute.PROFILE);
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
      });
  };

  const absoluteYears: number = endDate.getFullYear() - startDate.getFullYear();
  const absoluteMonths: number = endDate.getMonth() - startDate.getMonth();

  const years = absoluteMonths > 0 ? absoluteYears : 0;
  const months =
    absoluteMonths > 0 ? absoluteMonths : 12 - Math.abs(absoluteMonths);

  return (
    <div className="card education-card">
      <div className="card-body education-card-info d-flex flex-column align-items-start">
        <h3 className="card-text education-card-info__title fw-bold fs-4">
          {specialization}
        </h3>
        <p className="card-text education-card-info__university m-0 mb-1 fs-6">
          <span>University</span>
          {university}
        </p>
        <p className="card-text education-card-info__degree m-0 mb-1 fs-6">
          <span>Degree</span>
          {degree}
        </p>
      </div>
      <div className="card-footer bg-white education-footer d-flex justify-content-between">
        <div className="education-footer__duration align-self-center fs-7">
          <Calendar className="career-card-footer__calendar-icon" />
          <span>
            {years > 0 ? `${years} y` : ''} {months > 0 ? `${months} mo` : ''}
          </span>
        </div>
        <div className="education-action-buttons d-flex align-items-center text-gu-purple">
          <Button
            className="border-0 p-0 bg-transparent text-gu-purple"
            onClick={(): void => onEdit(education)}
            type="button"
          >
            <PencilFill className="education-action-buttons__edit" />
          </Button>
          <Button
            className="border-0 p-0 bg-transparent text-gu-purple"
            onClick={onRemove}
            type="button"
          >
            <TrashFill className="education-action-buttons__delete" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
