import './add-section.scss';
import { Plus } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
type Props = {
  title: string;
};

const AddSection: React.FC<Props> = ({ children, title }) => (
  <div className="add-section bg-white">
    <div className="add-section-header text-white d-flex justify-content-between align-items-center bg-gu-blue">
      <p className="add-section-header__title m-0 fw-bold fs-4">{title}</p>
      <Link
        to="/skill"
        type="button"
        className="add-section-header__add fw-bold bg-transparent d-flex align-items-center fs-5 text-gu-white"
      >
        <Plus className="add-section-header__add-icon" />
        <span>Add experience</span>
      </Link>
    </div>
    <div className="add-section-content position-relative">{children}</div>
  </div>
);

export default AddSection;
