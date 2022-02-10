import { ReactElement } from 'react';
import ILabelData from '../interfaces/ILabaleData';
import Label from './label';
interface Props extends ILabelData {
    title?:string
}

const Notification=( { title,type } :Props):ReactElement=>{
    const labelData:ILabelData = {
        type:type,
    };
    return(
    <div className="notification d-flex py-3 px-3 bg-light align-items-center border border-1 rounded-1 ">
        <div className={`notification__type  ${type} me-3 flex-shrink-0 position-relative px-1 py-1 rounded-circle`}>
            <Label {...labelData}></Label>
        </div>
            <div className="notification__text-block d-flex flex-column flex-grow-1 ">
                <span className="notification__name overflow-hidden me-3  fw-bold fs-6">
                    { title }
                </span>
                <span className="notification__description text-nowrap overflow-hidden fs-7">
                    Some Descriptions About Notifications
                </span>
            </div>
            <span className="notification__time align-self-start mt-1 fs-7 ">11:00</span>
    </div>);
};

export default Notification;
