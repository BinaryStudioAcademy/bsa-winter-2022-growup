interface Props {
  title: string;
  isActive: boolean;
  changeComponent: (id: number) => void;
  index: number;
}
const tab: React.FC<Props> = ({ title, isActive, changeComponent, index }) => {
  return (
    <div className="nav-item cursor-pointer">
      <a
        className={`nav-link  text-decoration-none ${
          isActive ? 'active' : ''
        } ${index == 0 ? 'px-0' : ''}`}
        onClick={(): void => {
          changeComponent(+index);
        }}
      >
        {title}
      </a>
    </div>
  );
};
export default tab;
