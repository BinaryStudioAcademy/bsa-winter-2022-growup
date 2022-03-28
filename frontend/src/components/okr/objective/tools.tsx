import { Button } from 'components/common/common';
import { Pen, Trash, XLg } from 'react-bootstrap-icons';

interface Props {
  closeTools: () => void;
}

const Tolls: React.FC<Props> = ({ closeTools }) => {
  return (
    <div className="d-flex align-items-center ms-3">
      <Button className="border-0 bg-transparent text-gu-black hover-pink p-1">
        <Pen />
      </Button>
      <Button className="border-0 bg-transparent text-gu-black hover-pink p-1">
        <Trash />
      </Button>
      <Button
        className="border-0 bg-transparent text-gu-black hover-pink p-1"
        onClick={closeTools}
      >
        <XLg />
      </Button>
    </div>
  );
};

export default Tolls;
