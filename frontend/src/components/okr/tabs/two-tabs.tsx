import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useSelector } from 'react-redux';
import { RootState } from 'common/types/types';
import OkrList from './okr-list';
import { useAppSelector, useNavigate } from 'hooks/hooks';

function ControlledTabs(): React.ReactElement {
  const [key, setKey] = useState('my-OKR');
  const userOkrs = useSelector((state: RootState) => state.okr.okrs);
  const user = useAppSelector((store) => store.profile.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      user.firstName
        ? user.isCompleteTest
          ? null
          : navigate('/profile/settings/2')
        : navigate('/profile/settings/1');
    }
  }, [user]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k): void => setKey(k as string)}
      className="mb-3"
    >
      <Tab eventKey="my-OKR" title="My OKR">
        <OkrList collection={userOkrs} />
      </Tab>
      <Tab eventKey="all-OKR" title="All OKRs">
        <OkrList collection={[]} />
      </Tab>
    </Tabs>
  );
}

export default ControlledTabs;
