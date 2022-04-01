import { useState } from 'hooks/hooks';
import { Modal } from 'react-bootstrap';
import { IManaging, IRelations } from '../common/interface';
import General from '../tabs/general';
import Managing from '../tabs/managing';
import RelathionShip from '../tabs/relationship';
import Tabs from '../tabs/tabs';

interface Props {
  show: boolean;
  handleClose: () => void;
  typeTitle: string;
  general: string[];
  managing: IManaging;
  relationShip: IRelations;
}
const TestResultModal = ({
  show,
  handleClose,
  typeTitle,
  general,
  managing,
  relationShip,
}: Props): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    <General general={general} />,
    <RelathionShip relationShip={relationShip} />,
    <Managing managing={managing} />,
  ];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-gu-blue">
        <Modal.Title className="text-gu-white">{typeTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs setTab={setCurrentTab} indexActive={currentTab} />
        {tabs[currentTab]}
      </Modal.Body>
    </Modal>
  );
};

export default TestResultModal;
