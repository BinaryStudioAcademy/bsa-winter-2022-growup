import  './edit-section.scss';
import { PencilFill } from 'react-bootstrap-icons';

type Props = {
  title: string;
};

const EditSection: React.FC<Props> = ({ children, title }) => (
  <div className="edit-section">
    <div className="edit-section-header">
      <p className="edit-section-header__title">{title}</p>
      <button className="edit-section-header__edit-button">
        <PencilFill className="edit-section-header__edit-icon"/> Edit
      </button>
    </div>
    <div className="edit-section-content">
      {children}
    </div>
  </div>
);

export default EditSection;
