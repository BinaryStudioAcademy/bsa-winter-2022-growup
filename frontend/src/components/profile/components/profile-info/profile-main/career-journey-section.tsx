import { useCallback, useState } from 'hooks/hooks';
import AddSection from '../add-section/add-section';
import CareerCard from '../career-card/career-card';
import { CareerJourneyForm } from '../../profile-edit/profile-edit';
import { CareerJourney } from '../interfaces';

const careerJourneyData: CareerJourney[] = [
  {
    id: '1',
    position: 'Fullstack JS Developer',
    company: 'Binary Studio',
    startDate: new Date('2020-01-30T03:24:00'),
    endDate: new Date(),
  },
  {
    id: '2',
    position: 'Fullstack JS Developer',
    company: 'Binary Studio',
    startDate: new Date('2021-12-17T03:24:00'),
    endDate: new Date(),
  },
];

const CareerJourneySection: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = useCallback(() => setIsModalVisible(false), []);
  const showModal = useCallback(() => setIsModalVisible(true), []);

  return (
    <AddSection title="Career journey" onButtonClick={showModal}>
      <>
        {careerJourneyData.map((item, i) => (
          <CareerCard
            key={i}
            position={item.position}
            company={item.company}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        ))}
        <CareerJourneyForm
          show={isModalVisible}
          title={'Edit career journey'}
          onClose={closeModal}
        />
      </>
    </AddSection>
  );
};

export default CareerJourneySection;
