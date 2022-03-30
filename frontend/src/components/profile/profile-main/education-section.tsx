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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [education, setEducation] = useState<IEducation | null>(null);
  const [sort, setSort] = useState<boolean>(false);
  const [viewAll, setViewAll] = useState<boolean>(false);

  const { educations } = useAppSelector((state) => state.education);
  const isLessTwo = educations && educations.length <= 2;

  useEffect(() => {
    dispatch(getAllEducations());
  }, []);

  const onSortByAsc = (): void => setSort(!sort);
  const onViewAll = (): void => setViewAll(!viewAll);
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

  const educationItems = (): JSX.Element[] | JSX.Element => {
    if (!educations.length) {
      return <Row className="w-100 justify-content-center">No Data</Row>;
    }
    if (educations.length < 2) {
      return <EducationCard education={educations[0]} onEdit={showModal} />;
    }

    const sortByStartDateAsc = (a: IEducation, b: IEducation): number => {
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

    const to = viewAll ? educations.length : 2;

    return [...educations]
      .sort(sortByStartDateAsc)
      .slice(0, to)
      .map((item, i) => (
        <EducationCard key={i} education={item} onEdit={showModal} />
      ));
  };

  return (
    <div className="mt-4">
      <AddSection title="Education" onAdd={(): void => showModal(null)}>
        <>
          {educations.length > 1 && (
            <span
              onClick={onSortByAsc}
              className="notifications__view-all d-flex align-items-center justify-content-end me-2 mb-2 mt-2 fs-6 text-gu-blue"
            >
              <span className="me-1">{sort ? 'sort' : 'sort'}</span>
              {sort ? <ArrowDown /> : <ArrowUp />}
            </span>
          )}
          {educationItems()}
          {isModalVisible && (
            <EducationForm
              education={education}
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
    </div>
  );
};

export default EducationSection;
