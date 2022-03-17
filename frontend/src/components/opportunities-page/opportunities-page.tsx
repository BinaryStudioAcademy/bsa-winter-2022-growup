import OpportunityPageItem from './opportunities-page-item';
import OpportunityModal from './opportunity-modal';
import {
  useAppSelector,
  useAppDispatch,
  useEffect,
  useNavigate,
} from 'hooks/hooks';
import * as opportunityActions from '../../store/opportunities/actions';
import './styles.scss';
import { IOpportunity } from 'store/opportunities/common';
import isFirstLogged from 'helpers/check-is-first-logged';

const OpprotunitiesPage: React.FC = () => {
  const opportunities = useAppSelector(
    (state) => state.opportunities.opportunities,
  );
  const dispatch = useAppDispatch();
  const isLoaded = useAppSelector((state) => state.opportunities.isLoaded);
  const user = useAppSelector((store) => store.profile.user);
  const navigate = useNavigate();
  useEffect(() => {
    isFirstLogged(user, navigate);
  }, [user]);

  useEffect(() => {
    isLoaded ? null : dispatch(opportunityActions.fetchLoadOpp());
  }, []);

  return (
    <section className="d-flex flex-column">
      <div className=" d-flex align-items-center px-3 py-3 rounded-top bg-gu-blue text-gu-white">
        <span className="flex-shrink-1 flex-grow-1 text-start fs-5">
          Recommended opportunities
        </span>
        <span
          className="btn btn-outline-gu-white fs-7 "
          onClick={(): void => {
            dispatch(opportunityActions.showModal());
          }}
        >
          + Add Opportunity
        </span>
      </div>
      <div className="oppotunities__list">
        {opportunities.map((item: IOpportunity, index: number) => {
          return (
            <OpportunityPageItem
              name={item.name}
              organization={item.organization}
              startDate={item.startDate}
              type={item.type}
              isFollow={item.isFollow}
              id={item.id}
              key={index}
              tagsData={item.tagsData}
            />
          );
        })}
      </div>
      <OpportunityModal />
    </section>
  );
};
export default OpprotunitiesPage;
