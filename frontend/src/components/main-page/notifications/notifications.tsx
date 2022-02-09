import 'components/main-page/notifications/notification.scss';
import { ReactChild } from 'react';
import { ArrowDown } from 'react-bootstrap-icons';
import Notification from './notification';
import INotificationData from '../interfaces/INotificationData';
import { NotificationTypes } from '../enums/NotificationTypes';

const Notifications:React.FC = ()=>{
    const notificationsData = [
        {
            title:'Notification__item',
            type:NotificationTypes.approve_skills,
        },
        {
            title:'Notification__item',
            type:NotificationTypes.opportunities,
        },
        {
            title:'Notification__item',
            type:NotificationTypes.okr,
        },
        {
            title:'Notification__item',
            type:NotificationTypes.okr,
        },
        {
            title:'Notification__item',
            type:NotificationTypes.opportunities,
        },
        ];

    const notifications:ReactChild[] =  notificationsData.map((item : INotificationData)=>{
        return <Notification {...item} />;
    });

    return(
    <section className="notifications d-flex flex-column w-100 rounded-1 text-start shadow-lg">
        <p className="notifications__title white text-start mb-0 py-1 ps-2 rounded-top">Your Notifications:</p>
        <div className="d-flex flex-column overflow-hidden">
            {notifications}
        </div>
        <span className="notifications__view-all notifications__view-all--showed d-flex align-items-center align-self-end me-2 mb-2">
            <span className="me-1">view all</span>
            <ArrowDown />
        </span>
    </section>
    );
};

export default Notifications;
