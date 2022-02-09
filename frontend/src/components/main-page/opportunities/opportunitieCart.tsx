import { ReactElement } from 'react';

const OpportunitieCart = ():ReactElement=>{
    return(
    <div className="opportunities__cart d-flex mt-3 px-3 py-3 flex-wrap rounded-1 shadow-lg border border-1">
        <div className="opportunities__cart--text d-flex flex-column flex-shrink-1 flex-grow-1">
            <span className="opportunities__cart--text-item fw-bold fs-6">Academy Bro</span>
            <span className="opportunities__cart--text-item mb-2"><span className="opportunities__type">Program:</span> QA</span>
            <span className="opportunities__cart--text-item mb-2"><span className="opportunities__type">Org:</span> Group QA team</span>
            <span className="opportunities__cart--text-item mb-2"><span className="opportunities__type">Start:</span>  February 02 2022</span>
        </div>
        <div className="opportunities__cart--tags align-self-end d-flex">
            <span className="me-2 opportunities__cart--tags-item d-flex justify-content-center flex-column rounded-1 text-center px-1">#Tag 1</span>
            <span className="me-2 opportunities__cart--tags-item d-flex justify-content-center flex-column rounded-1 text-center px-1">#Tag 2</span>
            <span className="me-2 opportunities__cart--tags-item d-flex justify-content-center flex-column rounded-1 text-center px-1">#Tag 3</span>
        </div>
    </div>);
};

export default OpportunitieCart;
