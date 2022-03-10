import { NotificationManager } from 'react-notifications';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
  useState,
} from 'hooks/hooks';
import AddSection from '../add-section/add-section';
import EducationCard from '../education-card/education-card';
import { EducationForm } from '../../profile-edit/profile-edit';
import {
  createEducation,
  getAllEducations,
  updateEducation,
} from 'store/education/actions';
import { Education } from '../interfaces';
import { MentorMenteeRoute } from 'common/enums/mentor-mentee-route/mentor-mentee-route.enum';

const EducationSection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const educationData = useAppSelector((state) => state.education.educations);

  useEffect(() => {
    dispatch(getAllEducations());
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [education, setEducation] = useState<Education | null>(null);

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
        navigate(MentorMenteeRoute.PROFILE);
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
      });
  };

  return (
    <AddSection title="Education" onButtonClick={(): void => showModal(null)}>
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
