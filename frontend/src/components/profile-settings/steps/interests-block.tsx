import { Button } from 'components/common/common';
import { Plus } from 'react-bootstrap-icons';
import './styles.scss';

const InterestsBlock: React.FC = ({ children }) => (
  <div className="interests add-section bg-white mt-4">
    <div className="interests-header d-flex justify-content-between align-items-center bg-gu-blue">
      <p className="interests-header__title m-0 fw-bold fs-4 text-gu-white">
        Interests
      </p>
      <Button
        variant="outline-gu-white"
        className="interests-header__edit d-flex align-items-center position-relative btn-hover-gu-purple"
      >
        <Plus className="interests-header__edit-icon" />
        <span>Add Interests</span>
      </Button>
    </div>
    <div className="position-relative add-section-content">{children}</div>
  </div>
);

export default InterestsBlock;
