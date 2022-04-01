import OpportunityItem from './opportunity-item';
import './styles.scss';
import {
  useAppSelector,
  useEffect,
  useState,
  useAppDispatch,
} from 'hooks/hooks';
import { IOpportunity, ITagsData } from 'store/opportunities/common';
import * as opportunityActions from 'store/opportunities/actions';

const OpportunityList: React.FC = () => {
  const opportunities = useAppSelector(
    (state) => state.opportunities.opportunities,
  );
  const tags = useAppSelector((state) => state.auth.user?.tags);
  const tagsName = tags?.map((tag) => tag.name);
  const [opportunityName, setOpportunityName] = useState<IOpportunity[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(opportunityActions.fetchLoadOpportunities());
    setOpportunityName(opportunities);
  }, [dispatch]);

  function validOpportunity(opportunityTags: string[] | ITagsData[]): boolean {
    const flag = opportunityTags?.map((tag) => {
      if (!tagsName?.includes(tag as string)) return false;
      return true;
    });
    const isInclude = (element: boolean): boolean => !element;
    if (!flag?.some(isInclude)) return true;
    return false;
  }

  return (
    <section className="opportunities text-start d-flex flex-column">
      <div className="d-flex align-items-center  bg-gu-blue text-gu-white add-section-header justify-content-between">
        <p className="add-section-header__title m-0 fw-bold fs-4">
          Recommended opportunities
        </p>
      </div>
      <div>
        {opportunityName
          ? opportunityName.map((item: IOpportunity, index: number) => {
              return item.tagsData ? (
                validOpportunity(item.tagsData) ? (
                  <OpportunityItem
                    key={index}
                    name={item.name}
                    organization={item.organization}
                    type={item.type}
                    startDate={item.startDate}
                    tagsData={item.tagsData}
                  />
                ) : (
                  true
                )
              ) : (
                true
              );
            })
          : true}
      </div>
    </section>
  );
};
export default OpportunityList;
