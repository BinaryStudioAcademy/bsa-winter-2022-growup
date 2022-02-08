import 'components/main-page/notifications/notification.scss';
import { ReactChild } from 'react';
import { ArrowDown } from 'react-bootstrap-icons';
import Notification from './notification';

enum NotificationTypes{
    approve_skills = 'notification__type--approve-skills',
    opportunities = 'notification__type--opportunities',
    okr =  'notification__type--okr',
}
interface INotificationData{
    title:string,
    type:string
}

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
    <section className="notifications">
        <p className="notifications__title">Your Notifications:</p>
        <div className="notifications__list">
            {notifications}
        </div>
        <span className="notifications__view-all notifications__view-all--showed" >
            <span>view all</span>
            <ArrowDown />
        </span>
    </section>
    );
};

export default Notifications;
