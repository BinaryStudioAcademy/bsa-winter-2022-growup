import './styles.scss';
import Tab from './tab';

interface Props {
  activeId: number;
  changeComponent: (id: number) => void;
}
const Tabs: React.FC<Props> = ({ changeComponent, activeId }): JSX.Element => {
  const tabTitles = ['Summary', 'Qualities'];
  const tabItems = tabTitles.map((title: string, index: number) => {
    return (
      <Tab
        title={title}
        isActive={index == activeId}
        changeComponent={changeComponent}
        index={index}
        key={index}
      />
    );
  });

  return <nav className="nav-tabs profile-nav-tabs d-flex">{tabItems}</nav>;
};

export default Tabs;
