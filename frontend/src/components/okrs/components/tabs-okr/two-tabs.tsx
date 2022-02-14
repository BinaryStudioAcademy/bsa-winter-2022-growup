import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import OrkItem from '../okr-item/workspace-item';
import '../../styles.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'common/types/types';
import { okrTypes, objectiveTypes, keyResultTypes } from '../../common/interfaces';

interface PropTypes {
  tabs: string
}

function ControlledTabs():React.ReactElement {
    const [key, setKey] = useState('my-OKR');
    const User = useSelector((state: RootState) => state.okr.User);
    const OKR = useSelector((state: RootState) => state.okr.OKR);
    const Objective = useSelector((state: RootState) => state.okr.Objective);
    const KeyResult = useSelector((state: RootState) => state.okr.KeyResult);

    const OkrList: React.FC<PropTypes> = (props) => (
      <div className="OKR-page d-flex flex-row flex-wrap">
        {OKR.map((MyOKR: okrTypes) => {
            const ArrayofObjectives = Objective.filter((el: objectiveTypes) => el.okrId === MyOKR.id);
            const NumOfObjectives = ArrayofObjectives.length;
            let NumOfKeyResults = 0;
            for (const obj of ArrayofObjectives)
                NumOfKeyResults += KeyResult.filter((el: keyResultTypes) => el.ObjectiveId === obj.id).length;
            if (props.tabs === 'all') {
              return <OrkItem key={MyOKR.id} name={MyOKR.name} endDate={MyOKR.endDate}
              startDate={MyOKR.startDate} NumOfObjectives={NumOfObjectives} NumOfKeyResults={NumOfKeyResults}/>;
            } else if (props.tabs === 'my'){
              if (MyOKR.userId === User.id) {
                return <OrkItem key={MyOKR.id} name={MyOKR.name} endDate={MyOKR.endDate}
                startDate={MyOKR.startDate} NumOfObjectives={NumOfObjectives} NumOfKeyResults={NumOfKeyResults}/>;
              }
            }
        })}
      </div>
    );

    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k:any):any => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="my-OKR" title="My OKR">
            <OkrList tabs="my"/>
        </Tab>
        <Tab eventKey="all-OKR" title="All OKRs">
            <OkrList tabs="all"/>
        </Tab>
      </Tabs>
    );
  }

export default ControlledTabs;
