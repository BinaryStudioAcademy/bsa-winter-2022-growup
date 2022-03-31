import { Dispatch, SetStateAction } from 'react';

interface ITab {
  index: number;
  indexActive: number;
  setTab: Dispatch<SetStateAction<number>>;
  title: string;
}
const Tab: React.FC<ITab> = ({ index, indexActive, setTab, title }) => {
  return (
    <a
      className={`${
        index === indexActive && 'tab__active'
      } fs-5 fw-bold cursor-pointer me-3`}
      onClick={(): void => {
        setTab(index);
      }}
    >
      {title}
    </a>
  );
};

export default Tab;
