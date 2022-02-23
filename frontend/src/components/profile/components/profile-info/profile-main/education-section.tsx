import { useCallback, useState } from 'hooks/hooks';
import AddSection from '../add-section/add-section';
import EducationCard from '../education-card/education-card';
import { EducationForm } from '../../profile-edit/profile-edit';

const educationData = [
  {
    id: '1',
    specialization: 'Computer Science',
    university: 'Lviv Polytechnic National University',
    degree: 'Masters',
    startDate: new Date('2021-12-17T03:24:00'),
    endDate: new Date(),
  },
];

const EducationSection: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = useCallback(() => setIsModalVisible(false), []);
  const showModal = useCallback(() => setIsModalVisible(true), []);

  return (
    <AddSection title="Education" onButtonClick={showModal}>
      <>
        {educationData.map((item, i) => (
          <EducationCard
            key={i}
            specialization={item.specialization}
            university={item.university}
            degree={item.degree}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        ))}
        <EducationForm
          show={isModalVisible}
          title={'Edit education'}
          onClose={closeModal}
        />
      </>
    </AddSection>
  );
};

export default EducationSection;
