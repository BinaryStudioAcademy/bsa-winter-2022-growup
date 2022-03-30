import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
  useNavigate,
} from 'hooks/hooks';
import { NotificationManager } from 'react-notifications';
import * as opportunityActions from 'store/opportunities/actions';
import { IOpportunity } from 'store/opportunities/common';
import OpportunityItem from '../main-page/opportunities/opportunity-item';
import AddSection from '../profile/add-section/add-section';
import OpportunityForm from './opportunity-form';
import Follow from './follow';
import isFirstLogged from 'helpers/check-is-first-logged';
import { Dropdown } from 'react-bootstrap';
import { SortOption } from 'store/opportunities/common';

const Opportunities: React.FC = () => {
  const [sort, setSort] = useState<SortOption | null>(null);
  const [tags, setTags] = useState([]);
  const [isValidType, setIsValidType] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.profile.user);
  const navigate = useNavigate();
  const isLoaded = useAppSelector((state) => state.opportunities.isLoaded);
  const isShowModal = useAppSelector(
    (state) => state.opportunities.isShowModal,
  );
  const opportunityData = useAppSelector(
    (state) => state.opportunities.opportunities,
  );

  useEffect(() => {
    isFirstLogged({ user, navigate });
  }, [user]);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(opportunityActions.fetchLoadOpportunities());
    }
  }, []);

  const closeModal = useCallback(() => {
    dispatch(opportunityActions.closeModal());
  }, []);

  const showModal = useCallback(() => {
    dispatch(opportunityActions.showModal());
  }, []);

  const handleSave = useCallback(
    (payload) => dispatch(opportunityActions.fetchNewOpportunity(payload)),
    [dispatch],
  );

  const handleSubmit = (values: object): void => {
    if (tags.length !== 0) {
      handleSave({ ...values, tags: tags })
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch((err: Error) => {
          NotificationManager.error(err.message);
        });
    } else {
      setIsValidType(true);
      setTimeout(() => {
        setIsValidType(false);
      }, 1200);
    }
  };

  const handleSort = (option: SortOption): void => {
    dispatch(opportunityActions.sortOpportunities(option));
    setSort(option);
  };

  return (
    <AddSection
      title="Opportunities"
      buttonName={'Add opportunity'}
      onAdd={showModal}
    >
      <Dropdown>
        <Dropdown.Toggle
          as="button"
          className="btn btn-outline-gu-pink btn-responsive btn-hover-gu-white fw-bold fs-5 border-2"
        >
          {sort ? sort : 'Sort'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(): void => handleSort(SortOption.ORGANIZATION)}
          >
            Organization
          </Dropdown.Item>
          <Dropdown.Item onClick={(): void => handleSort(SortOption.PROGRAM)}>
            Program
          </Dropdown.Item>
          <Dropdown.Item onClick={(): void => handleSort(SortOption.DATE)}>
            Date
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {opportunityData.map((item: IOpportunity, index: number) => (
        <div
          key={index}
          className="mt-3 px-3 py-3 rounded-1 shadow-lg border border-1 bg-gu-white d-flex"
        >
          <OpportunityItem
            id={item.id}
            name={item.name}
            organization={item.organization}
            type={item.type}
            startDate={item.startDate}
            tagsData={item.tagsData}
            tags={item.tags}
            isFollow={item.isFollow}
            isOpportunitiesPage={true}
          />
          <Follow isFollow={item.isFollow} id={item.id} />
        </div>
      ))}
      {isShowModal && (
        <OpportunityForm
          onClose={closeModal}
          onSubmit={handleSubmit}
          setTags={setTags}
          isValidType={isValidType}
        />
      )}
    </AddSection>
  );
};

export default Opportunities;
