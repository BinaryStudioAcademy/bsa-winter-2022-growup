import './styles.scss';
import { NotificationManager } from 'react-notifications';
import { Calendar, PencilFill, TrashFill } from 'react-bootstrap-icons';
import { useAppDispatch, useCallback, useNavigate } from 'hooks/hooks';
import { removeCareerJourney } from 'store/career-journey/actions';
import { ICareerJourney } from '../common/interfaces';
import { MentorMenteeRoute } from 'common/enums/mentor-mentee-route/mentor-mentee-route.enum';
import { Button } from 'components/common/common';

interface Props {
  careerJourney: ICareerJourney;
  onEdit: (careerJourney: ICareerJourney) => void;
}

const CareerCard: React.FC<Props> = ({ careerJourney, onEdit }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { position, company, startDate, endDate } = careerJourney;

  const handleRemove = useCallback(
    (payload) => dispatch(removeCareerJourney(payload)),
    [dispatch],
  );

  const onRemove = (): void => {
    handleRemove(careerJourney)
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
    <div className="card career-card">
      <div className="career-card-time fs-7 ">{startDate.getFullYear()}</div>
      <div className="card-body career-card-info">
        <h3 className="card-text career-card-info__title fw-bold fs-4 text-gu-black">
          {position}
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
          <Button
            themeType={'border-0 p-0 bg-transparent text-gu-purple'}
            onSubmit={(): void => onEdit(careerJourney)}
            type={'button'}
          >
            <PencilFill className="career-action-buttons__edit" />
          </Button>
          <Button
            themeType={'border-0 p-0 bg-transparent text-gu-purple'}
            onSubmit={onRemove}
            type={'button'}
          >
            <TrashFill className="career-action-buttons__delete" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
