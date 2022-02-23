import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useSelector } from 'react-redux';
import { RootState } from 'common/types/types';
import OkrList from './okr-list';

function ControlledTabs(): React.ReactElement {
  const [key, setKey] = useState('my-OKR');
  const userOkrs = useSelector((state: RootState) => state.okr.okrs);

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
