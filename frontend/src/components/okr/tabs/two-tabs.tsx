import { Tab, Tabs } from 'react-bootstrap';
import { useAppSelector, useEffect, useNavigate, useState } from 'hooks/hooks';
import { OkrTypes } from 'common/interfaces/okr';
import { Button } from '../../common/common';
import OkrList from './okr-list';
import OkrModal from '../modal';
import isFirstLogged from 'helpers/check-is-first-logged';

function ControlledTabs(): React.ReactElement {
  const navigate = useNavigate();

  const [key, setKey] = useState('my-OKR');

  const [showModal, setShowModal] = useState(false);

  const { okrs } = useAppSelector((state) => state.okr);
  const user = useAppSelector((store) => store.profile.user);
  const ownOkr = okrs.filter((okr) => okr.type === OkrTypes.MY_OKR);

  const openModal = (): void => setShowModal(true);
  const closeModal = (): void => setShowModal(false);

  useEffect(() => {
    isFirstLogged({ user, navigate });
  }, [user]);

  return (
    <>
      <Button
        variant="gu-pink"
        className="position-absolute text-gu-white mb-2 align-self-end"
        style={{ right: 36 }}
        onClick={openModal}
      >
        + Add OKR
      </Button>
      {showModal && <OkrModal showModal={showModal} closeModal={closeModal} />}
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k): void => setKey(k as string)}
        className="mb-3"
      >
        <Tab eventKey="my-OKR" title="My OKR">
          <OkrList collection={ownOkr} />
        </Tab>
        <Tab eventKey="all-OKR" title="All OKRs">
          <OkrList collection={okrs} />
        </Tab>
      </Tabs>
    </>
  );
}

export default ControlledTabs;
