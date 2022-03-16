import './styles.scss';
import { Plus } from 'react-bootstrap-icons';
import { Button } from 'components/common/common';

type Props = {
  title: string;
  onAdd?: () => void;
};

const AddSection: React.FC<Props> = ({ children, title, onAdd }) => (
  <div className="add-section bg-white">
    <div className="add-section-header text-white d-flex justify-content-between align-items-center bg-gu-blue">
      <p className="add-section-header__title m-0 fw-bold fs-4">{title}</p>
      <Button
        themeWithoutBtn={
          'add-section-header__add fw-bold d-flex align-items-center fs-5'
        }
        onSubmit={onAdd}
        type={'button'}
      >
        <Plus className="add-section-header__add-icon" />
        <span>Add experience</span>
      </Button>
    </div>
    <div className="add-section-content position-relative">{children}</div>
  </div>
);

export default AddSection;
