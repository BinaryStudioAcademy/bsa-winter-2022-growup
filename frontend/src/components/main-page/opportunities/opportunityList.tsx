import OpportunityItem from './opportunityItem';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { fetchLoadOpp } from 'store/opportunities/actions';
import './opportunities.scss';
const OpportunityList:React.FC = ()=>{
    const opportunities = useAppSelector((state)=>state.opportunityReducer.opportunities);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchLoadOpp());
    },[]);
    return(
    <section className="opportunities mt-5 text-start d-flex flex-column ">
        <div className=" d-flex align-items-center px-3 py-3 rounded-top bg-gu-blue text-gu-white">
            <span className="flex-shrink-1 flex-grow-1 text-start fs-5">Recommended opportunities</span>
            <span className="btn btn-outline-gu-white fs-7 ">+ Add Opportunity</span>
        </div>
        <div className="oppotunities__list">
            {
                  opportunities.map((item,index)=>{
                    return (<OpportunityItem  name={item.name} organization={item.organization}
                    startData={item.startDate} key={index} tags={item.tags}/>);
                })
            }
        </div>
    </section>);
};
export default OpportunityList;
