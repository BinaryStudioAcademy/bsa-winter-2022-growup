import { ReactElement } from 'react';

interface ILabelProps{
    type:string,
    typeTitle:string,
}

const Label = ( { type,typeTitle } :ILabelProps):ReactElement=>{
    return(
        <span className = { `notification__type ${type}` } >
            { typeTitle }
        </span>
    );
};
export default Label;
