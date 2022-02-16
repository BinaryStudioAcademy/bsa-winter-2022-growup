import OpportunityPageItem from './opportunitiesPageItem';
import OpportunityModal from './OpportunityModal';
import { useAppSelector,useAppDispatch, useEffect } from 'hooks/hooks';
import { fetchLoadOpp, showModal } from '../../store/opportunities/actions';
import './styles.scss';

const OpprotunitiesPage:React.FC = ()=>{
    const opportunities = useAppSelector((state)=>state.opportunityReducer.opportunities);
    const dispatch = useAppDispatch();
    const isShowModal = useAppSelector((state)=>state.opportunityReducer.isShowModal);
    useEffect(()=>{
        dispatch(fetchLoadOpp());
    },[]);
    return(
    <section className="d-flex flex-column">
        <div className=" d-flex align-items-center px-3 py-3 rounded-top bg-gu-blue text-gu-white">
            <span className="flex-shrink-1 flex-grow-1 text-start fs-5">Recommended opportunities</span>
            <span className="btn btn-outline-gu-white fs-7 " onClick={():void=>{dispatch(showModal());} }>+ Add Opportunity</span>
        </div>
        <div className="oppotunities__list">
        {
            opportunities.map((item,index)=>{
                return (<OpportunityPageItem  name={item.name} organization={item.organization}
                startData={item.startDate} isFollow={item.isFollow} id={item.id} key={index} tags={item.tags}/>);
            })
        }
        </div>
        {isShowModal ? <OpportunityModal /> : null}
    </section>
    );
};
export default OpprotunitiesPage;
