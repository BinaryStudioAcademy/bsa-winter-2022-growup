import Label from 'components/main-page/notifications/label';
import { ReactElement } from 'react';

interface INotificationsProps{
    title:string,
    type:string,
}

interface ILabelData{
    typeTitle:string,
    type:string,
}

const Notification=( { title,type } :INotificationsProps):ReactElement=>{
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
    <div className="notification">
        <p className="notification__name">
            { title }
        </p>
        <Label { ...labelProps }></Label>
    </div>);
};

export default Notification;
