import './styles.scss';
import { TrashFill as DeleteIcon, ArrowRight } from 'react-bootstrap-icons';

interface Props {
  firstItem: string;
  secondItem: string;
  onDelete: () => void;
}

const PairItem: React.FC<Props> = ({ firstItem, secondItem, onDelete }) => {
  return (
    <div className="pair-item d-flex flex-wrap align-items-center">
      <div className="pair-item-element px-2 d-flex gap-2 bg-gu-blue align-items-center">
        <span>{firstItem}</span>
        <ArrowRight />
        <span>{secondItem}</span>
      </div>
      <div className="pair-action-wrapper">
        <DeleteIcon className="pair-delete fs-4" onClick={onDelete} />
      </div>
    </div>
  );
};

export default PairItem;
