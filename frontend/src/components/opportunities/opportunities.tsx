import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
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

const Opportunities: React.FC = () => {
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
    handleSave(values)
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
      title="Opportunities"
      buttonName={'Add opportunity'}
      onAdd={showModal}
    >
      {opportunityData.map((item: IOpportunity, index: number) => (
        <div className="mt-3 px-3 py-3 rounded-1 shadow-lg border border-1 bg-gu-white d-flex">
          <OpportunityItem
            key={index}
            id={item.id}
            name={item.name}
            organization={item.organization}
            type={item.type}
            startDate={item.startDate}
            tagsData={item.tagsData}
            isFollow={item.isFollow}
            isOpportunitiesPage={true}
          />
          <Follow isFollow={item.isFollow} id={item.id} />
        </div>
      ))}
      {isShowModal && (
        <OpportunityForm onClose={closeModal} onSubmit={handleSubmit} />
      )}
    </AddSection>
  );
};

export default Opportunities;
