import { useAppSelector, useEffect, useNavigate, useState } from 'hooks/hooks';
import { OkrTypes } from 'common/interfaces/okr';
import { Button } from '../../common/common';
import OkrList from './okr-list';
import OkrModal from '../modal';
import isFirstLogged from 'helpers/check-is-first-logged';

function ControlledTabs(): React.ReactElement {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { okrs } = useAppSelector((state) => state.okr);
  const user = useAppSelector((store) => store.profile.user);
  const ownOkr = okrs.filter((okr) => okr.type === OkrTypes.MY_OKR);

  const [isShowMyOkr, setIsShowMyOkr] = useState(true);

  const openModal = (): void => setShowModal(true);
  const closeModal = (): void => setShowModal(false);

  useEffect(() => {
    isFirstLogged({ user, navigate });
  }, [user]);

  return (
    <>
      <div className="d-flex w-100 flex-column ">
        <div className="d-flex okr-header w-100 justify-content-between align-items-center">
          <div>
            <a
              className={`${
                isShowMyOkr ? 'okr-tab__active' : ''
              } okr-tab me-3 cursor-pointer text-gu-blue`}
              onClick={(): void => setIsShowMyOkr(true)}
            >
              My OKR
            </a>
            <a
              className={`${
                isShowMyOkr ? '' : 'okr-tab__active'
              } okr-tab cursor-pointer text-gu-blue`}
              onClick={(): void => setIsShowMyOkr(false)}
            >
              All OKR
            </a>
          </div>
          <Button
            variant="gu-pink"
            className="text-gu-white me-2"
            onClick={openModal}
          >
            + Add OKR
          </Button>
        </div>

        <div>
          {isShowMyOkr ? (
            <OkrList collection={ownOkr} />
          ) : (
            <OkrList collection={okrs} />
          )}
        </div>

        {showModal && (
          <OkrModal showModal={showModal} closeModal={closeModal} />
        )}
      </div>
    </>
  );
}

export default ControlledTabs;
