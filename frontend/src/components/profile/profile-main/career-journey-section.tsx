import { NotificationManager } from 'react-notifications';
import { Row } from 'react-bootstrap';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
} from 'hooks/hooks';
import AddSection from '../add-section/add-section';
import CareerCard from '../career-card/career-card';
import {
  createCareerJourney,
  getAllCareerJourneys,
  updateCareerJourney,
} from 'store/career-journey/actions';
import { ICareerJourney } from '../common/interfaces';
import { CareerJourneyForm } from '../components/profile-edit/profile-edit';

const CareerJourneySection: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [sort, setSort] = useState<boolean>(false);
  const [careerJourney, setCareerJourney] = useState<ICareerJourney | null>(
    null,
  );
  const { careerJourneys } = useAppSelector((state) => state.careerJourney);
  const isLessTwo = careerJourneys && careerJourneys.length <= 2;

  useEffect(() => {
    dispatch(getAllCareerJourneys());
  }, []);

  const onSortByAsc = (): void => setSort(!sort);
  const onViewAll = (): void => setViewAll(!viewAll);
  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const showModal = useCallback((selected) => {
    setIsModalVisible(true);
    setCareerJourney(selected);
  }, []);

  const handleSave = useCallback(
    (payload) => dispatch(createCareerJourney(payload)),
    [dispatch],
  );

  const handleUpdate = useCallback(
    (payload) => dispatch(updateCareerJourney(payload)),
    [dispatch],
  );

  const handleSubmit = (values: object): void => {
    (careerJourney ? handleUpdate(values) : handleSave(values))
      .unwrap()
      .then(() => {
        closeModal();
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
      });
  };

  const careerJourneyItems = (): JSX.Element[] | JSX.Element => {
    if (!careerJourneys.length) {
      return <Row className="w-100 justify-content-center">No Data</Row>;
    }
    if (careerJourneys.length < 2) {
      return (
        <CareerCard careerJourney={careerJourneys[0]} onEdit={showModal} />
      );
    }

    const sortByStartDateAsc = (
      a: ICareerJourney,
      b: ICareerJourney,
    ): number => {
      const startA = new Date(a.startDate);
      const startB = new Date(b.startDate);

      if (startA < startB) {
        return sort ? -1 : 1;
      }
      if (startA > startB) {
        return sort ? 1 : -1;
      }
      return 0;
    };

    const to = viewAll ? careerJourneys.length : 2;

    return [...careerJourneys]
      .sort(sortByStartDateAsc)
      .slice(0, to)
      .map((item, i) => (
        <CareerCard key={i} careerJourney={item} onEdit={showModal} />
      ));
  };

  return (
    <AddSection title="Career journey" onAdd={(): void => showModal(null)}>
      <>
        {careerJourneys.length > 1 && (
          <span
            onClick={onSortByAsc}
            className="notifications__view-all d-flex align-items-center justify-content-end me-2 mb-2 mt-2 fs-6 text-gu-blue"
          >
            <span className="me-1">{sort ? 'sort desc' : 'sort asc'}</span>
            {sort ? <ArrowDown /> : <ArrowUp />}
          </span>
        )}
        {careerJourneyItems()}
        {isModalVisible && (
          <CareerJourneyForm
            careerJourney={careerJourney}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        )}
        {!isLessTwo && (
          <span
            onClick={onViewAll}
            className="notifications__view-all d-flex align-items-center justify-content-end me-2 mb-2 mt-2 fs-6 text-gu-blue"
          >
            <span className="me-1">{viewAll ? 'hide' : 'view all'}</span>
            {viewAll ? <ArrowUp /> : <ArrowDown />}
          </span>
        )}
      </>
    </AddSection>
  );
};

export default CareerJourneySection;
