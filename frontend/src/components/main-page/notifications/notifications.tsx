import './notification.scss';
import { ReactChild } from 'react';
import { ArrowDown } from 'react-bootstrap-icons';
import Notification from './notification';
import INotificationData from '../interfaces/INotificationData';
import { NotificationTypes } from '../enums/NotificationTypes';

const Notifications: React.FC = () => {
  const notificationsData = [
    {
      title: 'Notification__item',
      type: NotificationTypes.approve_skills,
    },
    {
      title: 'Notification__item',
      type: NotificationTypes.opportunities,
    },
    {
      title: 'Notification__item',
      type: NotificationTypes.okr,
    },
    {
      title: 'Notification__item',
      type: NotificationTypes.okr,
    },
    {
      title: 'Notification__item',
      type: NotificationTypes.opportunities,
    },
  ];

  const notifications: ReactChild[] = notificationsData.map(
    (item: INotificationData) => {
      return <Notification {...item} />;
    },
  );

  return (
    <section className="notifications d-flex flex-column w-100 rounded-1 text-start shadow-lg">
      <span className="text-start mb-0 py-3 ps-3 rounded-top bg-gu-blue text-gu-white fs-5">
        Your Notifications:
      </span>
      <div className="d-flex flex-column overflow-hidden">{notifications}</div>
      <span className="notifications__view-all  d-flex align-items-center align-self-end me-2 mb-2 mt-2 fs-6 text-gu-blue">
        <span className="me-1">view all</span>
        <ArrowDown />
      </span>
    </section>
  );
};

export default Notifications;
