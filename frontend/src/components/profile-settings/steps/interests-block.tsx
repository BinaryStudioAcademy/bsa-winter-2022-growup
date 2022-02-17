import { PencilFill } from 'react-bootstrap-icons';
import './interests-block.scss';

const InterestsBlock: React.FC = ({ children }) => {
  return (
    <div className="interests">
      <div className="interests-header d-flex justify-content-between align-items-center">
        <p className="interests-header__title m-0 fw-bold fs-4 text-gu-white">
          Interests
        </p>
        <button className="interests-header__edit fw-bold bg-transparent d-flex align-items-center fs-5">
          <PencilFill className="interests-header__edit-icon" />
          <span>Edit</span>
        </button>
      </div>
      <div className="interests-content position-relative">{children}</div>
    </div>
  );
};

export default InterestsBlock;
