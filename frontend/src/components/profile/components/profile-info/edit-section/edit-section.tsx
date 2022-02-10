import  './edit-section.scss';
import { PencilFill } from 'react-bootstrap-icons';

type Props = {
  title: string;
};

const EditSection: React.FC<Props> = ({ children, title }) => (
  <div className="edit-section bg-white">
    <div className="edit-section-header d-flex justify-content-between align-items-center">
      <p className="edit-section-header__title m-0 fw-bold">{title}</p>
      <button className="edit-section-header__edit fw-bold bg-transparent d-flex align-items-center">
        <PencilFill className="edit-section-header__edit-icon"/>
        <span>Edit</span>
      </button>
    </div>
    <div className="edit-section-content d-flex flex-wrap align-items-start">
      {children}
    </div>
  </div>
);

export default EditSection;