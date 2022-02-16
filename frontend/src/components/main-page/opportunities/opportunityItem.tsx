import { ReactElement } from 'react';
import { IAddNewOpportunity } from 'store/opportunities/common';
import Tag from './tag';

interface Props extends IAddNewOpportunity {
    isOpportunitiesPage?:boolean;
}

const OpportunityItem:React.FC<Props>=({ isOpportunitiesPage,name,organization,startData,tags }):ReactElement=>{
    const tagsComponents = tags?.map((tag)=>{
        return <Tag title={tag} />;
    });
    return(
    <div className={` d-flex ${isOpportunitiesPage ? 'flex-column flex-grow-1' : 'mt-3 px-3 py-3 flex-wrap rounded-1 shadow-lg border border-1 bg-gu-white justify-content-between opportunities__cart'}`}>
        <div className="opportunities__cart--text d-flex flex-column flex-shrink-1 flex-grow-1 fs-7 me-3 oveflow-hidden">
            <span className="opportunities__cart--text-item fw-bold fs-5 mb-2 overflow-hidden">{name}</span>
            <span className="opportunities__cart--text-item mb-1 overflow-hidden"><span className="opportunities__type">Org:</span> {organization} </span>
            <span className="opportunities__cart--text-item mb-1 overflow-hidden"><span className="opportunities__type">Start:</span>  {startData} </span>
        </div>
        <div className={`d-flex fs-7 flex-shrink-0 ${isOpportunitiesPage ? 'mt-1 ': 'align-self-end'} opacity-75`}>
            {tagsComponents?.length ? [...tagsComponents]: <Tag title={'Tag1'} />}
        </div>
    </div>);
};

export default OpportunityItem;
