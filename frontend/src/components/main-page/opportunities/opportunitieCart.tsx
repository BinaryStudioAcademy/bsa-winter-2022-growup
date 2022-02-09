import { ReactElement } from 'react';

const OpportunitieCart = ():ReactElement=>{
    return(
    <div className="d-flex mt-4 px-3 py-3 flex-wrap rounded-1 shadow-lg">
        <div className="opportunities__cart--text d-flex flex-column flex-shrink-1 flex-grow-1">
            <p className="opportunities__cart--text-item mb-2">Academy Bro</p>
            <p className="opportunities__cart--text-item mb-2">Program QA</p>
            <p className="opportunities__cart--text-item mb-2">Org: Group QA team</p>
            <p className="opportunities__cart--text-item mb-2">When:05/02/2022</p>
        </div>
        <div className="opportunities__cart--tags align-self-end">
            <span className="me-2">Tag 1</span>
            <span className="me-2">Tag 2</span>
            <span className="me-2">Tag 3</span>
        </div>
        <div className="opportunities__cart--link flex-grow-1 flex-shrink-0 ">
            <span className="rounded-1 px-2 py-1 text-center">Follow</span>
        </div>
    </div>);
};

export default OpportunitieCart;
