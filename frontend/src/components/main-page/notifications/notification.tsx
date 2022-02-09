import Label from 'components/main-page/notifications/label';
import { ReactElement } from 'react';
import ILabelData from '../interfaces/ILabaleData';

interface IProps{
    title:string,
    type:string,
}

const Notification=( { title,type } :IProps):ReactElement=>{
    let typeTitle = '';
    switch(type){
        case 'notification__type--approve-skills':
            typeTitle = 'ApproveSkills';
            break;
        case 'notification__type--opportunities':
            typeTitle = 'Opportunities';
            break;
        case 'notification__type--okr':
            typeTitle = 'OKR';
            break;
    }
    const labelProps:ILabelData = {
        typeTitle:typeTitle,
        type:type,
    };
    return(
    <div className="notification d-flex py-3 px-2 bg-light align-items-center">
        <p className="notification__name overflow-hidden me-3 fs-6 text-nowrap flex-shrink-1 flex-grow-1">
            { title }
        </p>
        <Label { ...labelProps }></Label>
    </div>);
};

export default Notification;
