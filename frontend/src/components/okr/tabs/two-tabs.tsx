import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useSelector } from 'react-redux';
import { RootState } from 'common/types/types';
import { OkrTypes } from 'common/interfaces/okr';
import { useAppSelector, useNavigate } from 'hooks/hooks';
import OkrList from './okr-list';
import isFirstLogged from 'helpers/check-is-first-logged';

function ControlledTabs(): React.ReactElement {
  const navigate = useNavigate();

  const [key, setKey] = useState('my-OKR');
  const { okrs } = useSelector((state: RootState) => state.okr);
  const user = useAppSelector((store) => store.profile.user);
  const ownOkr = okrs.filter((okr) => okr.type === OkrTypes.MY_OKR);
  useEffect(() => {
    isFirstLogged({ user, navigate });
  }, [user]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k): void => setKey(k as string)}
      className="mb-3"
    >
      <Tab eventKey="my-OKR" title="My OKR">
        <OkrList collection={ownOkr} />
      </Tab>
      <Tab eventKey="all-OKR" title="All OKRs">
        <OkrList collection={okrs} />
      </Tab>
    </Tabs>
  );
}

export default ControlledTabs;
