import './styles.scss';
import { Plus } from 'react-bootstrap-icons';
import { Button } from 'components/common/common';

type Props = {
  title: string;
  buttonName?: string;
  onAdd?: () => void;
};

const AddSection: React.FC<Props> = ({
  children,
  title,
  buttonName = 'Add experience',
  onAdd,
}) => (
  <div className="add-section bg-white mt-0">
    <div className="add-section-header text-white d-flex justify-content-between align-items-center bg-gu-blue">
      <p className="add-section-header__title m-0 fw-bold fs-4">{title}</p>
      <Button
        type="button"
        variant="outline-gu-white"
        className="add-section-header__add btn-hover-gu-purple d-flex align-items-center"
        onClick={onAdd}
      >
        <Plus className="add-section-header__add-icon" />
        <span>{buttonName}</span>
      </Button>
    </div>
    <div className="add-section-content position-relative">{children}</div>
  </div>
);

export default AddSection;
