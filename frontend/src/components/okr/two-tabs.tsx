import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import OrkItem from './workspace-item';
import { useSelector } from 'react-redux';
import { RootState } from 'common/types/types';
import { IOkr } from './common/interfaces';

interface PropTypes {
  collection: IOkr[]
}

function ControlledTabs():React.ReactElement {
    const [key, setKey] = useState('my-OKR');
    const user = useSelector((state: RootState) => state.okr.user);
    const okr = useSelector((state: RootState) => state.okr.okr);
    const myOkr = useSelector((state: RootState) => state.okr.okr.filter(okr => okr.userId === user.id));

    const OkrList: React.FC<PropTypes> = (props) => (
      <div className="OKR-page d-flex flex-row flex-wrap">
        {props.collection.map((okr: IOkr) => {
            const collection = okr.objective;
            const objectivesCounter = collection.length;
            const resultsCounter = okr.keyResult.length;
            return <OrkItem key={okr.id} name={okr.name} endDate={okr.endDate}
              startDate={okr.startDate} objectivesCounter={objectivesCounter} resultsCounter={resultsCounter}/>;
        })}
      </div>
    );

    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k):void => setKey(k as string)}
        className="mb-3"
      >
        <Tab eventKey="my-OKR" title="My OKR">
            <OkrList collection={myOkr}/>
        </Tab>
        <Tab eventKey="all-OKR" title="All OKRs">
            <OkrList collection={okr}/>
        </Tab>
      </Tabs>
    );
  }

export default ControlledTabs;
