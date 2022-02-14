import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import OrkItem from './workspace-item';
import { useSelector } from 'react-redux';
import { RootState } from 'common/types/types';
import { IOkr, IObjective, IKeyResult } from './common/interfaces';

interface PropTypes {
  collection: IOkr[]
}

function ControlledTabs():React.ReactElement {
    const [key, setKey] = useState('my-OKR');
    const user = useSelector((state: RootState) => state.okr.User);
    const okr = useSelector((state: RootState) => state.okr.OKR);
    const myOkr = useSelector((state: RootState) => state.okr.OKR.filter(okr => okr.userId === user.id));
    const objective = useSelector((state: RootState) => state.okr.Objective);
    const keyResult = useSelector((state: RootState) => state.okr.KeyResult);

    const OkrList: React.FC<PropTypes> = (props) => (
      <div className="OKR-page d-flex flex-row flex-wrap">
        {props.collection.map((okr: IOkr) => {
            const collection = objective.filter((obj: IObjective) => obj.okrId === okr.id);
            const objectivesCounter = collection.length;
            let resultsCounter = 0;
            collection.forEach((obj) => resultsCounter += keyResult.filter((el: IKeyResult) => el.ObjectiveId === obj.id).length);
            return <OrkItem key={okr.id} name={okr.name} endDate={okr.endDate}
              startDate={okr.startDate} NumOfObjectives={objectivesCounter} NumOfKeyResults={resultsCounter}/>;
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
