import './styles.scss';
import { TrashFill as DeleteIcon, ArrowRight } from 'react-bootstrap-icons';

interface Props {
  firstItem: string;
  secondItem: string;
  onDelete: () => void;
}

const PairItem: React.FC<Props> = ({ firstItem, secondItem, onDelete }) => {
  return (
    <div className="pair-item position-relative d-flex flex-wrap align-items-center cursor-pointer">
      <div className="pair-item-element position-relative px-2 d-flex gap-2 bg-gu-blue align-items-center">
        <span>{firstItem}</span>
        <ArrowRight />
        <span>{secondItem}</span>
      </div>
      <div className="pair-action-wrapper position-absolute">
        <DeleteIcon className="pair-delete fs-4" onClick={onDelete} />
      </div>
    </div>
  );
};

export default PairItem;
