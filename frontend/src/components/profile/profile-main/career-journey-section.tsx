import { NotificationManager } from 'react-notifications';
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
  const careerJourneyData = useAppSelector(
    (state) => state.careerJourney.careerJourneys,
  );

  useEffect(() => {
    dispatch(getAllCareerJourneys());
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [careerJourney, setCareerJourney] = useState<ICareerJourney | null>(
    null,
  );

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

  return (
    <AddSection
      title="Career journey"
      onButtonClick={(): void => showModal(null)}
    >
      <>
        {careerJourneyData.map((item, i) => (
          <CareerCard key={i} careerJourney={item} onEdit={showModal} />
        ))}
        {isModalVisible && (
          <CareerJourneyForm
            careerJourney={careerJourney}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        )}
      </>
    </AddSection>
  );
};

export default CareerJourneySection;
