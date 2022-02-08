import { ReactElement } from 'react';

const OpportunitieCart = ():ReactElement=>{
    return(
    <div className="opportunities__cart">
        <div className="opportunities__cart--text">
            <p className="opportunities__cart--text-item">Academy Bro</p>
            <p className="opportunities__cart--text-item">Program QA</p>
            <p className="opportunities__cart--text-item">Org: Group QA team</p>
            <p className="opportunities__cart--text-item">When:05/02/2022</p>
        </div>
        <div className="opportunities__cart--tags">
            <span className="opportunities__cart--tags-item">Tag 1</span>
            <span className="opportunities__cart--tags-item">Tag 2</span>
            <span className="opportunities__cart--tags-item">Tag 3</span>
        </div>
        <div className="opportunities__cart--link">
            <span>Follow</span>
        </div>
    </div>);
};

export default OpportunitieCart;
