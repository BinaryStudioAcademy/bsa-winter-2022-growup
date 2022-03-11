import './styles.scss';
import { Plus } from 'react-bootstrap-icons';

type Props = {
  title: string;
  onButtonClick?: () => void;
};

const AddSection: React.FC<Props> = ({ children, title, onButtonClick }) => (
  <div className="add-section bg-white">
    <div className="add-section-header text-white d-flex justify-content-between align-items-center bg-gu-blue">
      <p className="add-section-header__title m-0 fw-bold fs-4">{title}</p>
      <button
        type="button"
        className="add-section-header__add fw-bold d-flex align-items-center fs-5"
        onClick={onButtonClick}
      >
        <Plus className="add-section-header__add-icon" />
        <span>Add experience</span>
      </button>
    </div>
    <div className="add-section-content position-relative">{children}</div>
  </div>
);

export default AddSection;