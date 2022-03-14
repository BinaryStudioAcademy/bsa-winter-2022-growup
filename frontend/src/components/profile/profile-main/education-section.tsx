import { NotificationManager } from 'react-notifications';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
} from 'hooks/hooks';
import AddSection from '../add-section/add-section';
import EducationCard from '../education-card/education-card';
import {
  createEducation,
  getAllEducations,
  updateEducation,
} from 'store/education/actions';
import { IEducation } from '../common/interfaces';
import { EducationForm } from '../components/profile-edit/profile-edit';

const EducationSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const educationData = useAppSelector((state) => state.education.educations);

  useEffect(() => {
    dispatch(getAllEducations());
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [education, setEducation] = useState<IEducation | null>(null);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const showModal = useCallback((selected) => {
    setIsModalVisible(true);
    setEducation(selected);
  }, []);

  const handleSave = useCallback(
    (payload) => dispatch(createEducation(payload)),
    [dispatch],
  );

  const handleUpdate = useCallback(
    (payload) => dispatch(updateEducation(payload)),
    [dispatch],
  );

  const handleSubmit = (values: object): void => {
    (education ? handleUpdate(values) : handleSave(values))
      .unwrap()
      .then(() => {
        closeModal();
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
      });
  };

  return (
    <AddSection title="Education" onAdd={(): void => showModal(null)}>
      <>
        {educationData.map((item, i) => (
          <EducationCard key={i} education={item} onEdit={showModal} />
        ))}
        {isModalVisible && (
          <EducationForm
            education={education}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        )}
      </>
    </AddSection>
  );
};

export default EducationSection;
