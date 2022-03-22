import { Button } from 'components/common/common';
import { Plus } from 'react-bootstrap-icons';
import './styles.scss';

const InterestsBlock: React.FC = ({ children }) => {
  return (
    <div className="interests add-section bg-white mt-4">
      <div className="interests-header d-flex justify-content-between align-items-center bg-gu-blue">
        <p className="interests-header__title m-0 fw-bold fs-4 text-gu-white">
          Interests
        </p>
        <Button className="interests-header__edit fw-bold bg-transparent d-flex align-items-center fs-5 position-relative">
          <Plus className="interests-header__edit-icon text-gu-white" />
          <span className="text-gu-white">Add Interests</span>
        </Button>
      </div>
      <div className="position-relative add-section-content">{children}</div>
    </div>
  );
};

export default InterestsBlock;
