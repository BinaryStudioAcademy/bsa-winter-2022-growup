import './styles.scss';

const NotApprovedTag: React.FC = ({ children }) => (
  <label className="tag not-approved-tag text-gu-white fs-6">
    {' '}
    {children}{' '}
  </label>
);

export default NotApprovedTag;
