import './edit-section.scss';
import { PencilFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { MentorMenteeRoute } from 'common/enums/enums';

type Props = {
  title: string;
};

const EditSection: React.FC<Props> = ({ children, title }) => (
  <div className="edit-section bg-white">
    <div className="edit-section-header d-flex justify-content-between align-items-center">
      <p className="edit-section-header__title m-0 fw-bold fs-4">{title}</p>
      <Link
        to={MentorMenteeRoute.SKILLS}
        className="edit-section-header__edit fw-bold bg-transparent d-flex align-items-center fs-5"
      >
        <PencilFill className="edit-section-header__edit-icon me-2" />
        <span>Edit</span>
      </Link>
    </div>
    <div className="edit-section-content d-flex flex-wrap align-items-start">
      {children}
    </div>
  </div>
);

export default EditSection;
