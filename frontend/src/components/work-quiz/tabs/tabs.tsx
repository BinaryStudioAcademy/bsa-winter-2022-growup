import { Dispatch, SetStateAction } from 'react';
import Tab from './tab';
import './styles.scss';

interface ITabs {
  indexActive: number;
  setTab: Dispatch<SetStateAction<number>>;
}

const Tabs: React.FC<ITabs> = ({ indexActive, setTab }) => {
  const tabs = ['General', 'Relationship', 'Managing'];
  const tabsItems = tabs.map((title, index) => {
    return (
      <Tab
        title={title}
        index={index}
        indexActive={indexActive}
        setTab={setTab}
        key={index}
      />
    );
  });
  return <div className=" mb-3">{tabsItems}</div>;
};
export default Tabs;
