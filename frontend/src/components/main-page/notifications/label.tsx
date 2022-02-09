import { ReactElement } from 'react';
import ILabelData from '../interfaces/ILabaleData';

const Label = ( { type,typeTitle } :ILabelData):ReactElement=>{
    return(
        <span className = { `notification__type ${type} ms-auto flex-shrink-0 white text-center d-flex flex-column justify-content-center` } >
            { typeTitle }
        </span>
    );
};
export default Label;
