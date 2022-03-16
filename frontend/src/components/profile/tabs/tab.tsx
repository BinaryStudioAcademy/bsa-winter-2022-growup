interface Props {
  title: string;
  isActive: boolean;
  changeComponent: (id: number) => void;
  index: number;
}
const tab: React.FC<Props> = ({ title, isActive, changeComponent, index }) => {
  return (
    <div className="nav-item">
      <a
        className={`nav-link  text-decoration-none ${isActive ? 'active' : ''}`}
        onClick={(): void => {
          changeComponent(Number(index));
        }}
      >
        {title}
      </a>
    </div>
  );
};
export default tab;
