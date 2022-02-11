import { ReactElement } from 'react';

interface Props{
    isOpportunitiesPage:boolean,
}

const OpportunitieCart = ( { isOpportunitiesPage } :Props):ReactElement=>{
    return(
    <div className={`opportunities__cart d-flex ${isOpportunitiesPage ? 'flex-column flex-grow-1' : 'mt-3 px-3 py-3 flex-wrap rounded-1 shadow-lg border border-1 bg-gu-white justify-content-between'}`}>
        <div className="opportunities__cart--text d-flex flex-column flex-shrink-1 flex-grow-1 fs-7 me-3 oveflow-hidden">
            <span className="opportunities__cart--text-item fw-bold fs-5 mb-2 overflow-hidden">Academy Bro</span>
            <span className="opportunities__cart--text-item mb-1 overflow-hidden"><span className="opportunities__type">Program:</span> QA</span>
            <span className="opportunities__cart--text-item mb-1 overflow-hidden"><span className="opportunities__type">Org:</span> Group QA team</span>
            <span className="opportunities__cart--text-item mb-1 overflow-hidden"><span className="opportunities__type">Start:</span>  February 02 2022</span>
        </div>
        <div className={`d-flex fs-7 flex-shrink-0 ${isOpportunitiesPage ? 'mt-1': 'align-self-end'}`}>
            <span className="me-2 opportunities__cart--tags-item text-gu-white bg-gu-purple d-flex justify-content-center flex-column rounded-1 text-center px-1">#Tag 1</span>
            <span className="me-2 opportunities__cart--tags-item text-gu-white bg-gu-purple d-flex justify-content-center flex-column rounded-1 text-center px-1">#Tag 2</span>
            <span className="me-2 opportunities__cart--tags-item text-gu-white bg-gu-purple d-flex justify-content-center flex-column rounded-1 text-center px-1">#Tag 3</span>
        </div>
    </div>);
};

export default OpportunitieCart;
