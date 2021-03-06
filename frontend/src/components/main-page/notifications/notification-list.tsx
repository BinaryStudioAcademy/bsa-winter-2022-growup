import './styles.scss';
import { ReactChild, useState } from 'react';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import Notification from './notification-item';
import { useAppSelector } from 'hooks/hooks';
import { INotifications } from 'store/home-page/common';

const Notifications: React.FC = () => {
  const [viewAll, setViewAll] = useState<boolean>(false);

  const notificationsData = useAppSelector(
    (state) => state.homePage.notifications,
  );

  const renderNotifications = (): ReactChild[] => {
    const itemsCount = 3;
    const to = viewAll ? notificationsData?.length : itemsCount;
    const data = notificationsData?.slice(0, to);

    return data
      ? data?.map((item: INotifications, index: number) => (
          <Notification {...item} key={index} />
        ))
      : [];
  };
  const onClick = (): void => setViewAll(!viewAll);

  return (
    <section className="notifications d-flex flex-column w-100 rounded-1 text-start shadow-lg mt-4">
      <div className="d-flex align-items-center  bg-gu-blue text-gu-white add-section-header">
        <p className="add-section-header__title m-0 fw-bold fs-4">
          Your Notifications
        </p>
      </div>

      <div className="d-flex flex-column overflow-hidden">
        {renderNotifications()}
      </div>
      <span
        onClick={onClick}
        className="notifications__view-all  d-flex align-items-center align-self-end me-2 mb-2 mt-2 fs-6 text-gu-blue"
      >
        <span className="me-1">{viewAll ? 'hide' : 'view all'}</span>
        {viewAll ? <ArrowUp /> : <ArrowDown />}
      </span>
    </section>
  );
};

export default Notifications;
