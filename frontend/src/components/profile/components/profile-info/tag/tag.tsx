import './tag.scss';

const Tag: React.FC = ({ children }) => (
  <label className="tag">
    {children}
  </label>
);

export default Tag;
