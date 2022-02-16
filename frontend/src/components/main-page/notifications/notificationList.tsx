import { ReactChild } from 'react';
import { ArrowDown } from 'react-bootstrap-icons';
import NotificationItem from './notificationItem';
import { INotificationData } from '../common/interfaces';
import { NotificationTypes } from '../common/enums';
import './notification.scss';
const NotificationList:React.FC = ()=>{
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

    const notifications:ReactChild[] =  notificationsData.map((item : INotificationData,index)=>{
        return <NotificationItem {...item} key={index}/>;
    });

    return(
    <section className="notifications d-flex flex-column w-100 rounded-1 text-start shadow-lg">
        <span className="text-start mb-0 py-3 ps-3 rounded-top bg-gu-blue text-gu-white fs-5">Your Notifications:</span>
        <div className="d-flex flex-column overflow-hidden">
            {notifications}
        </div>
        <span className="notifications__view-all  d-flex align-items-center align-self-end me-2 mb-2 mt-2 fs-6 text-gu-blue">
            <span className="me-1">view all</span>
            <ArrowDown />
        </span>
    </section>
    );
};

export default NotificationList;
