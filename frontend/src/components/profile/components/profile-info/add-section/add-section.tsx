import  './add-section.scss';
import { Plus } from 'react-bootstrap-icons';
type Props = {
  title: string;
};

const AddSection: React.FC<Props> = ({ children, title }) => (
  <div className="add-section bg-white">
    <div className="add-section-header text-white d-flex justify-content-between align-items-center">
      <p className="add-section-header__title m-0 fw-bold">{title}</p>
      <button type="button" className="add-section-header__add fw-bold bg-transparent d-flex align-items-center">
        <Plus className="add-section-header__add-icon"/>
        <span>Add experience</span>
      </button>
    </div>
    <div className="add-section-content position-relative">
      {children}
    </div>
  </div>
);

export default AddSection;
