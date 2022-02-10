import './tag.scss';

const Tag: React.FC = ({ children }) => (
  <label className="tag bg-gu-white text-gu-blue fs-6">
    {children}
  </label>
);

export default Tag;
