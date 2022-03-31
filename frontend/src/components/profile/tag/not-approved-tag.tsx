import './styles.scss';

const NotApprovedTag: React.FC = ({ children }) => (
  <label className="tag bg-gu-white text-gu-black fs-6"> {children} </label>
);

export default NotApprovedTag;
